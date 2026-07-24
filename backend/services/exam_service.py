import random

from datetime import datetime, UTC

from sqlalchemy import select
from sqlalchemy.orm import selectinload

from database.database import SessionLocal
from database.models import (
    Exam,
    ExamAnswer,
    Question,
    QuestionBank,
)


class ExamService:

    # ==================================================
    # Helpers
    # ==================================================

    def _serialize_question(
        self,
        question: Question,
    ):

        return {
            "id": question.id,
            "number": question.number,
            "page": question.page,
            "subject": question.subject,
            "question": question.question_text,
            "options": {
                "A": question.option_a,
                "B": question.option_b,
                "C": question.option_c,
                "D": question.option_d,
            },
        }

    def _get_exam_with_answers(
    self,
    db,
    exam_id: str,
    user_id: str,
    ):

        statement = (
            select(Exam)
            .options(
                selectinload(
                    Exam.answers
                )
            )
            .where(
                Exam.id == exam_id,
                Exam.user_id == user_id,
            )
        )

        return db.scalar(
            statement
        )

    def _serialize_exam(
        self,
        db,
        exam: Exam,
    ):

        answer_map = {
            answer.question_id: answer
            for answer in exam.answers
        }

        question_ids = list(
            answer_map.keys()
        )

        if question_ids:

            statement = (
                select(Question)
                .where(
                    Question.id.in_(
                        question_ids
                    )
                )
            )

            questions = list(
                db.scalars(
                    statement
                ).all()
            )

        else:

            questions = []

        question_map = {
            question.id: question
            for question in questions
        }

        # Preserve the order stored by ExamAnswer.
        # Current schema does not have a position
        # column, so ordering falls back to question
        # number for now.

        questions.sort(
            key=lambda question: (
                question.number
                if question.number is not None
                else 0
            )
        )

        serialized_questions = [
            self._serialize_question(
                question
            )
            for question in questions
        ]

        answers = {}

        for answer in exam.answers:

            answers[
                answer.question_id
            ] = {
                "selectedOption":
                    answer.selected_option,

                "markedForReview":
                    answer.marked_for_review,
            }

        remaining_seconds = None

        if (
            exam.timed
            and exam.duration_minutes
            is not None
        ):

            started = exam.started_at

            # PostgreSQL may return a naive
            # datetime depending on column config.
            if started.tzinfo is None:

                started = (
                    started.replace(
                        tzinfo=UTC
                    )
                )

            elapsed = (
                datetime.now(UTC)
                - started
            ).total_seconds()

            remaining_seconds = max(
                0,
                exam.duration_minutes
                * 60
                - int(elapsed),
            )

        bank = db.get(
            QuestionBank,
            exam.question_bank_id,
        )

        return {
            "examId": exam.id,

            "questionBank": (
                bank.file_name
                if bank
                else "Unknown"
            ),

            "questionCount":
                exam.question_count,

            "startedAt":
                exam.started_at.isoformat(),

            "timed":
                exam.timed,

            "durationMinutes":
                exam.duration_minutes,

            "questions":
                serialized_questions,

            "answers":
                answers,

            "completed":
                exam.status
                == "completed",

            "remainingSeconds":
                remaining_seconds,
        }

    # ==================================================
    # Generate Exam
    # ==================================================

    def generate_exam(
        self,
        user_id: str,
        question_count: int,
        timed: bool,
        duration_minutes: int | None,
    ):

        db = SessionLocal()

        try:

            active_bank = db.scalar(
                select(QuestionBank)
                .where(
                    QuestionBank.user_id == user_id,
                    QuestionBank.active.is_(True),
                )
            
                .limit(1)
            )

            if active_bank is None:

                raise ValueError(
                    "No active question "
                    "bank found."
                )

            questions = list(
                db.scalars(
                    select(
                        Question
                    )
                    .where(
                        Question
                        .question_bank_id
                        == active_bank.id
                    )
                ).all()
            )

            if not questions:

                raise ValueError(
                    "Question bank "
                    "contains no questions."
                )

            random.shuffle(
                questions
            )

            selected = questions[
                :min(
                    question_count,
                    len(questions),
                )
            ]

            exam = Exam(
                user_id=user_id,

                question_bank_id=
                    active_bank.id,

                question_count=
                    len(selected),

                timed=timed,

                duration_minutes=
                    duration_minutes,

                status="in_progress",

                started_at=
                    datetime.now(UTC),
            )

            db.add(
                exam
            )

            db.flush()

            # Create one ExamAnswer row
            # per selected question.
            #
            # selected_option starts as NULL.

            for position, question in enumerate(selected):

                exam_answer = ExamAnswer(
                    exam_id=exam.id,

                    question_id=
                        question.id,

                    selected_option=None,

                    is_correct=None,

                    marked_for_review=False,

                    position=position,
                )

                db.add(
                    exam_answer
                )

            db.commit()

            return {
                "success": True,

                "examId":
                    exam.id,

                "questionCount":
                    len(selected),

                "questionBank":
                    active_bank.file_name,
            }

        except Exception:

            db.rollback()

            raise

        finally:

            db.close()

    # ==================================================
    # Get Exam
    # ==================================================

    def get_exam(
    self,
    exam_id,
    user_id,
    ):

        db = SessionLocal()

        try:

            exam = self._get_exam_with_answers(
                db,
                exam_id,
                user_id,
            )

            if exam is None:
                return None

            return self._serialize_exam(
                db,
                exam,
            )

        finally:

            db.close()

    # ==================================================
    # Save Answer
    # ==================================================

    def save_answer(
    self,
    exam_id,
    user_id,
    question_id,
    selected_option,
    ):

        db = SessionLocal()

        try:

            exam = db.scalar(
                select(Exam)
                .where(
                    Exam.id == exam_id,
                    Exam.user_id == user_id,
                )
            )

            if exam is None:
                return None

            if exam.status == "completed":

                raise ValueError(
                    "Exam is already completed."
                )

            answer = db.scalar(
                select(
                    ExamAnswer
                )
                .where(
                    ExamAnswer.exam_id
                    == exam_id,

                    ExamAnswer.question_id
                    == question_id,
                )
            )

            if answer is None:

                raise ValueError(
                    "Invalid question ID."
                )

            answer.selected_option = (
                selected_option
            )

            db.commit()

            return True

        except Exception:

            db.rollback()

            raise

        finally:

            db.close()

    # ==================================================
    # Mark For Review
    # ==================================================

    def mark_for_review(
    self,
    exam_id: str,
    user_id: str,
    question_id: str,
    marked: bool,
    ):

        db = SessionLocal()
        

        try:

            exam = db.scalar(
                    select(Exam).where(
                        Exam.id == exam_id,
                        Exam.user_id == user_id,
                    )
                )
            
            if exam is None:
                    return None

            answer = db.scalar(
                select(
                    ExamAnswer
                )
                .where(
                    ExamAnswer.exam_id
                    == exam_id,

                    ExamAnswer.question_id
                    == question_id,
                )
            )

            if answer is None:
                return None

            answer.marked_for_review = (
                marked
            )

            db.commit()

            return True

        except Exception:

            db.rollback()

            raise

        finally:

            db.close()

    # ==================================================
    # Submit Exam
    # ==================================================

    def submit_exam(
    self,
    exam_id,
    user_id,
    ):

        db = SessionLocal()

        try:

            exam = self._get_exam_with_answers(
                db,
                exam_id,
                user_id,
            )

            if exam is None:
                return None

            correct = 0
            wrong = 0
            unanswered = 0

            for answer in exam.answers:

                question = db.get(
                    Question,
                    answer.question_id,
                )

                if question is None:

                    unanswered += 1
                    continue

                if (
                    answer.selected_option
                    is None
                ):

                    unanswered += 1

                    answer.is_correct = (
                        None
                    )

                elif (
                    answer.selected_option
                    == question.correct_answer
                ):

                    correct += 1

                    answer.is_correct = (
                        True
                    )

                else:

                    wrong += 1

                    answer.is_correct = (
                        False
                    )

            total = len(
                exam.answers
            )

            percentage = (
                round(
                    (
                        correct
                        / total
                    )
                    * 100,
                    2,
                )
                if total
                else 0
            )

            exam.score = correct

            exam.percentage = (
                percentage
            )

            exam.status = (
                "completed"
            )

            exam.completed_at = (
                datetime.now(UTC)
            )

            db.commit()

            return {
                "success": True,

                "examId":
                    exam.id,

                "score":
                    correct,

                "totalQuestions":
                    total,

                "correctAnswers":
                    correct,

                "wrongAnswers":
                    wrong,

                "unanswered":
                    unanswered,

                "percentage":
                    percentage,
            }

        except Exception:

            db.rollback()

            raise

        finally:

            db.close()

    # ==================================================
    # Current Exam
    # ==================================================

    def get_current_exam(
    self,
    user_id,
    ):

        db = SessionLocal()

        try:

            statement = (
                select(
                    Exam
                )
                .options(
                    selectinload(
                        Exam.answers
                    )
                )
                .where(
                    Exam.user_id == user_id,
                    Exam.status == "in_progress",
                )
                .order_by(
                    Exam.started_at.desc()
                )
                .limit(1)
            )

            exam = db.scalar(
                statement
            )

            if exam is None:
                return None

            return self._serialize_exam(
                db,
                exam,
            )

        finally:

            db.close()

    # ==================================================
    # Unfinished Exam
    # ==================================================

    def has_unfinished_exam(
    self,
    user_id,
    ):

        exam = self.get_current_exam(
            user_id
        )

        if exam is None:
            return None

        answers = exam.get(
            "answers",
            {}
        )

        answered_count = sum(
            1
            for answer in answers.values()
            if answer.get(
                "selectedOption"
            )
            is not None
        )

        question_count = exam[
            "questionCount"
        ]

        progress = (
            round(
                answered_count
                / question_count
                * 100
            )
            if question_count > 0
            else 0
        )

        return {
            "examId":
                exam["examId"],

            "questionCount":
                question_count,

            "answeredCount":
                answered_count,

            "progress":
                progress,

            "timed":
                exam["timed"],

            "startedAt":
                exam["startedAt"],
        }

    # ==================================================
    # Delete Exam
    # ==================================================

    def delete_exam(
        self,
        exam_id: str,
        user_id
    ):

        db = SessionLocal()

        try:

            exam = db.scalar(
                select(Exam)
                .where(
                    Exam.id == exam_id,
                    Exam.user_id == user_id,
                )
            )

            if exam is not None:

                db.delete(
                    exam
                )

                db.commit()

            return {
                "success": True,
            }

        except Exception:

            db.rollback()

            raise

        finally:

            db.close()
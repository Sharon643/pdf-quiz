from sqlalchemy import select
from sqlalchemy.orm import selectinload

from database.database import SessionLocal
from database.models import (
    Exam,
    QuestionBank,
)


class HistoryService:

    # --------------------------------------------------
    # Serialize completed exam
    # --------------------------------------------------

    def _serialize_exam(
        self,
        db,
        exam: Exam,
    ):

        bank = db.get(
            QuestionBank,
            exam.question_bank_id,
        )

        correct = 0
        wrong = 0
        unanswered = 0

        for answer in exam.answers:

            if answer.selected_option is None:
                unanswered += 1

            elif answer.is_correct is True:
                correct += 1

            else:
                wrong += 1

        return {
            "examId": exam.id,

            "questionBank": (
                bank.file_name
                if bank
                else "Unknown"
            ),

            "mode": (
                "Timed"
                if exam.timed
                else "Practice"
            ),

            "questionCount":
                exam.question_count,

            "correct":
                correct,

            "wrong":
                wrong,

            "unanswered":
                unanswered,

            "percentage": (
                exam.percentage
                if exam.percentage
                is not None
                else 0
            ),

            "completedAt": (
                exam.completed_at.isoformat()
                if exam.completed_at
                else None
            ),

            "startedAt": (
                exam.started_at.isoformat()
                if exam.started_at
                else None
            ),

            "timed":
                exam.timed,

            "durationMinutes":
                exam.duration_minutes,
        }

    # --------------------------------------------------
    # Return every completed exam
    # --------------------------------------------------

    def get_history(
        self,
    ):

        db = SessionLocal()

        try:

            statement = (
                select(Exam)
                .options(
                    selectinload(
                        Exam.answers
                    )
                )
                .where(
                    Exam.status
                    == "completed"
                )
                .order_by(
                    Exam.completed_at.desc()
                )
            )

            exams = list(
                db.scalars(
                    statement
                ).all()
            )

            return [
                self._serialize_exam(
                    db,
                    exam,
                )
                for exam in exams
            ]

        finally:

            db.close()

    # --------------------------------------------------
    # Return one completed exam
    # --------------------------------------------------

    def get_exam(
        self,
        exam_id: str,
    ):

        db = SessionLocal()

        try:

            statement = (
                select(Exam)
                .options(
                    selectinload(
                        Exam.answers
                    )
                )
                .where(
                    Exam.id
                    == exam_id,

                    Exam.status
                    == "completed",
                )
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

    # --------------------------------------------------
    # Delete history
    # --------------------------------------------------

    def delete_exam(
        self,
        exam_id: str,
    ):

        db = SessionLocal()

        try:

            exam = db.scalar(
                select(Exam)
                .where(
                    Exam.id
                    == exam_id,

                    Exam.status
                    == "completed",
                )
            )

            if exam is None:
                return False

            db.delete(
                exam
            )

            db.commit()

            return True

        except Exception:

            db.rollback()

            raise

        finally:

            db.close()

    # --------------------------------------------------
    # Filter by mode
    # --------------------------------------------------

    def get_by_mode(
        self,
        mode: str,
    ):

        history = (
            self.get_history()
        )

        return [
            exam
            for exam in history
            if exam["mode"].lower()
            == mode.lower()
        ]

    # --------------------------------------------------
    # Filter by Question Bank
    # --------------------------------------------------

    def get_by_question_bank(
        self,
        bank_name: str,
    ):

        history = (
            self.get_history()
        )

        return [
            exam
            for exam in history
            if exam[
                "questionBank"
            ].lower()
            == bank_name.lower()
        ]

    # --------------------------------------------------
    # Dashboard recent exams
    # --------------------------------------------------

    def get_recent(
        self,
        limit: int = 5,
    ):

        db = SessionLocal()

        try:

            statement = (
                select(Exam)
                .options(
                    selectinload(
                        Exam.answers
                    )
                )
                .where(
                    Exam.status
                    == "completed"
                )
                .order_by(
                    Exam.completed_at.desc()
                )
                .limit(
                    limit
                )
            )

            exams = list(
                db.scalars(
                    statement
                ).all()
            )

            return [
                self._serialize_exam(
                    db,
                    exam,
                )
                for exam in exams
            ]

        finally:

            db.close()
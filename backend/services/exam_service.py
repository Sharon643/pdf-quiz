import json
import random
import uuid
from pathlib import Path
from utils.exam_manager import ExamManager


class ExamService:

    def __init__(self):

        self.question_bank = Path("data/extracted/current.json")

        self.session_dir = Path("data/exams/sessions")
        self.key_dir = Path("data/exams/keys")

        self.session_dir.mkdir(parents=True, exist_ok=True)
        self.key_dir.mkdir(parents=True, exist_ok=True)

    def generate_exam(self, question_count: int):

        # -----------------------------
        # Load Question Bank
        # -----------------------------

        with open(
            self.question_bank,
            "r",
            encoding="utf-8",
        ) as f:
            questions = json.load(f)

        random.shuffle(questions)

        selected = questions[: min(question_count, len(questions))]

        exam_id = str(uuid.uuid4())

        session_questions = []
        answer_key = {}

        # -----------------------------
        # Build Session + Answer Key
        # -----------------------------

        for question in selected:

            question_id = str(uuid.uuid4())

            answer_key[question_id] = {
                "correctAnswer": question.get("correct_answer"),
                "correctOption": question.get("correct_option"),
                "explanation": question.get("explanation", ""),
            }

            frontend_question = question.copy()

            frontend_question.pop("correct_answer", None)
            frontend_question.pop("correct_option", None)
            frontend_question.pop("explanation", None)

            frontend_question["id"] = question_id

            session_questions.append(frontend_question)

        # -----------------------------
        # Exam Session
        # -----------------------------

        session = {
            "examId": exam_id,
            "questionCount": len(session_questions),
            "questions": session_questions,
            "answers": {},
            "completed": False,
        }

        # -----------------------------
        # Save Files
        # -----------------------------

        session_file = self.session_dir / f"{exam_id}.json"

        key_file = self.key_dir / f"{exam_id}.json"

        with open(
            session_file,
            "w",
            encoding="utf-8",
        ) as f:

            json.dump(
                session,
                f,
                indent=4,
                ensure_ascii=False,
            )

        with open(
            key_file,
            "w",
            encoding="utf-8",
        ) as f:

            json.dump(
                answer_key,
                f,
                indent=4,
                ensure_ascii=False,
            )

        return {
            "success": True,
            "examId": exam_id,
            "questionCount": len(session_questions),
        }
    
    def get_exam(self, exam_id: str):

        manager = ExamManager(exam_id)

        return manager.read_session()
    
    def save_answer(
        self,
        exam_id: str,
        question_id: str,
        selected_option: str | None,
    ):
        manager = ExamManager(exam_id)

        session = manager.read_session()

        if session is None:
            return None

        valid_question_ids = {
            question["id"]
            for question in session["questions"]
        }

        if question_id not in valid_question_ids:
            raise ValueError("Invalid question ID.")

        return manager.update_answer(
            question_id,
            selected_option,
        )
    
    def mark_for_review(
    self,
    exam_id: str,
    question_id: str,
    marked: bool,
):

        manager = ExamManager(exam_id)

        return manager.mark_for_review(
            question_id,
            marked,
        )
    
    def submit_exam(self, exam_id: str):

        manager = ExamManager(exam_id)

        session = manager.read_session()
        answer_key = manager.read_answer_key()

        if session is None or answer_key is None:
            return None

        correct = 0
        wrong = 0
        unanswered = 0

        answers = session.get("answers", {})

        for question_id, key in answer_key.items():

            user_answer = answers.get(question_id, {}).get("selectedOption")

            if user_answer is None:
                unanswered += 1

            elif user_answer == key["correctAnswer"]:
                correct += 1

            else:
                wrong += 1

        total = len(answer_key)

        percentage = round((correct / total) * 100, 2) if total else 0

        session["completed"] = True

        manager.save_session(session)

        return {
            "success": True,
            "score": correct,
            "totalQuestions": total,
            "correctAnswers": correct,
            "wrongAnswers": wrong,
            "unanswered": unanswered,
            "percentage": percentage,
        }
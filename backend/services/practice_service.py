import json
import random
import uuid
from pathlib import Path
from utils.exam_manager import ExamManager
from utils.question_bank import QuestionBankManager
from datetime import datetime, UTC

class PracticeService:

    def __init__(self):

        self.bank_manager = QuestionBankManager()

        self.session_dir = Path("data/practice/sessions")

        self.session_dir.mkdir(
            parents=True,
            exist_ok=True,
        )

    def start_practice(
        self,
        question_count: int,
    ):

        # -----------------------------
        # Load Question Bank
        # -----------------------------

        active_bank = self.bank_manager.get_active_bank()

        if active_bank is None:
            raise ValueError("No active question bank found.")

        question_bank = (
            Path("data/extracted")
            / active_bank["jsonFile"]
        )

        with open(
            question_bank,
            "r",
            encoding="utf-8",
        ) as f:
            questions = json.load(f)

        random.shuffle(questions)

        selected = questions[: min(question_count, len(questions))]

        practice_id = str(uuid.uuid4())

        session_questions = []

        # -----------------------------
        # Build Session + Answer Key
        # -----------------------------

        for question in selected:

            question_id = str(uuid.uuid4())



            frontend_question = question.copy()

            frontend_question["id"] = question_id

            session_questions.append(frontend_question)

        # -----------------------------
        # Exam Session
        # -----------------------------

        session = {
            "practiceId": practice_id,

            "questionBank": active_bank["fileName"],

            "questionCount": len(session_questions),

            "startedAt": datetime.now(UTC).isoformat(),


            "questions": session_questions,
            "answers": {},
        
        }

        # -----------------------------
        # Save Files
        # -----------------------------

        session_file = self.session_dir / f"{practice_id}.json"

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

        return {
            "success": True,
            "practiceId": practice_id,
            "questionCount": len(session_questions),
            "questionBank": active_bank["fileName"],
        }
    

    def get_practice(self, practice_id: str):

        manager = ExamManager(practice_id,mode="practice",)

        session = manager.read_session()

        if session is None:
            return None

        return session
    
    def submit_answer(
        self,
        practice_id: str,
        question_id: str,
        selected_option: str,
    ):
        manager = ExamManager(practice_id,mode="practice",)

        session = manager.read_session()

        if session is None:
            return None

        question = next(
            (
                q
                for q in session["questions"]
                if q["id"] == question_id
            ),
            None,
        )

        if question is None:
            raise ValueError("Invalid question.")

        session["answers"][question_id] = {
            "selectedOption": selected_option
        }

        manager.save_session(session)

        correct_answer = (
            question.get("correctAnswer")
            or question.get("correct_answer")
        )

        return {
            "correct": selected_option == correct_answer,
            "correctAnswer": correct_answer,
            "explanation": question.get("explanation", ""),
        }
    
    def finish_practice(
        self,
        practice_id: str,
    ):
        manager = ExamManager(practice_id,mode="practice",)

        session = manager.read_session()

        if session is None:
            return None

        correct = 0
        wrong = 0
        skipped = 0

        for question in session["questions"]:

            answer = session["answers"].get(
                question["id"]
            )

            if answer is None:
                skipped += 1

            elif (
                answer["selectedOption"]
                == question["correct_answer"]
            ):
                correct += 1

            else:
                wrong += 1

        total = len(session["questions"])

        accuracy = (
            round(correct / total * 100, 2)
            if total
            else 0
        )

        return {
            "correct": correct,
            "wrong": wrong,
            "skipped": skipped,
            "accuracy": accuracy,
        }


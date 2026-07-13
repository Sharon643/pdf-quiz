import json
from pathlib import Path


class ReviewService:

    def __init__(self):

        self.session_dir = Path("data/exams/sessions")
        self.key_dir = Path("data/exams/keys")
        self.history_dir = Path("data/exams/history")

    # --------------------------------------------------
    # Complete review data for one exam
    # --------------------------------------------------

    def get_review(self, exam_id: str):

        session_file = (
            self.session_dir /
            f"{exam_id}.json"
        )

        key_file = (
            self.key_dir /
            f"{exam_id}.json"
        )

        history_file = (
            self.history_dir /
            f"{exam_id}.json"
        )

        if (
            not session_file.exists()
            or not key_file.exists()
            or not history_file.exists()
        ):
            return None

        with open(
            session_file,
            "r",
            encoding="utf-8",
        ) as f:
            session = json.load(f)

        with open(
            key_file,
            "r",
            encoding="utf-8",
        ) as f:
            answer_key = json.load(f)

        with open(
            history_file,
            "r",
            encoding="utf-8",
        ) as f:
            history = json.load(f)

        review_questions = []

        answers = session.get("answers", {})

        for index, question in enumerate(session["questions"]):

            question_id = question["id"]

            user_answer = answers.get(
                question_id,
                {},
            ).get("selectedOption")

            marked = answers.get(
                question_id,
                {},
            ).get("markedForReview", False)

            key = answer_key[question_id]

            review_questions.append({
                "id": question_id,
                "index": index,
                "question": question["question"],
                "options": question["options"],
                "userAnswer": user_answer,
                "correctAnswer": key["correctAnswer"],
                "correctOption": key["correctOption"],
                "marked": marked,
                "explanation": key.get("explanation", ""),

                "isCorrect": (
                    user_answer == key["correctAnswer"]
                    if user_answer is not None
                    else False
                ),

                "isSkipped": user_answer is None,
            })

        return {

            "examId": exam_id,

            "summary": history,

            "questions": review_questions,

        }
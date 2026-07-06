import json
from pathlib import Path


class ExamManager:
    def __init__(self, exam_id: str):
        self.exam_id = exam_id

        self.session_file = (
            Path("data/exams/sessions")
            / f"{exam_id}.json"
        )

        self.key_file = (
            Path("data/exams/keys")
            / f"{exam_id}.json"
        )

    def read_session(self):
        if not self.session_file.exists():
            return None

        with open(
            self.session_file,
            "r",
            encoding="utf-8",
        ) as f:
            return json.load(f)

    def save_session(self, session: dict):
        self.session_file.parent.mkdir(
            parents=True,
            exist_ok=True,
        )

        with open(
            self.session_file,
            "w",
            encoding="utf-8",
        ) as f:
            json.dump(
                session,
                f,
                indent=4,
                ensure_ascii=False,
            )

    def read_answer_key(self):
        if not self.key_file.exists():
            return None

        with open(
            self.key_file,
            "r",
            encoding="utf-8",
        ) as f:
            return json.load(f)
        
    def update_answer(
    self,
    question_id: str,
    selected_option: str | None,
):
        session = self.read_session()

        if session is None:
            return None

        answers = session.setdefault("answers", {})

        existing = answers.get(
            question_id,
            {
                "visited": True,
                "markedForReview": False,
            },
        )

        existing["selectedOption"] = selected_option

        answers[question_id] = existing

        self.save_session(session)

        return session
    
    def mark_for_review(
        self,
        question_id: str,
        marked: bool,
    ):
        session = self.read_session()

        if session is None:
            return None

        answers = session.setdefault("answers", {})

        existing = answers.get(
            question_id,
            {
                "selectedOption": None,
                "visited": True,
            },
        )

        existing["markedForReview"] = marked

        answers[question_id] = existing

        self.save_session(session)

        return session
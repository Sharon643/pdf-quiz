import json
from pathlib import Path


class HistoryService:

    def __init__(self):

        self.history_dir = Path("data/exams/history")
        self.history_dir.mkdir(
            parents=True,
            exist_ok=True,
        )

    # --------------------------------------------------
    # Return every completed exam
    # --------------------------------------------------

    def get_history(self):

        history = []

        files = sorted(
            self.history_dir.glob("*.json"),
            key=lambda file: file.stat().st_mtime,
            reverse=True,
        )

        for file in files:

            try:

                with open(
                    file,
                    "r",
                    encoding="utf-8",
                ) as f:

                    history.append(json.load(f))

            except Exception:

                continue

        return history

    # --------------------------------------------------
    # Return one history entry
    # --------------------------------------------------

    def get_exam(self, exam_id: str):

        history_file = (
            self.history_dir /
            f"{exam_id}.json"
        )

        if not history_file.exists():
            return None

        with open(
            history_file,
            "r",
            encoding="utf-8",
        ) as f:

            return json.load(f)

    # --------------------------------------------------
    # Delete history
    # --------------------------------------------------

    def delete_exam(self, exam_id: str):

        history_file = (
            self.history_dir /
            f"{exam_id}.json"
        )

        if not history_file.exists():
            return False

        history_file.unlink()

        return True

    # --------------------------------------------------
    # Filter by mode
    # --------------------------------------------------

    def get_by_mode(
        self,
        mode: str,
    ):

        history = self.get_history()

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

        history = self.get_history()

        return [
            exam
            for exam in history
            if exam["questionBank"].lower()
            == bank_name.lower()
        ]

    # --------------------------------------------------
    # Dashboard recent exams
    # --------------------------------------------------

    def get_recent(
        self,
        limit: int = 5,
    ):

        return self.get_history()[:limit]
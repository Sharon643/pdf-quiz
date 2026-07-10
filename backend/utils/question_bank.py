from pathlib import Path
from datetime import datetime
import json

QUESTION_BANK_FILE = Path("data/extracted/question_bank.json")


class QuestionBankManager:

    def save(
        self,
        file_name: str,
        question_count: int,
    ):

        QUESTION_BANK_FILE.parent.mkdir(
            parents=True,
            exist_ok=True,
        )

        now = datetime.now().isoformat()

        data = {
            "fileName": file_name,
            "questionCount": question_count,
            "uploadedAt": now,
            "lastModified": now,
        }

        with open(
            QUESTION_BANK_FILE,
            "w",
            encoding="utf-8",
        ) as f:
            json.dump(
                data,
                f,
                indent=4,
            )

    def read(self):

        if not QUESTION_BANK_FILE.exists():
            return None

        with open(
            QUESTION_BANK_FILE,
            "r",
            encoding="utf-8",
        ) as f:
            return json.load(f)
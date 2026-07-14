from pathlib import Path
from datetime import datetime
import json
import uuid

QUESTION_BANK_FILE = Path("data/extracted/question_bank.json")
EXTRACTED_DIR = Path("data/extracted")

QUESTION_BANK_FILE.parent.mkdir(parents=True, exist_ok=True)
EXTRACTED_DIR.mkdir(parents=True, exist_ok=True)


class QuestionBankManager:

    def _load(self):

        if not QUESTION_BANK_FILE.exists():
            return {
                "activeBank": None,
                "banks": [],
            }

        with open(
            QUESTION_BANK_FILE,
            "r",
            encoding="utf-8",
        ) as f:
            return json.load(f)

    def _save(self, data):

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

    def create_bank(
        self,
        file_name: str,
        question_count: int,
    ):

        data = self._load()

        now = datetime.now().isoformat()

        bank_id = str(uuid.uuid4())

        json_file = f"{bank_id}.json"

        for bank in data["banks"]:
            bank["active"] = False

        new_bank = {
            "id": bank_id,
            "fileName": file_name,
            "jsonFile": json_file,
            "questionCount": question_count,
            "uploadedAt": now,
            "lastModified": now,
            "active": True,
        }

        data["banks"].append(new_bank)

        data["activeBank"] = bank_id

        self._save(data)

        return new_bank

    def get_all_banks(self):

        return self._load()["banks"]

    def get_active_bank(self):

        data = self._load()

        active = data.get("activeBank")

        if active is None:
            return None

        for bank in data["banks"]:

            if bank["id"] == active:
                return bank

        return None

    def set_active_bank(
        self,
        bank_id: str,
    ):

        data = self._load()

        found = False

        for bank in data["banks"]:

            if bank["id"] == bank_id:

                bank["active"] = True

                found = True

            else:

                bank["active"] = False

        if not found:
            return False

        data["activeBank"] = bank_id

        self._save(data)

        return True

    def delete_bank(
        self,
        bank_id: str,
    ):

        data = self._load()

        bank = None

        for b in data["banks"]:

            if b["id"] == bank_id:
                bank = b
                break

        if bank is None:
            return False

        json_path = EXTRACTED_DIR / bank["jsonFile"]

        if json_path.exists():
            json_path.unlink()

        data["banks"] = [
            b
            for b in data["banks"]
            if b["id"] != bank_id
        ]

        if data["activeBank"] == bank_id:

            if data["banks"]:

                data["banks"][0]["active"] = True

                data["activeBank"] = data["banks"][0]["id"]

            else:

                data["activeBank"] = None

        self._save(data)

        return True
    
    def get_bank(self, bank_id: str):
        for bank in self.get_all_banks():
            if bank["id"] == bank_id:
                return bank

        return None
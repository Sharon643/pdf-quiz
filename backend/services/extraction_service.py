from pathlib import Path
import json
import shutil

from extractor.extractor import Extractor
from utils.progress import ProgressManager
from utils.question_bank import QuestionBankManager


class ExtractionService:
    def __init__(self):
        self.extractor = Extractor()

    def extract(
        self,
        pdf_path: Path,
        job_id: str,
    ) -> dict:
        """
        Extract questions from a PDF and create a new question bank.
        """

        progress = ProgressManager(job_id)

        progress.update(
            stage="starting",
            percent=0,
            message="Preparing extraction...",
        )

        output_json = self.extractor.run(
            str(pdf_path),
            progress=progress,
        )

        with open(
            output_json,
            "r",
            encoding="utf-8",
        ) as f:
            questions = json.load(f)

        subjects = len(
            {
                q.get("subject", "Unknown")
                for q in questions
            }
        )

        manager = QuestionBankManager()

        bank = manager.create_bank(
            file_name=pdf_path.name,
            question_count=len(questions),
        )

        destination = (
            Path("data/extracted")
            / bank["jsonFile"]
        )

        shutil.copy2(
            output_json,
            destination,
        )

        progress.update(
            stage="completed",
            percent=100,
            message="Extraction completed!",
            completed=True,
        )

        return {
            "success": True,
            "jobId": job_id,
            "bankId": bank["id"],
            "fileName": bank["fileName"],
            "questionCount": len(questions),
            "subjects": subjects,
        }
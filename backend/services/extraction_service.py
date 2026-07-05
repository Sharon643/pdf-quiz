from pathlib import Path
import json
import shutil
from extractor.extractor import Extractor
from utils.progress import ProgressManager


class ExtractionService:
    def __init__(self):
        self.extractor = Extractor()

    def extract(self, pdf_path: Path, job_id: str) -> dict:
        """
        Extract questions from a PDF while updating progress.
        """

        progress = ProgressManager(job_id)

        progress.update(
            stage="starting",
            percent=0,
            message="Starting extraction..."
        )

        output_json = self.extractor.run(
            str(pdf_path),
            progress=progress,
        )
        CURRENT_BANK = Path("data/extracted/current.json")

        CURRENT_BANK.parent.mkdir(
            parents=True,
            exist_ok=True,
        )

        shutil.copy2(
            output_json,
            CURRENT_BANK,
        )

        with open(output_json, "r", encoding="utf-8") as f:
            questions = json.load(f)

        subjects = len(
            {
                q.get("subject", "Unknown")
                for q in questions
            }
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
            "filename": pdf_path.name,
            "questionCount": len(questions),
            "subjects": subjects,
            "outputFile": str(output_json),
        }
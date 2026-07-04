from pathlib import Path
import json

from extractor.extractor import Extractor


class ExtractionService:

    def __init__(self):

        self.extractor = Extractor()

    def extract(self, pdf_path: Path):

        output_json = self.extractor.run(str(pdf_path))

        with open(output_json, "r", encoding="utf-8") as f:
            questions = json.load(f)

        subjects = len(
            {
                q["subject"]
                for q in questions
            }
        )

        return {

            "success": True,

            "filename": pdf_path.name,

            "questionCount": len(questions),

            "subjects": subjects,

            "outputFile": str(output_json)

        }
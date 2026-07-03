import json
import re
import time

from google import genai

from backend.extractor.config import API_KEY, MODEL, MAX_RETRIES
from backend.extractor.prompt import PROMPT


class GeminiClient:

    def __init__(self):

        self.client = genai.Client(api_key=API_KEY)

    def _clean_json(self, text: str) -> str:
        """
        Remove markdown fences if Gemini returns them.
        """

        text = text.strip()

        text = re.sub(r"^```json", "", text, flags=re.IGNORECASE)
        text = re.sub(r"^```", "", text)
        text = re.sub(r"```$", "", text)

        return text.strip()

    def extract(self, pdf_path: str):

        pdf = self.client.files.upload(
            file=pdf_path
        )

        last_exception = None

        for attempt in range(MAX_RETRIES):

            try:

                print(f"Attempt {attempt + 1}")

                response = self.client.models.generate_content(
                    model=MODEL,
                    contents=[
                        pdf,
                        PROMPT
                    ]
                )
                raw = response.text

                with open(
                    "failed_response.txt",
                    "w",
                    encoding="utf8"
                ) as f:
                    f.write(raw)

                text = self._clean_json(raw)

                data = json.loads(text)

                if not isinstance(data, list):
                    raise ValueError(
                        "Gemini did not return a JSON array."
                    )

                print(f"Extracted {len(data)} questions.")

                return data

            except Exception as e:

                last_exception = e

                print(f"Attempt {attempt+1} failed.")

                print(e)

                wait = 2 ** attempt

                print(f"Retrying in {wait} seconds...\n")

                time.sleep(wait)

        raise RuntimeError(
            f"Extraction failed after {MAX_RETRIES} attempts.\n\n{last_exception}"
        )
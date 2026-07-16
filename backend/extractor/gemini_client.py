import time

from google import genai

from extractor.config import (
    API_KEY,
    MODEL,
    MAX_RETRIES,
)

from extractor.json_parser import JSONParser
from extractor.prompts.prompt import PROMPT


class GeminiClient:

    def __init__(self):
        self.client = genai.Client(api_key=API_KEY)

    def _build_prompt(
        self,
        chunk_number: int,
        total_chunks: int,
    ) -> str:

        return f"""
=====================================================================
RUNTIME CONTEXT
=====================================================================

You are processing one chunk of a larger educational PDF.

Current Chunk: {chunk_number} of {total_chunks}

The original PDF has been split into chunks to remain within the model's
context window.

Process ONLY the information contained in this chunk.

=====================================================================
CHUNK RULES
=====================================================================

• Never assume missing information.

• Never reconstruct missing text.

• Never invent options.

• Never invent answers.

• Never merge unrelated questions.

• If a question is incomplete, skip it.

• Only extract questions that are completely contained within this chunk.

• If the same question appears multiple times inside this chunk,
extract it only once.

Accuracy is more important than quantity.

=====================================================================

{PROMPT}
"""

    def _upload_pdf(
        self,
        pdf_path: str,
    ):
        return self.client.files.upload(file=pdf_path)

    def extract(
        self,
        pdf_path: str,
        chunk_number: int,
        total_chunks: int,
    ):

        pdf = self._upload_pdf(pdf_path)

        prompt = self._build_prompt(
            chunk_number,
            total_chunks,
        )

        last_exception = None

        for attempt in range(1, MAX_RETRIES + 1):

            print("=" * 60)
            print(
                f"Chunk {chunk_number}/{total_chunks}"
            )
            print(
                f"Attempt {attempt}/{MAX_RETRIES}"
            )
            print("=" * 60)

            raw = None

            try:

                response = self.client.models.generate_content(
                    model=MODEL,
                    contents=[
                        pdf,
                        prompt,
                    ],
                )

                raw = response.text

                questions = JSONParser.parse(raw)

                print(
                    f"✓ Parsed {len(questions)} questions."
                )

                return questions

            except Exception as e:

                last_exception = e

                print(f"✗ {e}")

                if raw:

                    with open(
                        f"failed_chunk_{chunk_number}.txt",
                        "w",
                        encoding="utf-8",
                    ) as f:
                        f.write(raw)

                if attempt == MAX_RETRIES:
                    break

                wait = 2 ** (attempt - 1)

                print(
                    f"Retrying in {wait} seconds...\n"
                )

                time.sleep(wait)

        raise RuntimeError(
            "Gemini extraction failed after "
            f"{MAX_RETRIES} attempts.\n\n"
            f"{last_exception}"
        )
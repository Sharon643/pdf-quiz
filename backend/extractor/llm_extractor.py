from google import genai
import json

from backend.extractor.config import API_KEY, MODEL


class LLMExtractor:

    def __init__(self):

        self.client = genai.Client(
            api_key=API_KEY
        )

    def extract(self, pdf_path):

        print(f"Uploading {pdf_path}")

        pdf = self.client.files.upload(
            file=pdf_path
        )

        prompt = """
You are an expert document extraction system.

Extract every MCQ from this PDF.

Each question has:

- question number
- subject
- question
- options A,B,C,D
- one highlighted correct answer

Return ONLY valid JSON.

Schema:

{
    "questions":[
        {
            "id":143,
            "subject":"",
            "question":"",
            "options":{
                "A":"",
                "B":"",
                "C":"",
                "D":""
            },
            "correct_answer":""
        }
    ]
}

Do not wrap the JSON in markdown.

Do not explain anything.

Output ONLY JSON.
"""

        response = self.client.models.generate_content(
            model=MODEL,
            contents=[
                pdf,
                prompt
            ]
        )

        text = response.text.strip()

        # Remove markdown if Gemini adds it
        text = text.replace("```json", "")
        text = text.replace("```", "")

        data = json.loads(text)

        print(type(data))
        print(data[:1] if isinstance(data, list) else list(data.keys()))

        return data
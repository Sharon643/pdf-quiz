import json
import re


class JSONParser:

    @staticmethod
    def parse(raw: str):

        text = raw.strip()

        text = re.sub(
            r"^```json\s*",
            "",
            text,
            flags=re.IGNORECASE,
        )

        text = re.sub(
            r"^```",
            "",
            text,
        )

        text = re.sub(
            r"```$",
            "",
            text,
        )

        text = text.strip()

        try:
            data = json.loads(text)

        except json.JSONDecodeError as e:
            raise ValueError(
                f"Gemini returned invalid JSON.\n\n{e}"
            )

        if not isinstance(data, list):
            raise ValueError(
                "Gemini response must be a JSON array."
            )

        return data
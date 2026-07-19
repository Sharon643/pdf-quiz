import json
import re
from typing import Any


class JSONParser:
    """
    Parses and normalizes Gemini responses.

    Responsibilities
    ----------------
    - Remove markdown code fences.
    - Parse JSON.
    - Normalize field names.
    - Ensure the root object is a list.
    - Populate optional fields.
    """

    FIELD_MAP = {
        "correctAnswer": "correct_answer",
        "correctOption": "correct_option",
    }

    OPTIONAL_FIELDS = {
        "page": None,
        "correct_answer": None,
        "answer_source": "none",
        "confidence": None,
        "explanation": "",
    }
    @classmethod
    def parse(cls, raw: str) -> list[dict]:

        cleaned = cls._clean(raw)

        data = cls._load_json(cleaned)

        data = cls._ensure_list(data)

        return [cls._normalize(question) for question in data]

    @staticmethod
    def _clean(text: str) -> str:
        """
        Remove markdown wrappers.
        """

        text = text.strip()

        text = re.sub(
            r"^```(?:json)?\s*",
            "",
            text,
            flags=re.IGNORECASE,
        )

        text = re.sub(
            r"\s*```$",
            "",
            text,
        )

        return text.strip()

    @staticmethod
    def _load_json(text: str):

        try:
            return json.loads(text)

        except json.JSONDecodeError as e:
            raise ValueError(
                f"Invalid JSON returned by Gemini.\n\n{e}"
            )

    @staticmethod
    def _ensure_list(data):

        if isinstance(data, list):
            return data

        if isinstance(data, dict):

            if "questions" in data:
                return data["questions"]

        raise ValueError(
            "Gemini response must be a JSON array."
        )

    @classmethod
    def _normalize(
        cls,
        question: dict[str, Any],
    ) -> dict:

        normalized = {}

        for key, value in question.items():

            key = cls.FIELD_MAP.get(key, key)

            normalized[key] = value

        for field, default in cls.OPTIONAL_FIELDS.items():

            normalized.setdefault(field, default)

        return normalized
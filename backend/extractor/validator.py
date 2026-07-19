from __future__ import annotations

from typing import Any


class Validator:
    """
    Validates extracted questions against the canonical schema.
    """

    REQUIRED_FIELDS = {
        "id",
        "number",
        "page",
        "subject",
        "question",
        "options",
        "correct_answer",
        "answer_source",
        "confidence",
        "explanation",
    }

    VALID_OPTIONS = {"A", "B", "C", "D"}

    @classmethod
    def validate(
        cls,
        questions: list[dict[str, Any]],
    ) -> tuple[list[dict[str, Any]], list[str]]:

        valid_questions = []
        errors = []

        seen_ids = set()
        seen_numbers = set()

        for index, question in enumerate(questions, start=1):

            question_errors = cls._validate_question(
                question,
                seen_ids,
                seen_numbers,
            )

            if question_errors:

                errors.extend(
                    [
                        f"Question {index}: {error}"
                        for error in question_errors
                    ]
                )

                continue

            valid_questions.append(question)

        return valid_questions, errors

    @classmethod
    def _validate_question(
        cls,
        question: dict[str, Any],
        seen_ids: set[str],
        seen_numbers: set[int],
    ) -> list[str]:

        errors = []

        missing = cls.REQUIRED_FIELDS - question.keys()

        if missing:
            return [
                f"Missing required fields: {', '.join(sorted(missing))}"
            ]

        # --------------------------------------------------
        # ID
        # --------------------------------------------------

        question_id = question["id"]

        if not isinstance(question_id, str):

            errors.append("id must be a string.")

        elif not question_id.strip():

            errors.append("id cannot be empty.")

        elif question_id in seen_ids:

            errors.append("Duplicate id.")

        else:

            seen_ids.add(question_id)

        # --------------------------------------------------
        # Number
        # --------------------------------------------------

        number = question["number"]

        if not isinstance(number, int):

            errors.append("number must be an integer.")

        elif number <= 0:

            errors.append("number must be positive.")

        elif number in seen_numbers:

            errors.append("Duplicate question number.")

        else:

            seen_numbers.add(number)

        # --------------------------------------------------
        # Subject
        # --------------------------------------------------

        subject = question["subject"]

        if not isinstance(subject, str):

            errors.append("subject must be a string.")

        elif not subject.strip():

            errors.append("subject cannot be empty.")

        # --------------------------------------------------
        # Question
        # --------------------------------------------------

        text = question["question"]

        if not isinstance(text, str):

            errors.append("question must be a string.")

        elif len(text.strip()) < 5:

            errors.append("question is too short.")

        # --------------------------------------------------
        # Options
        # --------------------------------------------------

        options = question["options"]

        if not isinstance(options, dict):

            errors.append("options must be an object.")

        else:

            if set(options.keys()) != cls.VALID_OPTIONS:

                errors.append(
                    "options must contain exactly A, B, C and D."
                )

            for key in cls.VALID_OPTIONS:

                value = options.get(key)

                if not isinstance(value, str):

                    errors.append(
                        f"Option {key} must be a string."
                    )

                elif not value.strip():

                    errors.append(
                        f"Option {key} cannot be empty."
                    )

        # --------------------------------------------------
        # Page
        # --------------------------------------------------

        page = question["page"]

        if page is not None:

            if not isinstance(page, int):

                errors.append("page must be an integer.")

            elif page <= 0:

                errors.append("page must be positive.")

        # --------------------------------------------------
        # Correct Answer
        # --------------------------------------------------

        answer = question["correct_answer"]

        if answer is not None:

            if answer not in cls.VALID_OPTIONS:

                errors.append("Invalid correct_answer.")

            elif answer not in options:

                errors.append(
                    "correct_answer does not exist in options."
                )

        # --------------------------------------------------
        # Answer Source
        # --------------------------------------------------

        answer_source = question["answer_source"]

        if answer_source not in {"pdf", "ai", "none"}:
            errors.append(
                "answer_source must be 'pdf', 'ai', or 'none'."
            )

        # --------------------------------------------------
        # Confidence
        # --------------------------------------------------

        confidence = question["confidence"]

        if confidence is not None:

            if not isinstance(confidence, (int, float)):
                errors.append(
                    "confidence must be a number."
                )

            elif not (0 <= confidence <= 1):
                errors.append(
                    "confidence must be between 0 and 1."
                )

        # --------------------------------------------------
        # Explanation
        # --------------------------------------------------

        explanation = question["explanation"]

        if explanation is not None:

            if not isinstance(explanation, str):

                errors.append(
                    "explanation must be a string."
                )

        return errors
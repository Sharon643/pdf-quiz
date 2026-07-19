import json
from statistics import mean

from extractor.gemini_client import GeminiClient


class AnswerGenerator:

    BATCH_SIZE = 25

    def __init__(self):
        self.client = GeminiClient()

    def _chunks(self, items):
        for i in range(0, len(items), self.BATCH_SIZE):
            yield items[i:i + self.BATCH_SIZE]

    def generate(self, questions):

        unanswered = [
            q for q in questions
            if not q.get("correct_answer")
        ]

        if not unanswered:
            return {
                "updated": 0,
                "remaining": 0,
                "average_confidence": 0,
            }

        results = []

        for batch in self._chunks(unanswered):

            generated = self.client.generate_answers(batch)

            if generated:
                results.extend(generated)

        answer_map = {
            item["id"]: item
            for item in results
        }

        updated = 0
        confidences = []

        for question in questions:

            result = answer_map.get(question["id"])

            if result is None:
                continue

            question["correct_answer"] = result.get("correct_answer")
            question["confidence"] = result.get("confidence")
            question["explanation"] = result.get("explanation", "")
            question["answer_source"] = (
                "ai"
                if result.get("correct_answer")
                else "none"
            )

            if result.get("confidence") is not None:
                confidences.append(result["confidence"])

            if result.get("correct_answer"):
                updated += 1

        remaining = sum(
            1
            for q in questions
            if not q.get("correct_answer")
        )

        return {
            "updated": updated,
            "remaining": remaining,
            "average_confidence": (
                round(mean(confidences), 2)
                if confidences
                else 0
            ),
        }
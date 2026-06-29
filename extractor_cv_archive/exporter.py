import json


class Exporter:

    @staticmethod
    def save(questions, filename):

        with open(filename, "w", encoding="utf-8") as f:
            json.dump(
                questions,
                f,
                indent=4,
                ensure_ascii=False
            )

        print(f"\nSaved {len(questions)} questions")
        print(f"Output: {filename}")
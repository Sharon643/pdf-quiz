import json
import os
from datetime import datetime


class Validator:

    REQUIRED_FIELDS = [
        "number",
        "page",
        "subject",
        "question",
        "options",
        "correct_answer"
    ]

    REQUIRED_OPTIONS = ["A", "B", "C", "D"]

    VALID_ANSWERS = {"A", "B", "C", "D"}

    @classmethod
    def validate(cls, questions):

        valid_questions = []
        invalid_questions = []

        for question in questions:

            errors = []

            # ---------- Required fields ----------
            for field in cls.REQUIRED_FIELDS:

                if field not in question:
                    errors.append(f"Missing field: {field}")

            if errors:
                question["errors"] = errors
                invalid_questions.append(question)
                continue

            # ---------- Question ----------
            if not str(question["question"]).strip():
                errors.append("Empty question")

            # ---------- Options ----------
            options = question.get("options", {})

            for option in cls.REQUIRED_OPTIONS:

                if option not in options:
                    errors.append(f"Missing option {option}")

                elif not str(options[option]).strip():
                    errors.append(f"Empty option {option}")

            # ---------- Correct Answer ----------
            answer = question.get("correct_answer", "")

            if answer not in cls.VALID_ANSWERS:
                errors.append("Invalid correct_answer")

            elif answer not in options:
                errors.append("correct_answer not found in options")

            # ---------- Derived fields ----------
            question["correct_option"] = options.get(answer, "")

            question["explanation"] = ""

            if errors:
                question["errors"] = errors
                invalid_questions.append(question)
            else:
                valid_questions.append(question)

        return valid_questions, invalid_questions

    @staticmethod
    def save_invalid(invalid_questions, output_dir):

        if not invalid_questions:
            return

        os.makedirs(output_dir, exist_ok=True)

        with open(
            os.path.join(output_dir, "invalid_questions.json"),
            "w",
            encoding="utf8"
        ) as f:

            json.dump(
                invalid_questions,
                f,
                indent=4,
                ensure_ascii=False
            )

   


    @staticmethod
    def save_report(total, valid_questions, invalid_questions, output_dir):

        os.makedirs(output_dir, exist_ok=True)

        report_path = os.path.join(
            output_dir,
            "validation_report.txt"
        )

        with open(
            report_path,
            "w",
            encoding="utf8"
        ) as f:

            f.write("=" * 60 + "\n")
            f.write("PDF QUIZ VALIDATION REPORT\n")
            f.write("=" * 60 + "\n\n")

            f.write(
                f"Generated : {datetime.now()}\n\n"
            )

            f.write(
                f"Total Questions   : {total}\n"
            )

            f.write(
                f"Valid Questions   : {len(valid_questions)}\n"
            )

            f.write(
                f"Invalid Questions : {len(invalid_questions)}\n\n"
            )

            if invalid_questions:

                f.write("=" * 60 + "\n")
                f.write("INVALID QUESTIONS\n")
                f.write("=" * 60 + "\n\n")

                for question in invalid_questions:

                    f.write(
                        f"Question Number : {question.get('number','')}\n"
                    )

                    f.write(
                        f"Subject         : {question.get('subject','')}\n\n"
                    )

                    f.write("Errors\n")
                    f.write("------\n")

                    for error in question["errors"]:

                        f.write(f"- {error}\n")

                    f.write("\n")
                    f.write("-" * 50)
                    f.write("\n\n")
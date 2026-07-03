import json
import os
import re


class Exporter:

    @staticmethod
    def save_chunk(data, chunk_file, output_dir):

        os.makedirs(output_dir, exist_ok=True)

        filename = os.path.basename(chunk_file)
        filename = filename.replace(".pdf", ".json")

        with open(
            os.path.join(output_dir, filename),
            "w",
            encoding="utf8"
        ) as f:

            json.dump(
                data,
                f,
                indent=4,
                ensure_ascii=False
            )

    @staticmethod
    def merge(chunk_dir, output_file):

        import re
        from extractor.validator import Validator

        all_questions = []

        files = sorted(
            [
                f for f in os.listdir(chunk_dir)
                if f.endswith(".json")
            ],
            key=lambda f: int(
                re.search(r"chunk_(\d+)_", f).group(1)
            )
        )

        for file in files:

            with open(
                os.path.join(chunk_dir, file),
                encoding="utf8"
            ) as f:

                all_questions.extend(
                    json.load(f)
                )

        # -------------------------------
        # Validate questions
        # -------------------------------

        valid_questions, invalid_questions = Validator.validate(
            all_questions
        )

        # -------------------------------
        # Assign sequential IDs
        # -------------------------------

        for idx, question in enumerate(valid_questions, start=1):

            question["id"] = idx

        # -------------------------------
        # Save invalid questions
        # -------------------------------

        Validator.save_invalid(
            invalid_questions,
            os.path.dirname(output_file)
        )
        #SAVE REPORT

        Validator.save_report(
        len(all_questions),
        valid_questions,
        invalid_questions,
        os.path.dirname(output_file)
    )

        # -------------------------------
        # Save final JSON
        # -------------------------------

        os.makedirs(
            os.path.dirname(output_file),
            exist_ok=True
        )

        with open(
            output_file,
            "w",
            encoding="utf8"
        ) as f:

            json.dump(
                valid_questions,
                f,
                indent=4,
                ensure_ascii=False
            )

        print("\n" + "=" * 60)
        print("PDF EXTRACTION SUMMARY")
        print("=" * 60)

        print(f"Total Questions   : {len(all_questions)}")
        print(f"Valid Questions   : {len(valid_questions)}")
        print(f"Invalid Questions : {len(invalid_questions)}")

        validation_rate = (
            len(valid_questions) / len(all_questions) * 100
            if all_questions else 0
        )

        print(f"Validation Rate   : {validation_rate:.2f}%")

        print(f"\nQuestions JSON    : {output_file}")

        print(
            f"Invalid Questions : "
            f"{os.path.join(os.path.dirname(output_file), 'invalid_questions.json')}"
        )

        print(
            f"Validation Report : "
            f"{os.path.join(os.path.dirname(output_file), 'validation_report.txt')}"
        )

        print("=" * 60)
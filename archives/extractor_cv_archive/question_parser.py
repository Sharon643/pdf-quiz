import re


class QuestionParser:

    def __init__(self):
        self.questions = []
        self.current = None
        self.current_option = None

    def parse(self, text):

        page_questions = []

        lines = [line.strip() for line in text.split("\n")]

        for line in lines:

            if not line:
                continue

            # Skip headers
            if line.startswith("Maryam"):
                continue

            if line.startswith("http"):
                continue

            if line.lower().endswith("system"):
                continue

            # -----------------------------
            # New Question
            # -----------------------------
            if re.match(r"^\d+\.", line):

                if self.current:
                    self.questions.append(self.current)
                    page_questions.append(self.current)

                number = int(re.match(r"^(\d+)\.", line).group(1))

                question = re.sub(r"^\d+\.\s*", "", line)

                self.current = {
                    "number": number,
                    "question": question,
                    "options": {}
                }

                self.current_option = None

                continue

            # -----------------------------
            # Option
            # -----------------------------
            option = re.match(r"^([a-dA-D])\.\s*(.*)", line)

            if option:

                if self.current is None:
                    continue

                letter = option.group(1).upper()

                option_text = option.group(2)

                self.current["options"][letter] = option_text

                self.current_option = letter

                continue

            # -----------------------------
            # Continue option
            # -----------------------------
            if self.current_option:

                self.current["options"][self.current_option] += " " + line

            elif self.current:

                self.current["question"] += " " + line

        return page_questions
    
    def get_questions(self):
        if self.current:
            self.questions.append(self.current)
            self.current = None

        return self.questions
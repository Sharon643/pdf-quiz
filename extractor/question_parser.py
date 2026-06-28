import re


class QuestionParser:

    def parse(self, text):

        lines = [line.strip() for line in text.split("\n")]

        questions = []

        current = None

        current_option = None

        for line in lines:

            if not line:
                continue

            # Skip headers
            if line.startswith("Maryam"):
                continue

            if line == "Respiratory system":
                continue

            if line.startswith("http"):
                continue

           
            # New Question
        
            if re.match(r"^\d+\.", line):

                if current:
                    questions.append(current)

                number = int(re.match(r"^(\d+)\.", line).group(1))

                question = re.sub(r"^\d+\.\s*", "", line)

                current = {
                    "number": number,
                    "question": question,
                    "options": {}
                }

                current_option = None

                continue

          
            # Option
            
            option = re.match(r"^([a-dA-D])\.\s*(.*)", line)

            if option:

                letter = option.group(1).upper()

                text = option.group(2)

                current["options"][letter] = text

                current_option = letter

                continue

            # ----------------------------
            # Continue Previous Option
            # ----------------------------
            if current_option:

                current["options"][current_option] += " " + line

            # ----------------------------
            # Continue Question
            # ----------------------------
            elif current:

                current["question"] += " " + line

        if current:
            questions.append(current)

        return questions
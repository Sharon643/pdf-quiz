from rapidfuzz import fuzz


class AnswerMatcher:

    def match(self, question, ocr_text):

        best_letter = None
        best_score = -1

        for letter, option in question["options"].items():

            score = fuzz.token_set_ratio(
                ocr_text.lower(),
                option.lower()
            )

            if score > best_score:
                best_score = score
                best_letter = letter

        return best_letter, best_score
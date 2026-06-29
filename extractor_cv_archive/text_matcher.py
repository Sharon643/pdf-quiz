import fitz

from question_parser import QuestionParser
from answer_matcher import AnswerMatcher

doc = fitz.open("data/pdf/sample.pdf")

page = doc[1]

text = page.get_text()

parser = QuestionParser()

questions = parser.parse(text)

ocr_answers = [
    "After the nebulizer treatment",
    "Gather the equipment",
    "Suction the airway"
]

matcher = AnswerMatcher()

for question, ocr in zip(questions, ocr_answers):

    letter, score = matcher.match(question, ocr)

    print("=" * 60)

    print("Question", question["number"])

    print("OCR:", ocr)

    print("Predicted:", letter)

    print("Score:", score)
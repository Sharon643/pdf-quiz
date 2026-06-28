import fitz

from extractor.config import INPUT_PDF, OUTPUT_JSON, PDF_DPI

from extractor.question_parser import QuestionParser
from extractor.highlight_detector import HighlightDetector
from extractor.ocr_reader import OCRReader
from extractor.answer_matcher import AnswerMatcher
from extractor.exporter import Exporter


def main():

    parser = QuestionParser()
    ocr = OCRReader()
    matcher = AnswerMatcher()

    doc = fitz.open(INPUT_PDF)

    print("========== STEP 1: Parsing Questions ==========\n")

    # Parse every page while keeping parser state
    for page_number, page in enumerate(doc):

        print(f"Parsing Page {page_number + 1}")

        parser.parse(page.get_text())

    questions = parser.get_questions()

    print(f"\nTotal Questions Parsed : {len(questions)}")

    print("\n========== STEP 2: OCR Extraction ==========\n")

    ocr_answers = []

    for page_number, page in enumerate(doc):

        print(f"OCR Page {page_number + 1}")

        TEMP_IMAGE = "temp_page.png"

        page.get_pixmap(dpi=PDF_DPI).save(TEMP_IMAGE)

        detector = HighlightDetector(TEMP_IMAGE)

        page.get_pixmap(dpi=PDF_DPI).save(TEMP_IMAGE)

        detector = HighlightDetector(TEMP_IMAGE)

        highlights = detector.detect(save_debug=False)

        for highlight in highlights:

            answer = ocr.read(highlight["image"])

            ocr_answers.append(answer)

    print(f"\nTotal OCR Answers : {len(ocr_answers)}")
    print("\nFirst 5 Questions")

    for q in questions[:5]:
        print(q["number"])

    print("\nFirst 5 OCR Answers")

    for a in ocr_answers[:5]:
        print(a)

    print("\n========== STEP 3: Validation ==========\n")

    if len(questions) != len(ocr_answers):

        print("Counts don't match!")
        print(f"Questions : {len(questions)}")
        print(f"OCR Answers : {len(ocr_answers)}")

        return

    print("Counts match!\n")

    print("========== STEP 4: Matching ==========\n")

    for question, answer in zip(questions, ocr_answers):

        letter, score = matcher.match(question, answer)

        question["correct_answer"] = letter
        question["match_score"] = score

    print("Matching complete.\n")

    print("========== STEP 5: Export ==========\n")

    Exporter.save(
        questions,
        OUTPUT_JSON
    )

    print("Done!")


if __name__ == "__main__":
    main()
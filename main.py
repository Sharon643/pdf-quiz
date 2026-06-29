import fitz
import os
import cv2



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
    page_question_counts = []

    for page_number, page in enumerate(doc):

        page_questions = parser.parse(page.get_text())

        page_question_counts.append(len(page_questions))

        print(
            f"Page {page_number+1}: "
            f"{len(page_questions)} questions"
        )

    questions = parser.get_questions()

    print(f"\nTotal Questions Parsed : {len(questions)}")

    print("\n========== STEP 2: OCR Extraction ==========\n")

    ocr_answers = []
    os.makedirs("debug", exist_ok=True)

    highlight_counts = []

    for page_number, page in enumerate(doc):

        print(f"\nOCR Page {page_number+1}")

        image_path = "temp_page.png"

        page.get_pixmap(dpi=PDF_DPI).save(image_path)

        detector = HighlightDetector(image_path)

        highlights = detector.detect(save_debug=False)

        count = len(highlights)
        highlight_counts.append(count)

        print(f"Highlights detected: {count}")

        if count <= 2:

            page_folder = f"debug/page_{page_number+1}"
            os.makedirs(page_folder, exist_ok=True)

            for i, highlight in enumerate(highlights):

                cv2.imwrite(
                    f"{page_folder}/highlight_{i+1}.png",
                    highlight["image"]
                )
        # Save suspicious pages
        if count <= 2:

            print("Possible problem page")

            page.get_pixmap(dpi=300).save(
                f"debug/page_{page_number+1}.png"
            )

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

        print("\n")
    print("=" * 60)
    print("HIGHLIGHT REPORT")
    print("=" * 60)

    for page, count in enumerate(highlight_counts, start=1):
        print(f"Page {page:3} : {count}")

    print("=" * 60)

    print("\n========== PAGE REPORT ==========\n")

    for i in range(len(page_question_counts)):

        q = page_question_counts[i]

        print(f"Page {i+1}: Questions = {q}")

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
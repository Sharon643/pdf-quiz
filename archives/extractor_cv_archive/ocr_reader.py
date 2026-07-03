import re
import easyocr

class OCRReader:

    def __init__(self):
        print("Loading OCR model...")
        self.reader = easyocr.Reader(['en'])

    def read(self, image):

        result = self.reader.readtext(image)

        words = []

        for _, text, confidence in result:
            if confidence > 0.4:
                words.append(text)

        text = " ".join(words)

        # Remove leading option letter like:
        # a.
        # b.
        # C
        # D.
        text = re.sub(r'^[A-Da-d][\.\)]?\s*', '', text)

        return text.strip()
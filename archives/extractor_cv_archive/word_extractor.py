import fitz

class WordExtractor:

    def __init__(self, page):
        self.page = page

    def extract(self):
        words = self.page.get_text("words")

        result = []

        for word in words:
            x0, y0, x1, y1, text, *_ = word

            result.append({
                "text": text,
                "x0": x0,
                "y0": y0,
                "x1": x1,
                "y1": y1
            })

        return result
import fitz

from extractor.word_extractor import WordExtractor
from extractor.highlight_detector import HighlightDetector
from extractor.matcher import Matcher

doc = fitz.open("data/pdf/sample.pdf")

page = doc[1]

print(page.rect)

# Extract words
words = WordExtractor(page).extract()

# Detect highlights
highlights = HighlightDetector("page2.png").detect()

# print("First 5 words:")
# for word in words[:5]:
#     print(word)

# print("\nFirst 5 highlights:")
# for highlight in highlights[:5]:
#     print(highlight)

# Match
answers = Matcher.match(words, highlights)

print("\nDetected highlighted answers:\n")

for answer in answers:
    print(answer)
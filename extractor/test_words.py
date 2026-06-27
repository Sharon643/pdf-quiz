import fitz

doc = fitz.open("data/pdf/sample.pdf")

page = doc[1]          # first question page

words = page.get_text("words")

print(f"Total words: {len(words)}")
print()

for word in words[:80]:
    print(word)
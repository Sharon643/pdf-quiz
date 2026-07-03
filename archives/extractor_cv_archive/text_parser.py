import fitz

doc = fitz.open("data/pdf/sample.pdf")

page = doc[1]

print(page.get_text())
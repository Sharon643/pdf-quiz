import fitz

doc = fitz.open("data/pdf/sample.pdf")

page = doc[1]  # Page 2 (first page with questions)

pix = page.get_pixmap(dpi=300)

pix.save("page2.png")

print("Saved page2.png")
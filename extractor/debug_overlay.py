import fitz
import cv2

doc = fitz.open("data/pdf/sample.pdf")
page = doc[1]

# Same image you used for OpenCV
pix = page.get_pixmap(dpi=300)
pix.save("debug_page.png")

img = cv2.imread("debug_page.png")

SCALE = 300 / 72

words = page.get_text("words")

for word in words:

    x0, y0, x1, y1, text, *_ = word

    x0 *= SCALE
    y0 *= SCALE
    x1 *= SCALE
    y1 *= SCALE

    cv2.rectangle(
        img,
        (int(x0), int(y0)),
        (int(x1), int(y1)),
        (255,0,0),
        1
    )

cv2.imwrite("word_boxes.png", img)

print("Saved word_boxes.png")
import cv2
import numpy as np


class HighlightDetector:

    def __init__(self, image_path):
        self.image = cv2.imread(image_path)

    def detect(self):

        hsv = cv2.cvtColor(self.image, cv2.COLOR_BGR2HSV)

        lower = np.array([20,80,80])
        upper = np.array([40,255,255])

        mask = cv2.inRange(hsv, lower, upper)

        contours,_ = cv2.findContours(
            mask,
            cv2.RETR_EXTERNAL,
            cv2.CHAIN_APPROX_SIMPLE
        )

        highlights = []

        for c in contours:

            x,y,w,h = cv2.boundingRect(c)

            if w*h < 500:
                continue

            highlights.append({
                "x":x,
                "y":y,
                "w":w,
                "h":h
            })

        return highlights
import cv2
import numpy as np
from extractor.rectangle_merger import RectangleMerger


class HighlightDetector:
    def __init__(self, image_path):
        self.image = cv2.imread(image_path)

        if self.image is None:
            raise ValueError(f"Could not load image: {image_path}")

    def detect(self, save_debug=True):
        """
        Detect highlighted answers.

        Returns:
        [
            {
                "image": cropped_image,
                "bbox": (x, y, w, h)
            }
        ]
        """

        hsv = cv2.cvtColor(self.image, cv2.COLOR_BGR2HSV)

        # Yellow highlight range
        lower_yellow = np.array([20, 80, 80])
        upper_yellow = np.array([40, 255, 255])

        mask = cv2.inRange(hsv, lower_yellow, upper_yellow)

        # Remove tiny noise
        kernel = np.ones((3, 3), np.uint8)
        mask = cv2.morphologyEx(
            mask,
            cv2.MORPH_OPEN,
            kernel
        )

        contours, _ = cv2.findContours(
            mask,
            cv2.RETR_EXTERNAL,
            cv2.CHAIN_APPROX_SIMPLE
        )

        rectangles = []

        padding = 5

        for contour in contours:

            x, y, w, h = cv2.boundingRect(contour)

            # Ignore tiny detections
            if w * h < 500:
                continue

            x = max(0, x - padding)
            y = max(0, y - padding)

            w = min(self.image.shape[1] - x, w + padding * 2)
            h = min(self.image.shape[0] - y, h + padding * 2)

            rectangles.append((x, y, w, h))

        # Merge multiline highlights
        merger = RectangleMerger(
            max_vertical_gap=60,
            max_x_difference=40
        )

        rectangles = merger.merge(rectangles)

        debug = self.image.copy()

        detected = []

        for x, y, w, h in rectangles:

            crop = self.image[
                y:y+h,
                x:x+w
            ]

            detected.append({
                "image": crop,
                "bbox": (x, y, w, h)
            })

            if save_debug:
                cv2.rectangle(
                    debug,
                    (x, y),
                    (x + w, y + h),
                    (0, 0, 255),
                    2
                )

        # Sort from top to bottom
        detected.sort(
            key=lambda item: item["bbox"][1]
        )

        if save_debug:
            cv2.imwrite(
                "highlight_debug.png",
                debug
            )

        return detected
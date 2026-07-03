class RectangleMerger:
    """
    Merge highlight rectangles that belong to the same answer.
    """

    def __init__(self, max_vertical_gap=50, max_x_difference=40):
        self.max_vertical_gap = max_vertical_gap
        self.max_x_difference = max_x_difference

    def merge(self, rectangles):

        if not rectangles:
            return []

        # sort from top to bottom
        rectangles = sorted(rectangles, key=lambda r: r[1])

        merged = []

        current = rectangles[0]

        for rect in rectangles[1:]:

            if self.should_merge(current, rect):
                current = self.combine(current, rect)
            else:
                merged.append(current)
                current = rect

        merged.append(current)

        return merged

    def should_merge(self, r1, r2):

        x1, y1, w1, h1 = r1
        x2, y2, w2, h2 = r2

        vertical_gap = y2 - (y1 + h1)

        same_column = abs(x1 - x2) < self.max_x_difference

        width_ratio = min(w1, w2) / max(w1, w2)

        return (
            vertical_gap <= self.max_vertical_gap
            and same_column
            and width_ratio > 0.6
        )
    def combine(self, r1, r2):

        x1, y1, w1, h1 = r1
        x2, y2, w2, h2 = r2

        left = min(x1, x2)
        top = min(y1, y2)

        right = max(x1 + w1, x2 + w2)
        bottom = max(y1 + h1, y2 + h2)

        return (
            left,
            top,
            right - left,
            bottom - top
        )
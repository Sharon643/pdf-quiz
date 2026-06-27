class Matcher:

    @staticmethod
    def overlaps(word, rect):
        """
        Checks whether a word overlaps a highlight rectangle.
        """

        wx0 = word["x0"]
        wy0 = word["y0"]
        wx1 = word["x1"]
        wy1 = word["y1"]

        rx0 = rect["x"]
        ry0 = rect["y"]
        rx1 = rect["x"] + rect["w"]
        ry1 = rect["y"] + rect["h"]

        return not (
            wx1 < rx0 or
            wx0 > rx1 or
            wy1 < ry0 or
            wy0 > ry1
        )

    @staticmethod
    def match(words, highlights):

        results = []

        for rect in highlights:

            detected = []

            for word in words:

                if Matcher.overlaps(word, rect):
                    detected.append(word["text"])

            results.append(" ".join(detected))

        return results
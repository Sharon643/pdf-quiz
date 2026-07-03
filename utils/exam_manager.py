import random


class ExamManager:

    @staticmethod
    def build_exam(
        questions,
        size=75,
        randomize=True,
        subjects=None
    ):

        # Filter by subject if selected
        if subjects:
            questions = [
                q for q in questions
                if q["subject"] in subjects
            ]

        # Shuffle
        if randomize:
            questions = questions.copy()
            random.shuffle(questions)

        # Take requested amount
        if size != "All":
            questions = questions[:int(size)]

        return questions
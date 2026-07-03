def calculate_score(questions, answers):

    score = 0

    wrong = []

    for index, question in enumerate(questions):

        user_answer = answers.get(index)

        if user_answer == question["correct_answer"]:
            score += 1
        else:
            wrong.append(question)

    return score, wrong
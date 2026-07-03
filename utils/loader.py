import json


def load_questions(path):

    with open(path, encoding="utf8") as f:

        return json.load(f)
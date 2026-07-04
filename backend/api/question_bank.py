import json
from pathlib import Path

from fastapi import APIRouter

router = APIRouter()


@router.get("/question-bank")
def get_question_bank():

    json_path = Path("data/extracted/sample.json")

    with open(json_path, "r", encoding="utf-8") as f:
        questions = json.load(f)

    subjects = len(
        set(q["subject"] for q in questions)
    )

    return {
        "questionCount": len(questions),
        "subjects": subjects,
    }
import json
from pathlib import Path

from fastapi import APIRouter, HTTPException

router = APIRouter()

CURRENT_BANK = Path("data/extracted/current.json")


@router.get("/question-bank")
def get_question_bank():

    if not CURRENT_BANK.exists():
        raise HTTPException(
            status_code=404,
            detail="No question bank found.",
        )

    with open(
        CURRENT_BANK,
        "r",
        encoding="utf-8",
    ) as f:
        questions = json.load(f)

    subjects = len(
        {
            q.get("subject", "Unknown")
            for q in questions
        }
    )

    return {
        "questionCount": len(questions),
        "subjects": subjects,
    }
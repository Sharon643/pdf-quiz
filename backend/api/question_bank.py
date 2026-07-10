import json
from pathlib import Path

from fastapi import APIRouter, HTTPException

from utils.question_bank import QuestionBankManager

router = APIRouter()

CURRENT_BANK = Path("data/extracted/current.json")


def load_questions():

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
        return json.load(f)


@router.get("/question-bank")
def get_question_bank():

    questions = load_questions()

    subjects = len(
        {
            q.get("subject")
            for q in questions
            if q.get("subject")
        }
    )

    metadata = QuestionBankManager().read()

    return {
        "fileName": metadata["fileName"] if metadata else "",
        "questionCount": len(questions),
        "subjects": subjects,
        "uploadedAt": metadata["uploadedAt"] if metadata else None,
        "lastModified": metadata["lastModified"] if metadata else None,
        "hasQuestions": len(questions) > 0,
    }


@router.get("/question-bank/questions")
def get_questions():

    questions = load_questions()

    result = []

    for question in questions:
        result.append(
            {
                "id": question.get("id"),
                "number": question.get("number"),
                "page": question.get("page"),
                "subject": question.get("subject"),
                "question": question.get("question"),
                "options": question.get("options"),
            }
        )

    return {
        "count": len(result),
        "questions": result,
    }
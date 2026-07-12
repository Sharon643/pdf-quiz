import json
from pathlib import Path

from fastapi import APIRouter, HTTPException

from utils.question_bank import QuestionBankManager

router = APIRouter()

EXTRACTED_DIR = Path("data/extracted")


def load_questions():

    manager = QuestionBankManager()

    active_bank = manager.get_active_bank()

    if active_bank is None:
        raise HTTPException(
            status_code=404,
            detail="No active question bank found.",
        )

    json_file = (
        EXTRACTED_DIR /
        active_bank["jsonFile"]
    )

    if not json_file.exists():
        raise HTTPException(
            status_code=404,
            detail="Question bank file not found.",
        )

    with open(
        json_file,
        "r",
        encoding="utf-8",
    ) as f:
        return active_bank, json.load(f)


@router.get("/question-bank")
def get_question_bank():

    active_bank, questions = load_questions()

    subjects = len(
        {
            q.get("subject")
            for q in questions
            if q.get("subject")
        }
    )

    return {
        "id": active_bank["id"],
        "fileName": active_bank["fileName"],
        "questionCount": len(questions),
        "subjects": subjects,
        "uploadedAt": active_bank["uploadedAt"],
        "lastModified": active_bank["lastModified"],
        "active": active_bank["active"],
        "hasQuestions": len(questions) > 0,
    }


@router.get("/question-bank/questions")
def get_questions():

    _, questions = load_questions()

    return {
        "count": len(questions),
        "questions": [
            {
                "id": q.get("id"),
                "number": q.get("number"),
                "page": q.get("page"),
                "subject": q.get("subject"),
                "question": q.get("question"),
                "options": q.get("options"),
            }
            for q in questions
        ],
    }


@router.get("/question-banks")
def get_all_question_banks():

    manager = QuestionBankManager()

    return {
        "count": len(manager.get_all_banks()),
        "banks": manager.get_all_banks(),
    }


@router.post("/question-banks/{bank_id}/select")
def select_question_bank(bank_id: str):

    manager = QuestionBankManager()

    success = manager.set_active_bank(bank_id)

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Question bank not found.",
        )

    return {
        "success": True,
        "message": "Question bank selected successfully.",
    }


@router.delete("/question-banks/{bank_id}")
def delete_question_bank(bank_id: str):

    manager = QuestionBankManager()

    success = manager.delete_bank(bank_id)

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Question bank not found.",
        )

    return {
        "success": True,
        "message": "Question bank deleted successfully.",
    }

@router.get("/question-banks/{bank_id}/questions")
def get_question_bank_questions(bank_id: str):

    manager = QuestionBankManager()

    bank = None

    for b in manager.get_all_banks():
        if b["id"] == bank_id:
            bank = b
            break

    if bank is None:
        raise HTTPException(
            status_code=404,
            detail="Question bank not found.",
        )

    json_file = (
        Path("data/extracted")
        / bank["jsonFile"]
    )

    if not json_file.exists():
        raise HTTPException(
            status_code=404,
            detail="Question bank file not found.",
        )

    with open(
        json_file,
        "r",
        encoding="utf-8",
    ) as f:
        questions = json.load(f)

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
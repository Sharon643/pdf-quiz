from fastapi import APIRouter, HTTPException

from services.practice_service import PracticeService

from schemas.practice import (
    StartPracticeRequest,
    SubmitPracticeAnswerRequest,
)

router = APIRouter(prefix="/practice", tags=["Practice"])

service = PracticeService()

@router.post("/start")
def start_practice(
    request: StartPracticeRequest,
):
    return service.start_practice(
        request.questionCount,
        request.questionBankId,
    )

@router.get("/{practice_id}")
def get_practice(
    practice_id: str,
):
    session = service.get_practice(
        practice_id,
    )

    if session is None:
        raise HTTPException(
            404,
            "Practice not found",
        )

    return session

@router.post("/{practice_id}/answer")
def submit_answer(
    practice_id: str,
    request: SubmitPracticeAnswerRequest,
):
    return service.submit_answer(
        practice_id,
        request.questionId,
        request.selectedOption,
    )

@router.post("/{practice_id}/finish")
def finish_practice(
    practice_id: str,
):
    return service.finish_practice(
        practice_id,
    )
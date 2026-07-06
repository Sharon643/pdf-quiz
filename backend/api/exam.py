from fastapi import APIRouter, HTTPException

from schemas.exam import (
    GenerateExamRequest,
    GenerateExamResponse,
    ExamSession,
    SaveAnswerRequest,
    MarkReviewRequest,
    SubmitExamResponse
)

from services.exam_service import ExamService

router = APIRouter()

service = ExamService()


@router.post(
    "/exam/generate",
    response_model=GenerateExamResponse,
)
def generate_exam(request: GenerateExamRequest):
    return service.generate_exam(
        request.questionCount
    )


@router.get(
    "/exam/{exam_id}",
    response_model=ExamSession,
)
def get_exam(exam_id: str):

    exam = service.get_exam(exam_id)

    if exam is None:
        raise HTTPException(
            status_code=404,
            detail="Exam not found.",
        )

    return exam

@router.post("/exam/{exam_id}/answer")
def save_answer(
    exam_id: str,
    request: SaveAnswerRequest,
):

    session = service.save_answer(
        exam_id,
        request.questionId,
        request.selectedOption,
    )

    if session is None:
        raise HTTPException(
            status_code=404,
            detail="Exam not found.",
        )

    return {
        "success": True,
    }

@router.post("/exam/{exam_id}/review")
def mark_for_review(
    exam_id: str,
    request: MarkReviewRequest,
):

    session = service.mark_for_review(
        exam_id,
        request.questionId,
        request.marked,
    )

    if session is None:
        raise HTTPException(
            status_code=404,
            detail="Exam not found.",
        )

    return {
        "success": True,
    }

@router.post(
    "/exam/{exam_id}/submit",
    response_model=SubmitExamResponse,
)
def submit_exam(exam_id: str):

    result = service.submit_exam(exam_id)

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Exam not found.",
        )

    return result
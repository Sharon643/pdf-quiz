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

    unfinished = service.has_unfinished_exam()

    if unfinished is not None:
        return {
            "success": False,
            "unfinishedExam": True,
            "examId": unfinished["examId"],
        }

    return service.generate_exam(
        question_count=request.questionCount,
        timed=request.timed,
        duration_minutes=request.durationMinutes,
    )

@router.get("/exam/current")
def get_current_exam():

    exam = service.get_current_exam()

    return {
        "exists": exam is not None,
        "exam": exam,
    }


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

    try:
        session = service.save_answer(
            exam_id,
            request.questionId,
            request.selectedOption,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
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

@router.get("/exam/unfinished")
def unfinished_exam():

    exam = service.has_unfinished_exam()

    return {
        "exists": exam is not None,
        "exam": exam,
    }


@router.delete("/exam/{exam_id}")
def delete_exam(exam_id: str):

    return service.delete_exam(exam_id)

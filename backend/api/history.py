from fastapi import APIRouter, HTTPException

from services.history_service import HistoryService

from schemas.history import (
    HistoryItem,
    HistoryListResponse,
    DeleteHistoryResponse,
)

router = APIRouter()

service = HistoryService()


@router.get(
    "/history",
    response_model=HistoryListResponse,
)
def get_history():

    return {
        "exams": service.get_history(),
    }


@router.get(
    "/history/recent",
    response_model=HistoryListResponse,
)
def get_recent():

    return {
        "exams": service.get_recent(),
    }


@router.get(
    "/history/{exam_id}",
    response_model=HistoryItem,
)
def get_exam(exam_id: str):

    exam = service.get_exam(exam_id)

    if exam is None:
        raise HTTPException(
            status_code=404,
            detail="History not found.",
        )

    return exam


@router.delete(
    "/history/{exam_id}",
    response_model=DeleteHistoryResponse,
)
def delete_exam(exam_id: str):

    deleted = service.delete_exam(exam_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="History not found.",
        )

    return {
        "success": True,
    }
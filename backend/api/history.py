from fastapi import APIRouter, HTTPException, Depends
from auth.dependencies import get_current_user

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
def get_history(
    current_user=Depends(get_current_user),
):

    return {
        "exams": service.get_history(
    current_user["id"]
    ),
    }


@router.get(
    "/history/recent",
    response_model=HistoryListResponse,
)
def get_recent(current_user=Depends(get_current_user)):

    return {
        "exams": service.get_recent(
    current_user["id"]
    ),
    }


@router.get(
    "/history/{exam_id}",
    response_model=HistoryItem,
)
def get_exam(exam_id: str,current_user=Depends(get_current_user)):

    exam = service.get_exam(
    exam_id,
    current_user["id"],
    )

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
def delete_exam(exam_id: str,current_user=Depends(get_current_user)):

    deleted = service.delete_exam(
    exam_id,
    current_user["id"],
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="History not found.",
        )

    return {
        "success": True,
    }
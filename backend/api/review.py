from fastapi import APIRouter, HTTPException

from services.review_service import ReviewService

from schemas.review import ReviewResponse

router = APIRouter()

service = ReviewService()


@router.get(
    "/review/{exam_id}",
    response_model=ReviewResponse,
)
def get_review(exam_id: str):

    review = service.get_review(exam_id)

    if review is None:

        raise HTTPException(
            status_code=404,
            detail="Review not found.",
        )

    return review
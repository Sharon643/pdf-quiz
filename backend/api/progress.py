from fastapi import APIRouter, HTTPException

from services.progress_service import ProgressService
from schemas.progress import ProgressResponse

router = APIRouter()

service = ProgressService()


@router.get(
    "/progress/{job_id}",
    response_model=ProgressResponse,
)
def get_progress(job_id: str):

    progress = service.get_progress(job_id)

    if progress is None:
        raise HTTPException(
            status_code=404,
            detail="Job not found",
        )

    return progress
from pathlib import Path
import shutil
import uuid

from fastapi import (
    APIRouter,
    BackgroundTasks,
    File,
    HTTPException,
    UploadFile,
)

from services.extraction_service import ExtractionService
from utils.progress import ProgressManager

router = APIRouter()

service = ExtractionService()
job_id = str(uuid.uuid4())


UPLOAD_FOLDER = Path("data/pdf")
UPLOAD_FOLDER.mkdir(
    parents=True,
    exist_ok=True,
)


@router.post("/extract")
async def extract(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
):

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed.",
        )

    pdf_path = UPLOAD_FOLDER / file.filename

    with open(
        pdf_path,
        "wb",
    ) as buffer:
        shutil.copyfileobj(
            file.file,
            buffer,
        )

    job_id = str(uuid.uuid4())

    background_tasks.add_task(
        service.extract,
        pdf_path,
        job_id,
    )

    return {
        "success": True,
        "jobId": job_id,
    }

@router.get("/extract/status/{job_id}")
async def extraction_status(job_id: str):

    progress = ProgressManager(job_id)

    data = progress.read()

    if data is None:
        raise HTTPException(
            status_code=404,
            detail="Job not found.",
        )

    return data
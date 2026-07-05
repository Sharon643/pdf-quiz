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

router = APIRouter()

service = ExtractionService()

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
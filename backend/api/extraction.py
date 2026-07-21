from pathlib import Path
import shutil
import uuid

from fastapi import (
    APIRouter,
    BackgroundTasks,
    Depends,
    File,
    HTTPException,
    UploadFile,
)

from auth.dependencies import (
    get_current_user,
)

from services.extraction_service import (
    ExtractionService,
)

from utils.progress import (
    ProgressManager,
)


router = APIRouter()

service = ExtractionService()


UPLOAD_FOLDER = Path(
    "data/pdf"
)

UPLOAD_FOLDER.mkdir(
    parents=True,
    exist_ok=True,
)


# ============================================================
# Start Extraction
# ============================================================

@router.post("/extract")
async def extract(
    background_tasks: BackgroundTasks,

    file: UploadFile = File(...),

    current_user=Depends(
        get_current_user
    ),
):

    # --------------------------------------------------------
    # Validate PDF
    # --------------------------------------------------------

    if (
        file.content_type
        != "application/pdf"
    ):

        raise HTTPException(
            status_code=400,
            detail=(
                "Only PDF files "
                "are allowed."
            ),
        )


    # --------------------------------------------------------
    # Generate Job ID
    # --------------------------------------------------------

    job_id = str(
        uuid.uuid4()
    )


    # --------------------------------------------------------
    # Create unique PDF path
    # --------------------------------------------------------
    #
    # Don't use only file.filename.
    #
    # Two users could upload:
    #
    # questions.pdf
    #
    # at the same time.
    # --------------------------------------------------------

    safe_filename = (
        Path(
            file.filename
            or "upload.pdf"
        ).name
    )

    pdf_path = (
        UPLOAD_FOLDER
        / f"{job_id}_{safe_filename}"
    )


    # --------------------------------------------------------
    # Save Uploaded PDF
    # --------------------------------------------------------

    with open(
        pdf_path,
        "wb",
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer,
        )


    # --------------------------------------------------------
    # Start Background Extraction
    # --------------------------------------------------------

    background_tasks.add_task(
        service.extract,
        pdf_path,
        job_id,
        current_user["id"],
        safe_filename,
    )


    return {
        "success": True,
        "jobId": job_id,
    }


# ============================================================
# Extraction Status
# ============================================================

@router.get(
    "/extract/status/{job_id}"
)
async def extraction_status(
    job_id: str,

    current_user=Depends(
        get_current_user
    ),
):

    progress = ProgressManager(
        job_id
    )

    data = progress.read()


    if data is None:

        raise HTTPException(
            status_code=404,
            detail="Job not found.",
        )


    return data
from pathlib import Path
import shutil

from fastapi import APIRouter, File, UploadFile, HTTPException

from services.extraction_service import ExtractionService
from schemas.extraction import ExtractionResponse



router = APIRouter()

service = ExtractionService()

UPLOAD_FOLDER = Path("data/pdf")
UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)


@router.post("/extract",response_model=ExtractionResponse)
async def extract(file: UploadFile = File(...)):

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    pdf_path = UPLOAD_FOLDER / file.filename

    with open(pdf_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return service.extract(pdf_path)
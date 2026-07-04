from pydantic import BaseModel


class ExtractionResponse(BaseModel):

    success: bool

    filename: str

    questionCount: int

    subjects: int

    outputFile: str
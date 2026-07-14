from pydantic import BaseModel
from typing import Optional

class StartPracticeRequest(BaseModel):
    questionCount: int
    questionBankId: str | None = None


class StartPracticeResponse(BaseModel):
    success: bool
    practiceId: str
    questionCount: int
    questionBank: str


class SubmitPracticeAnswerRequest(BaseModel):
    questionId: str
    selectedOption: str


class SubmitPracticeAnswerResponse(BaseModel):
    correct: bool
    correctOption: str
    explanation: Optional[str] = None


class FinishPracticeResponse(BaseModel):
    correct: int
    wrong: int
    skipped: int
    accuracy: float
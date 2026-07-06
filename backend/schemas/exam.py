from typing import Any
from pydantic import BaseModel


class GenerateExamRequest(BaseModel):
    questionCount: int = 75


class GenerateExamResponse(BaseModel):
    success: bool
    examId: str
    questionCount: int


class ExamSession(BaseModel):
    examId: str
    questionCount: int
    questions: list[dict[str, Any]]
    answers: dict[str, Any]
    completed: bool


class SaveAnswerRequest(BaseModel):
    questionId: str
    selectedOption: str | None

class MarkReviewRequest(BaseModel):
    questionId: str
    marked: bool

class SubmitExamResponse(BaseModel):
    success: bool
    score: int
    totalQuestions: int
    correctAnswers: int
    wrongAnswers: int
    unanswered: int
    percentage: float
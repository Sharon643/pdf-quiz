from pydantic import BaseModel


class HistoryItem(BaseModel):
    examId: str

    questionBank: str

    mode: str

    questionCount: int

    correct: int

    wrong: int

    unanswered: int

    percentage: float

    completedAt: str

    startedAt: str

    timed: bool

    durationMinutes: int | None = None


class HistoryListResponse(BaseModel):
    exams: list[HistoryItem]


class DeleteHistoryResponse(BaseModel):
    success: bool
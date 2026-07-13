from pydantic import BaseModel


class ReviewQuestion(BaseModel):

    id: str
    
    index: int

    question: str

    options: dict[str, str]

    userAnswer: str | None = None

    correctAnswer: str

    correctOption: str

    marked: bool

    explanation: str

    isCorrect: bool

    isSkipped: bool

class ReviewSummary(BaseModel):

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


class ReviewResponse(BaseModel):

    examId: str

    summary: ReviewSummary

    questions: list[ReviewQuestion]
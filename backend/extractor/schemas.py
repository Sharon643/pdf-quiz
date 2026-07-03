from pydantic import BaseModel
from typing import Dict, List


class Question(BaseModel):
    id: int
    subject: str
    question: str
    options: Dict[str, str]
    correct_answer: str


class QuestionBank(BaseModel):
    questions: List[Question]
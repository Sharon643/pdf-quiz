from pydantic import BaseModel


class ProgressResponse(BaseModel):
    jobId: str
    stage: str
    percent: int
    message: str
    completed: bool
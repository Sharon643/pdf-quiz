from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.question_bank import router as question_bank_router
from api.extraction import router as extraction_router
from api.progress import router as progress_router
from api.exam import router as exam_router
from api import history
from api import review
from api.practice import router as practice_router
from api.auth import router as auth_router




app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(question_bank_router)
app.include_router(extraction_router)
app.include_router(progress_router)
app.include_router(exam_router)
app.include_router(history.router)
app.include_router(review.router)
app.include_router(practice_router)
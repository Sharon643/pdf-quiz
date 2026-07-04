from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.question_bank import router as question_bank_router
from api.extraction import router as extraction_router



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

app.include_router(question_bank_router)
app.include_router(extraction_router)
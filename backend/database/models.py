from datetime import datetime
from uuid import uuid4

from sqlalchemy import (
    Boolean,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database.database import Base


def generate_uuid() -> str:
    return str(uuid4())


# ============================================================
# User
# ============================================================

class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=generate_uuid,
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )

    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    question_banks = relationship(
        "QuestionBank",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    exams = relationship(
        "Exam",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    practice_sessions = relationship(
        "PracticeSession",
        back_populates="user",
        cascade="all, delete-orphan",
    )


# ============================================================
# Question Bank
# ============================================================

class QuestionBank(Base):
    __tablename__ = "question_banks"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=generate_uuid,
    )

    user_id: Mapped[str | None] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )

    file_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    question_count: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    active: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    uploaded_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    user = relationship(
        "User",
        back_populates="question_banks",
    )

    questions = relationship(
        "Question",
        back_populates="question_bank",
        cascade="all, delete-orphan",
    )

    exams = relationship(
        "Exam",
        back_populates="question_bank",
    )

    practice_sessions = relationship(
        "PracticeSession",
        back_populates="question_bank",
    )


# ============================================================
# Question
# ============================================================

class Question(Base):
    __tablename__ = "questions"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=generate_uuid,
    )

    number: Mapped[int | None] = mapped_column(
    Integer,
    nullable=True,
    )

    question_bank_id: Mapped[str] = mapped_column(
        ForeignKey(
            "question_banks.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    question_text: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    option_a: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    option_b: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    option_c: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    option_d: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    correct_answer: Mapped[str | None] = mapped_column(
        String(10),
        nullable=True,
    )

    explanation: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    subject: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    page: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    answer_source: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    answer_confidence: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    question_bank = relationship(
        "QuestionBank",
        back_populates="questions",
    )


# ============================================================
# Exam
# ============================================================

class Exam(Base):
    __tablename__ = "exams"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=generate_uuid,
    )

    user_id: Mapped[str | None] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )

    question_bank_id: Mapped[str] = mapped_column(
        ForeignKey("question_banks.id"),
        nullable=False,
        index=True,
    )

    question_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    timed: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    duration_minutes: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="in_progress",
        nullable=False,
        index=True,
    )

    score: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    percentage: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    started_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    completed_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )

    user = relationship(
        "User",
        back_populates="exams",
    )

    question_bank = relationship(
        "QuestionBank",
        back_populates="exams",
    )

    answers = relationship(
        "ExamAnswer",
        back_populates="exam",
        cascade="all, delete-orphan",
    )


# ============================================================
# Exam Answer
# ============================================================

class ExamAnswer(Base):
    __tablename__ = "exam_answers"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=generate_uuid,
    )

    exam_id: Mapped[str] = mapped_column(
        ForeignKey("exams.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    question_id: Mapped[str] = mapped_column(
        ForeignKey("questions.id"),
        nullable=False,
    )

    selected_option: Mapped[str | None] = mapped_column(
        String(10),
        nullable=True,
    )
    marked_for_review: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )
    position: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    is_correct: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True,
    )

    exam = relationship(
        "Exam",
        back_populates="answers",
    )


# ============================================================
# Practice Session
# ============================================================

class PracticeSession(Base):
    __tablename__ = "practice_sessions"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=generate_uuid,
    )

    user_id: Mapped[str | None] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )

    question_bank_id: Mapped[str] = mapped_column(
        ForeignKey("question_banks.id"),
        nullable=False,
        index=True,
    )

    question_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="in_progress",
        nullable=False,
    )

    started_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    completed_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    user = relationship(
        "User",
        back_populates="practice_sessions",
    )

    question_bank = relationship(
        "QuestionBank",
        back_populates="practice_sessions",
    )

    answers = relationship(
        "PracticeAnswer",
        back_populates="practice_session",
        cascade="all, delete-orphan",
    )


# ============================================================
# Practice Answer
# ============================================================

class PracticeAnswer(Base):
    __tablename__ = "practice_answers"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=generate_uuid,
    )

    practice_session_id: Mapped[str] = mapped_column(
        ForeignKey(
            "practice_sessions.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    question_id: Mapped[str] = mapped_column(
        ForeignKey("questions.id"),
        nullable=False,
    )
    position: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    selected_option: Mapped[str | None] = mapped_column(
        String(10),
        nullable=True,
    )

    is_correct: Mapped[bool | None] = mapped_column(
        Boolean,
        nullable=True,
    )

    practice_session = relationship(
        "PracticeSession",
        back_populates="answers",
    )
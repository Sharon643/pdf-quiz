import streamlit as st

from quiz.navigator import show_navigator
from quiz.question_card import show_question
from quiz.controls import show_controls


def show_quiz():

    with st.sidebar:
        show_navigator()

    questions = st.session_state.active_questions

    current = st.session_state.current_question

    total = len(questions)

    question = questions[current]

    st.title("🧠 QuizForge AI")

    st.progress((current + 1) / total)

    st.caption(f"Question {current + 1} of {total}")

    show_question(question, current)

    show_controls(current, total)
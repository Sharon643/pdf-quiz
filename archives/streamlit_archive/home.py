import streamlit as st

from utils.loader import load_questions
from config import QUESTIONS_JSON
from utils.constants import EXAM_SETTINGS


def show_home():

    st.title("🧠 QuizForge AI")
    st.caption("AI-powered Exam Preparation Platform")

    st.divider()

    # ---------- Upload Section ----------

    st.subheader("📄 Upload Question PDF")

    uploaded_file = st.file_uploader(
        "Choose a PDF",
        type=["pdf"],
        label_visibility="collapsed"
    )

    if uploaded_file is not None:

        st.success(f"Selected: {uploaded_file.name}")

        if st.button(
            "⚙ Extract Questions",
            use_container_width=True
        ):
            st.info(
                "Gemini extraction will be connected here."
            )

    st.divider()

    # ---------- Question Bank ----------

    if not st.session_state.questions:

        st.session_state.questions = load_questions(
            QUESTIONS_JSON
        )

    questions = st.session_state.questions

    total_questions = len(questions)

    subjects = len(
        set(q["subject"] for q in questions)
    )

    st.subheader("📊 Current Question Bank")

    col1, col2 = st.columns(2)

    with col1:
        st.metric(
            "Questions",
            total_questions
        )

    with col2:
        st.metric(
            "Subjects",
            subjects
        )

    st.divider()

    if st.button(

        "🏆 Exam Mode",

        use_container_width=True

    ):

        st.session_state.page = EXAM_SETTINGS

        st.rerun()
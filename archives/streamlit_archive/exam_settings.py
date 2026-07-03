import streamlit as st

from backend.utils.constants import EXAM
from backend.utils.exam_manager import ExamManager


def show_exam_settings():

    st.title("🏆 Exam Settings")

    st.divider()

    st.subheader("Number of Questions")

    exam_size = st.radio(

        "",

        [25, 50, 75, 100, "All"],

        horizontal=True,

        index=2

    )

    st.divider()

    randomize = st.checkbox(

        "Randomize Questions",

        value=True

    )

    timer = st.checkbox(

        "Enable Timer",

        value=True

    )

    st.divider()

    if st.button(

        "🚀 Start Exam",

        use_container_width=True

    ):

        st.session_state.exam_size = exam_size

        st.session_state.randomize = randomize

        st.session_state.timer = timer

        active_questions = ExamManager.build_exam(
            st.session_state.questions,
            size=exam_size,
            randomize=randomize
        )

        st.session_state.active_questions = active_questions

        st.session_state.current_question = 0
        st.session_state.answers = {}

        st.session_state.page = EXAM

        st.rerun()
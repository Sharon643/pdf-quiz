import streamlit as st

from quiz.navigator import show_navigator
from utils.constants import RESULTS


def show_quiz():

    # -----------------------------
    # Sidebar
    # -----------------------------

    with st.sidebar:
        show_navigator()

    # -----------------------------
    # Questions
    # -----------------------------

    questions = st.session_state.active_questions

    current = st.session_state.current_question

    total = len(questions)

    question = questions[current]

    # -----------------------------
    # Header
    # -----------------------------

    st.title("🧠 QuizForge AI")

    progress = (current + 1) / total

    st.progress(progress)

    st.caption(f"Question {current + 1} of {total}")

    st.markdown(f"### 📖 {question['subject']}")

    st.divider()

    # -----------------------------
    # Question
    # -----------------------------

    st.subheader(question["question"])

    options = question["options"]

    letters = ["A", "B", "C", "D"]

    previous_answer = st.session_state.answers.get(current)

    default_index = None

    if previous_answer in letters:
        default_index = letters.index(previous_answer)

    selected = st.radio(
        "Choose an answer",
        letters,
        index=default_index,
        format_func=lambda x: f"{x}. {options.get(x, '')}",
        key=f"question_{current}"
    )

    # for letter in letters:
    #     st.write(f"{letter}. {options.get(letter, '')}")

    if selected is not None:
        st.session_state.answers[current] = selected

    st.divider()

    # -----------------------------
    # Navigation
    # -----------------------------

    col1, col2 = st.columns(2)

    with col1:

        if st.button(
            "⬅ Previous",
            use_container_width=True,
            disabled=current == 0
        ):

            st.session_state.current_question -= 1

            st.rerun()

    with col2:

        if current == total - 1:

            if st.button(
                "✅ Submit Exam",
                use_container_width=True
            ):

                st.session_state.page = RESULTS

                st.rerun()

        else:

            if st.button(
                "Next ➡",
                use_container_width=True
            ):

                st.session_state.current_question += 1

                st.rerun()
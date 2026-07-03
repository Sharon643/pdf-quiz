import streamlit as st

from utils.constants import RESULTS

def show_quiz():

    st.title("🧠 QuizForge AI")

    questions = st.session_state.questions

    current = st.session_state.current_question

    total = len(questions)

    question = questions[current]

    # -----------------------------------
    # Progress
    # -----------------------------------

    progress = (current + 1) / total

    st.progress(progress)

    st.caption(f"Question {current + 1} of {total}")

    # -----------------------------------
    # Subject
    # -----------------------------------

    st.markdown(f"### 📖 {question['subject']}")

    st.divider()

    # -----------------------------------
    # Question
    # -----------------------------------

    st.subheader(question["question"])

    options = question["options"]

    letters = ["A", "B", "C", "D"]

    # Previously selected answer
    previous = st.session_state.answers.get(current)

    default_index = None

    if previous in letters:
        default_index = letters.index(previous)

    selected = st.radio(
        "Choose an answer",
        letters,
        index=default_index,
        format_func=lambda x: f"{x}. {options.get(x, '')}",
        key=f"question_{current}"
    )

    # Save answer only if something is selected
    if selected is not None:
        st.session_state.answers[current] = selected

    st.divider()

    # -----------------------------------
    # Navigation
    # -----------------------------------

    left, right = st.columns(2)

    with left:

        if st.button(
            "⬅ Previous",
            use_container_width=True,
            disabled=current == 0
        ):
            st.session_state.current_question -= 1
            st.rerun()

    with right:

        if current == total - 1:

            if st.button(
                "✅ Submit Quiz",
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
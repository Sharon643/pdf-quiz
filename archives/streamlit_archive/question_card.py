import streamlit as st


def show_question(question, current):

    st.markdown(f"### 📖 {question['subject']}")

    st.divider()

    st.container(border=True)

    st.markdown(
        f"<p class='subject'>{question['subject']}</p>",
        unsafe_allow_html=True,
    )

    st.markdown(
        f"<div class='question-title'>{question['question']}</div>",
        unsafe_allow_html=True,
    )

    options = question["options"]

    letters = ["A", "B", "C", "D"]

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

    if selected:
        st.session_state.answers[current] = selected
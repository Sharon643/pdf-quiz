import streamlit as st


def show_navigator():

    questions = st.session_state.active_questions

    current = st.session_state.current_question

    answers = st.session_state.answers

    st.title("🧭")

    cols = 5

    for row in range(0, len(questions), cols):

        row_cols = st.columns(cols)

        for col_index in range(cols):

            question_index = row + col_index

            if question_index >= len(questions):
                continue

            if question_index == current:
                icon = "🟨"

            elif question_index in answers:
                icon = "🟩"

            else:
                icon = "⬜"

            with row_cols[col_index]:

                if st.button(
                    f"{icon}\n{question_index+1}",
                    key=f"nav_{question_index}",
                    use_container_width=True
                ):

                    st.session_state.current_question = question_index

                    st.rerun()

    st.divider()

    st.caption("🟨 Current")
    st.caption("🟩 Answered")
    st.caption("⬜ Unanswered")
import streamlit as st


def show_navigator():

    total = len(st.session_state.active_questions)
    current = st.session_state.current_question
    answers = st.session_state.answers
    marked = st.session_state.marked_questions

    answered_count = len(answers)
    marked_count = len(marked)
    remaining = total - answered_count

    st.markdown("## 📝 Exam")

    st.progress(answered_count / total if total else 0)

    c1, c2 = st.columns(2)

    with c1:
        st.metric("Answered", answered_count)

    with c2:
        st.metric("Marked", marked_count)

    st.metric("Remaining", remaining)

    st.divider()

    st.markdown("### Question Navigator")

    COLS = 3

    for row in range(0, total, COLS):

        cols = st.columns(COLS)

        for col in range(COLS):

            idx = row + col

            if idx >= total:
                continue

            if idx == current:
                icon = "🟧"

            elif idx in marked:
                icon = "🟦"

            elif idx in answers:
                icon = "🟩"

            else:
                icon = "⬜"

            with cols[col]:

                if st.button(
                    f"{icon} {idx+1:02}",
                    key=f"nav_{idx}",
                    use_container_width=True,
                ):
                    st.session_state.current_question = idx
                    st.rerun()
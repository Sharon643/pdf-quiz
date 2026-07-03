import streamlit as st

from utils.constants import RESULTS


def show_controls(current, total):

    # --------------------------
    # Mark for Review
    # --------------------------

    marked = current in st.session_state.marked_questions

    if marked:

        if st.button(
            "⭐ Remove Mark",
            use_container_width=True
        ):

            st.session_state.marked_questions.remove(current)

            st.rerun()

    else:

        if st.button(
            "📌 Mark for Review",
            use_container_width=True
        ):

            st.session_state.marked_questions.add(current)

            st.rerun()

    st.divider()

    # --------------------------
    # Navigation
    # --------------------------

    col1, col2, col3 = st.columns(3)

    with col1:

        if st.button(
            "⬅ Previous",
            disabled=current == 0,
            use_container_width=True
        ):

            st.session_state.current_question -= 1
            st.rerun()

    with col2:

        if current == total - 1:

            if st.button(
                "✅ Submit",
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


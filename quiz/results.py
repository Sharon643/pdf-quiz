import streamlit as st

from utils.scorer import calculate_score


def show_results():

    score, wrong = calculate_score(
        st.session_state.questions,
        st.session_state.answers
    )

    st.title("🎉 Quiz Finished")

    st.metric(
        "Score",
        f"{score}/{len(st.session_state.questions)}"
    )

    st.metric(
        "Accuracy",
        f"{score/len(st.session_state.questions)*100:.2f}%"
    )

    st.session_state.review = wrong
from utils.constants import HOME
import streamlit as st


def initialize():

    defaults = {

        "page": HOME,

        "mode": None,

        "questions": [],

        "active_questions": [],

        "current_question": 0,

        "answers": {},

        "score": 0,

        "review": [],

        "exam_size": 75,

        "timer": True,

        "randomize": True,

        "selected_subjects": []
    }

    for key, value in defaults.items():

        if key not in st.session_state:

            st.session_state[key] = value
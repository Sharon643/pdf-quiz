from quiz.home import show_home
from quiz.exam_settings import show_exam_settings
from quiz.quiz_page import show_quiz
from quiz.results import show_results
import streamlit as st

from utils.constants import *


class QuizApp:

    def run(self):

        page = st.session_state.page

        if page == HOME:

            show_home()

        elif page == EXAM_SETTINGS:

            show_exam_settings()

        elif page == EXAM:

            show_quiz()

        elif page == RESULTS:

            show_results()
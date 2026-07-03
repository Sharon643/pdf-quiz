import streamlit as st

from quiz.styles import load_css
from quiz.app import QuizApp
from utils.session import initialize

st.set_page_config(
    page_title="QuizForge AI",
    page_icon="🧠",
    layout="wide"
)

initialize()

load_css()

app = QuizApp()
app.run()
# def main():

#     pdf_path = "data/pdfs/sample.pdf" 

#     extractor = Extractor()

#     extractor.run(pdf_path)


# if __name__ == "__main__":
#     main()
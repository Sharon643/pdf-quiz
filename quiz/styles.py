import streamlit as st


def load_css():

    st.markdown(
        """
        <style>

        .main {
            padding-top: 1rem;
        }

        .question-card{
            background:#262730;
            padding:25px;
            border-radius:15px;
            margin-bottom:20px;
            border:1px solid #444;
        }

        .subject{
            color:#4CAF50;
            font-size:18px;
            font-weight:bold;
        }

        .question{
            font-size:22px;
            font-weight:600;
            margin-top:10px;
            margin-bottom:20px;
        }

        .score-card{
            background:#262730;
            padding:30px;
            border-radius:15px;
            text-align:center;
            border:1px solid #444;
        }

        .stButton>button{
            width:100%;
            border-radius:10px;
            height:45px;
            font-weight:bold;
        }

        </style>
        """,
        unsafe_allow_html=True,
    )
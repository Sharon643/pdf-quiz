from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

MODEL = "gemini-2.5-flash"

CHUNK_SIZE = 10

DATA_DIR = "data"

PDF_DIR = os.path.join(DATA_DIR, "pdf")

CHUNKS_DIR = os.path.join(DATA_DIR, "chunks")

CHUNK_JSON_DIR = os.path.join(DATA_DIR, "chunk_json")

OUTPUT_DIR = os.path.join(DATA_DIR, "extracted")

MAX_RETRIES = 5
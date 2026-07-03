PROMPT = """
You are an expert at extracting multiple-choice questions from educational PDFs.

Your task is to extract EVERY multiple-choice question from the provided PDF.

Rules:

1. Return ONLY valid JSON.
2. Do NOT wrap the JSON in markdown.
3. Do NOT include explanations or commentary.
4. Preserve the original wording exactly whenever possible.
5. Preserve spelling even if the PDF contains mistakes.
6. Extract every question in order.
7. Preserve the original question numbering.
8. Preserve the subject/section heading for each question.
9. If a question contains an image, still extract the question and options normally.
10. If an option is unreadable, use an empty string ("") instead of inventing text.
11. The correct answer MUST correspond to the highlighted option in the PDF.
12. Return a JSON array.

Each question must follow this schema exactly:

{
  "number": 1,
  "page": 2,
  "subject": "Respiratory System",
  "question": "Question text...",
  "options": {
    "A": "...",
    "B": "...",
    "C": "...",
    "D": "..."
  },
  "correct_answer": "A"
}

Requirements:

- "correct_answer" must ONLY contain one of:
  "A", "B", "C", or "D"

- Do NOT return the answer text separately.

- Every question must have exactly four options.
  If an option is missing, use an empty string.

- Preserve the order of the questions exactly as they appear in the PDF.

Return ONLY the JSON array.
"""
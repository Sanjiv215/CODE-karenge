from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests, random
from question_bank import QUESTION_BANK

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change later for production
    allow_methods=["*"],
    allow_headers=["*"],
)

JUDGE0_URL = "https://ce.judge0.com/submissions?base64_encoded=false&wait=true"

LANG_MAP = {
    "python": 71,
    "javascript": 63,
}

@app.get("/")
def home():
    return {"message": "Python Backend Running ✔"}

@app.get("/question")
def get_question(subject: str = "python"):
    subject = subject.lower()
    if subject not in QUESTION_BANK:
        raise HTTPException(400, "Subject not found")
    return {"subject": subject, "question": random.choice(QUESTION_BANK[subject])}

@app.post("/run")
def run_code(payload: dict):
    language = payload.get("language")
    code = payload.get("code")
    stdin = payload.get("stdin", "")

    if not code or not language:
        raise HTTPException(400, "Code & Language required")

    lang_id = LANG_MAP.get(language.lower())
    if not lang_id:
        raise HTTPException(400, "Unsupported Language")

    data = {"source_code": code, "language_id": lang_id, "stdin": stdin}

    result = requests.post(JUDGE0_URL, json=data)
    return result.json()

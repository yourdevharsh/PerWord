from typing import List
from fastapi import FastAPI, Form, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def home():
    pass

@app.post("/api/v1/process")
def process(
    userPrompt: str = Form(...),
    files: List[UploadFile] = File(...)
):
        
    return { "success" : True, "message" : userPrompt }
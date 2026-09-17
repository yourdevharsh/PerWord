from typing import List
from fastapi import FastAPI, Form, UploadFile, File, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .llm import send_to_llm

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
async def process(
    user_prompt: str = Form(...),
    files: List[UploadFile] = File(...)
):
    # upload_files(files)
    for file in files:
        upload_file(file)
    
    # try:
    #     chat = send_to_llm(user_prompt=user_prompt)
    #     print(chat)
    #     return { "success" : True, "message" : chat }
    # except Exception as e:
    #     print(f"An error occured: {e} with {type(e).__name__}")
    #     raise HTTPException(
    #         status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
    #         detail="Server Error."
    #     )
    
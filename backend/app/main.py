from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

@app.get('/')
def home():
    pass

@app.post("/api/v1/process")
def process():
    pass
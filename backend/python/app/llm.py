import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY")
)

def send_to_llm(user_prompt: str):
    completion = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {"role": "system", "content": "You're PerWord"},
            {"role": "user", "content": user_prompt}
        ]
    )
    return completion.choices[0].message.content
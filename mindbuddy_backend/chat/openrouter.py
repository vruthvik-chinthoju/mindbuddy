import requests
import os
from dotenv import load_dotenv

load_dotenv()


def get_ai_reply(message):
    try:
        api_key = os.getenv("OPENROUTER_API_KEY")

        if not api_key:
            return "API key missing ⚠️"

        response = requests.post(
    url="https://openrouter.ai/api/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "MindBuddy"
    },
    json={
        "model": "meta-llama/llama-3-8b-instruct",
        "messages": [
            {
                "role": "system",
                "content": "You are a calm, empathetic mental health companion."
            },
            {
                "role": "user",
                "content": message
            }
            ]
            }
        )
        print("STATUS:", response.status_code)
        print("RAW:", response.text)

        data = response.json()

        # 🔥 HANDLE ERROR RESPONSE
        if "error" in data:
            print("API ERROR:", data["error"])
            return "AI service unavailable right now ⚠️"

        if "choices" not in data:
            return "Unexpected response format ⚠️"

        return data["choices"][0]["message"]["content"].strip()

    except Exception as e:
        print("OpenRouter error:", e)
        return "Something went wrong 😓"
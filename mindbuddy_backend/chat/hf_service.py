import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-base"

HEADERS = {
    "Authorization": f"Bearer {os.getenv('HUGGINGFACE_API_KEY')}",
    "Content-Type": "application/json"
}


def get_ai_reply(message):
    try:
        print("FINAL URL USED:", API_URL)

        payload = {
            "inputs": f"Respond empathetically: {message}"
        }

        response = requests.post(API_URL, headers=HEADERS, json=payload)

        print("STATUS:", response.status_code)
        print("RAW:", response.text)

        if response.status_code != 200:
            return "Model loading... try again ⏳"

        data = response.json()

        if isinstance(data, list):
            return data[0].get("generated_text", "Tell me more ❤️")

        return "Tell me more ❤️"

    except Exception as e:
        print("HF error:", e)
        return "Something went wrong 😓"
from google import genai
from dotenv import load_dotenv
import os

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY"),
)


def get_ai_reply(message):
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",   # 🔥 THIS IS THE KEY FIX
            contents=message,
        )

        return response.text

    except Exception as e:
        print("Gemini error:", e)
        return "Something went wrong 😓"
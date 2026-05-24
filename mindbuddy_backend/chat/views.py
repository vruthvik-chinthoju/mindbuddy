from rest_framework.views import APIView
from rest_framework.response import Response
from .openrouter import get_ai_reply


def detect_crisis(message):
    if not message:
        return False

    keywords = [
        "suicide", "kill myself", "end my life",
        "don't want to live", "hopeless", "worthless"
    ]
    return any(word in message.lower() for word in keywords)


# ✅ THIS MUST EXIST
class HealthView(APIView):
    def get(self, request):
        return Response({"status": "Backend working ✅"})


class ChatView(APIView):
    def post(self, request):
        message = request.data.get("message", "").strip()

        if not message:
            return Response({"error": "Message required"}, status=400)

        if detect_crisis(message):
            return Response({
                "reply": "I'm really sorry you're feeling this way ❤️ Please consider calling 14410.",
                "crisis": True
            })

        try:
            reply = get_ai_reply(message)
            return Response({"reply": reply})

        except Exception as e:
            return Response({"error": str(e)}, status=500)
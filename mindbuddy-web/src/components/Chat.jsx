import { useState, useRef, useEffect } from "react";
import "./css/chat.css";
import botAvatar from "/chatlogo.png";


const quickMoods = ["😴 Tired", "😔 Sad", "😰 Stressed", "😡 Angry", "😟 Worried"];

export default function Chat() {
  console.log("k");
  // ✅ FIX: initialize as array + starter message
  const [messages, setMessages] = useState([
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // ✅ Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (msg = input) => {
    if (!msg.trim()) return;

    // ✅ Add user message
    setMessages((prev) => [
      ...prev,
      { text: msg, sender: "user" },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: msg }),
      });

      const data = await res.json();

      // ✅ Add bot reply
      setMessages((prev) => [
        ...prev,
        { text: data.reply || "No response 🤔", sender: "bot" },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "Server error 😓 Try again later.", sender: "bot" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="app-bg">
      <div className="chat-container">

        {/* HEADER */}
        <div className="chat-header">
          <img src={botAvatar} alt="bot" />
          <div>
            <h3>MindBuddy 💚</h3>
            <p>I'm here to listen, support and help you feel better.</p>
          </div>
        </div>

        {/* CHAT BODY */}
        <div className="chat-body">

          {/* Messages */}
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.sender}`}>
              
              {/* Bot avatar */}
              {m.sender === "bot" && (
                <img src={botAvatar} alt="bot" />
              )}

              <div className="bubble">{m.text}</div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="msg bot">
              <img src={botAvatar} alt="bot" />
              <div className="bubble typing">Typing...</div>
            </div>
          )}

          {/* Quick moods */}
          <div className="quick-moods">
            {quickMoods.map((mood, i) => (
              <button key={i} onClick={() => sendMessage(mood)}>
                {mood}
              </button>
            ))}
          </div>

          <div ref={chatEndRef}></div>
        </div>

        {/* INPUT */}
        <div className="chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Talk to MindBuddy..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={() => sendMessage()}>➤</button>
        </div>

      </div>
    </div>
  );
}
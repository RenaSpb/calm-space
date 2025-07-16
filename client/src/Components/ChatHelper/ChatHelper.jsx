import { useState, useEffect } from "react";
import "./ChatHelper.css";

export default function ChatHelper() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [roleType, setRoleType] = useState("friend");

    useEffect(() => {
    if (roleType === "friend") {
      setMessages([
        {
          role: "assistant",
          content: "Hey! I’m here for you like a real friend 😊",
        },
      ]);
    } else if (roleType === "therapist") {
      setMessages([
        {
          role: "assistant",
          content: "Hello. I'm here to support you in a calm and caring way.",
        },
      ]);
    }
  }, [roleType]);
  
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, roleType }),
      });

      const data = await response.json();
      const aiMessage = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
    }

    setInput("");
  };

  return (
    <div className="chat-helper">
      <div className="role-selector">
        <label>
          <input
            type="radio"
            value="friend"
            checked={roleType === "friend"}
            onChange={(e) => setRoleType(e.target.value)}
          />
          Friendly Mode
        </label>
        <label>
          <input
            type="radio"
            value="therapist"
            checked={roleType === "therapist"}
            onChange={(e) => setRoleType(e.target.value)}
          />
          Therapeutic Style
        </label>
      </div>
      <div className="chat-controls">
        <button className="clear-button" onClick={() => setMessages([])}>
          Clear Chat
        </button>
      </div>
      <div className="messages">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={m.role === "user" ? "user-message" : "ai-message"}
          >
            {m.content}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

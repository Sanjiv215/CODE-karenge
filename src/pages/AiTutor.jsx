import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/ai_tutor.css";

const AiTutor = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Hello! I’m your AI coding tutor 👨‍💻 Ask me anything!"
    }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { id: Date.now(), role: "user", text: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: "Thanks for your question! I'll help you soon."
        }
      ]);
      setTyping(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSend(e);
    }
  };

  return (
    <>
      <Navbar />

      <main className="ai-page">
        <div className="ai-container">
          <h1 className="ai-title">AI Coding Tutor.</h1>
          <p className="ai-sub">
            Need help debugging or learning? Just ask.
          </p>

          <div className="ai-chat-box">
            <div className="ai-messages">
              {messages.map((msg) => (
                <div className={`ai-msg ${msg.role}`} key={msg.id}>
                  <span className="avatar">
                    {msg.role === "assistant" ? "🤖" : "🧑"}
                  </span>
                  <div className="bubble">{msg.text}</div>
                </div>
              ))}

              {typing && (
                <div className="ai-msg assistant">
                  <span className="avatar">🤖</span>
                  <div className="typing-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            <form className="ai-input-container" onSubmit={handleSend}>
              <input
                className="ai-input"
                placeholder="Ask something…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button className="ai-send-btn">Send</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default AiTutor;

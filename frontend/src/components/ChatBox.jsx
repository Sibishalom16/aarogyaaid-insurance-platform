import { useState } from "react";

export default function ChatBox({
  styles,
  chat,
  setChat,
  askChat,
  chatReply,
}) {
  const [userMsg, setUserMsg] = useState("");
  const [typing, setTyping] = useState(false);

  const handleSend = async () => {
    if (!chat.trim()) return;

    setUserMsg(chat);     // user message lock
    setTyping(true);

    await new Promise((r) => setTimeout(r, 1200));

    askChat();           // parent function call
    setTyping(false);
    setChat("");         // clear input after send
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div style={styles.chatCard}>
      <h3 style={styles.chatTitle}>💬 Ask About This Policy</h3>

      {/* Messages */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          marginBottom: "18px",
          minHeight: "110px",
        }}
      >
        {/* USER */}
        {userMsg && (
          <div
            style={{
              alignSelf: "flex-end",
              background:
                "linear-gradient(135deg,#2563eb 0%, #7c3aed 100%)",
              color: "#ffffff",
              padding: "12px 18px",
              borderRadius: "18px 18px 4px 18px",
              maxWidth: "75%",
              fontSize: "14px",
              fontWeight: "600",
              boxShadow: "0 10px 24px rgba(37,99,235,.25)",
            }}
          >
            {userMsg}
          </div>
        )}

        {/* AI TYPING */}
        {typing && (
          <div
            style={{
              alignSelf: "flex-start",
              background: "#1e293b",
              color: "#ffffff",
              padding: "12px 18px",
              borderRadius: "18px 18px 18px 4px",
              fontSize: "14px",
              fontWeight: "500",
              boxShadow: "0 8px 20px rgba(0,0,0,.15)",
            }}
          >
            🤖 AI is typing...
          </div>
        )}

        {/* AI REPLY */}
        {!typing && chatReply && (
          <div
            style={{
              alignSelf: "flex-start",
              background: "#0f172a",
              color: "#ffffff",
              padding: "14px 18px",
              borderRadius: "18px 18px 18px 4px",
              maxWidth: "82%",
              fontSize: "14px",
              lineHeight: "1.7",
              border: "1px solid rgba(255,255,255,.08)",
              boxShadow: "0 8px 20px rgba(0,0,0,.18)",
            }}
          >
            🤖 {chatReply}
          </div>
        )}
      </div>

      {/* Input */}
      <div style={styles.chatInputGroup}>
        <input
          type="text"
          placeholder="Ask about premium, waiting period, claim..."
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.chatInput}
        />

        <button
          type="button"
          onClick={handleSend}
          style={styles.chatButton}
        >
          Send
        </button>
      </div>
    </div>
  );
}
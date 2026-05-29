import { useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function Assistant() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!message.trim()) {
      alert("Please enter your question");
      return;
    }

    try {
      setLoading(true);
      setReply("");

      const response = await API.post("/api/ai/chat", {
        message: message,
      });

      setReply(response.data.reply || response.data || "No response received");
    } catch (error) {
      console.error(error);
      alert("AI Assistant request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#020617" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "30px", color: "white" }}>
        <h1>AI Emergency Assistant</h1>
        <p style={{ color: "#94a3b8" }}>
          Ask AI for emergency response guidance and incident support.
        </p>

        <textarea
          placeholder="Example: What should response teams do during a fire emergency?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100%",
            height: "160px",
            padding: "15px",
            marginTop: "20px",
            borderRadius: "10px",
            border: "1px solid #334155",
            background: "#0f172a",
            color: "white",
            fontSize: "16px",
          }}
        />

        <button
          onClick={handleAskAI}
          disabled={loading}
          style={{
            marginTop: "20px",
            padding: "12px 22px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        {reply && (
          <div
            style={{
              marginTop: "25px",
              padding: "20px",
              background: "#0f172a",
              borderRadius: "10px",
              border: "1px solid #334155",
              whiteSpace: "pre-wrap",
              lineHeight: "1.6",
            }}
          >
            <h3>AI Response</h3>
            <p>{reply}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Assistant;
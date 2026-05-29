import { useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function Assistant() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const askAI = async () => {
    try {
      const response = await API.post("/ai/chat", {
        message: message,
      });

      setReply(response.data.reply);
    } catch (error) {
      alert("AI assistant failed");
    }
  };

  return (
    <div
      style={{
        background: "#020617",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <main
        style={{
          marginLeft: "270px",
          padding: "35px",
        }}
      >
        <h1 style={{ fontSize: "42px", textAlign: "center" }}>
          AEGIS AI Assistant
        </h1>

        <div
          style={{
            background: "#0f172a",
            padding: "30px",
            borderRadius: "14px",
            marginTop: "30px",
            border: "1px solid #1e293b",
          }}
        >
          <textarea
            placeholder="Describe emergency... example: Fire and smoke in building"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: "100%",
              height: "130px",
              padding: "15px",
              background: "#020617",
              color: "white",
              border: "1px solid #334155",
              borderRadius: "10px",
            }}
          />

          <button
            onClick={askAI}
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Ask AI
          </button>

          {reply && (
            <div
              style={{
                marginTop: "25px",
                padding: "20px",
                background: "#020617",
                borderRadius: "10px",
                border: "1px solid #334155",
              }}
            >
              <h3>AI Guidance:</h3>
              <p>{reply}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Assistant;
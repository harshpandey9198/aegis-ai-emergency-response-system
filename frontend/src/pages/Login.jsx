import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      alert("Login Successful ✅");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

     if (error.response) {
  console.log("Error Response:", error.response.data);

  const errorMessage =
    error.response.data?.message ||
    error.response.data?.error ||
    JSON.stringify(error.response.data);

  alert(errorMessage);
} else {
  alert("Server Connection Failed");
}
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#020617",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <div
        style={{
          background: "#0f172a",
          padding: "40px",
          borderRadius: "12px",
          width: "380px",
          boxShadow: "0px 0px 20px rgba(255,255,255,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>AEGIS AI</h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "20px",
          }}
        >
          Emergency Response System
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            borderRadius: "6px",
            border: "none",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            borderRadius: "6px",
            border: "none",
          }}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            background: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;
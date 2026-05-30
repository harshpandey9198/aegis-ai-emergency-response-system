import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
      console.error("Login Error:", error);

      if (error.response) {
        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          "Invalid email or password";

        alert(errorMessage);
      } else {
        alert("Server connection failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>AEGIS AI</h1>

        <p style={subtitleStyle}>Emergency Response System</p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleLogin} disabled={loading} style={buttonStyle}>
          {loading ? "Logging In..." : "Login"}
        </button>

        <p style={linkText}>
          Don't have an account?{" "}
          <Link to="/register" style={linkStyle}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

const pageStyle = {
  background: "#020617",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
};

const cardStyle = {
  background: "#0f172a",
  padding: "40px",
  borderRadius: "12px",
  width: "380px",
  boxShadow: "0px 0px 20px rgba(255,255,255,0.1)",
};

const titleStyle = {
  textAlign: "center",
};

const subtitleStyle = {
  textAlign: "center",
  color: "#94a3b8",
  marginBottom: "20px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "6px",
  border: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "20px",
  background: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

const linkText = {
  textAlign: "center",
  marginTop: "18px",
  color: "#cbd5e1",
};

const linkStyle = {
  color: "#38bdf8",
  textDecoration: "none",
};

export default Login;
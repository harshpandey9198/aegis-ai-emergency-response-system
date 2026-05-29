import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const response = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      alert("Login Failed");
    }
  };

  return (

    <div style={{
      background: "#020617",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white"
    }}>

      <div style={{
        background: "#0f172a",
        padding: "40px",
        borderRadius: "10px",
        width: "350px"
      }}>

        <h1>AEGIS AI</h1>

        <p>Emergency Response System</p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px"
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
            marginTop: "10px"
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            background: "red",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >

          Login

        </button>

      </div>

    </div>
  );
}

export default Login;
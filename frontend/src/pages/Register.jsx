import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    if (!form.fullName || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/api/auth/register", form);

      alert(response.data.message || "Registration Successful ✅");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Create Account</h1>
        <p style={subtitleStyle}>Register for AEGIS AI</p>

        <input
          style={inputStyle}
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
        />

        <input
          style={inputStyle}
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          style={inputStyle}
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <select
          style={inputStyle}
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button style={buttonStyle} onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p style={linkText}>
          Already have an account?{" "}
          <Link to="/" style={linkStyle}>
            Login
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
  boxShadow: "0 0 20px rgba(255,255,255,0.1)",
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

export default Register;
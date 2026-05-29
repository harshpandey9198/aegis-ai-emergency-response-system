import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        background: "#0f172a",
        height: "100vh",
        padding: "20px",
        position: "fixed",
        left: 0,
        top: 0,
        color: "white",
      }}
    >
      <h1 style={{ color: "red" }}>AEGIS AI</h1>

      <div
        style={{
          marginTop: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Link to="/dashboard" style={linkStyle}>
          Dashboard
        </Link>
        <Link to="/teams" style={linkStyle}>
  Response Teams
</Link>

        <Link to="/incidents" style={linkStyle}>
          Incidents
        </Link>
        <Link to="/map" style={linkStyle}>
  Live Map
</Link>

        <Link to="/assistant" style={linkStyle}>
          AI Assistant
        </Link>

        

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          style={logoutButton}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  background: "#1e293b",
  padding: "12px",
  borderRadius: "8px",
};

const logoutButton = {
  background: "red",
  color: "white",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Sidebar;
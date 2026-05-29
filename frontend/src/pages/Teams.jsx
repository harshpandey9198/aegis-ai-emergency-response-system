import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function Teams() {
  const [teams, setTeams] = useState([]);

  const [form, setForm] = useState({
    teamName: "",
    leaderName: "",
    contactNumber: "",
    specialization: "",
    currentLocation: "",
    status: "AVAILABLE",
  });

  const loadTeams = async () => {
    try {
      const response = await API.get("/api/teams");
      setTeams(response.data);
    } catch (error) {
      console.error("Failed to load teams:", error);
      alert("Failed to load teams");
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createTeam = async () => {
    if (
      !form.teamName ||
      !form.leaderName ||
      !form.contactNumber ||
      !form.specialization ||
      !form.currentLocation
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/api/teams", form);

      alert("Team created successfully ✅");

      setForm({
        teamName: "",
        leaderName: "",
        contactNumber: "",
        specialization: "",
        currentLocation: "",
        status: "AVAILABLE",
      });

      loadTeams();
    } catch (error) {
      console.error("Failed to create team:", error);
      alert("Failed to create team");
    }
  };

  const deleteTeam = async (id) => {
    try {
      await API.delete(`/api/teams/${id}`);
      alert("Team deleted successfully");
      loadTeams();
    } catch (error) {
      console.error("Failed to delete team:", error);
      alert("Failed to delete team");
    }
  };

  return (
    <div style={pageStyle}>
      <Sidebar />

      <main style={mainStyle}>
        <h1 style={titleStyle}>Response Team Management</h1>

        <div style={formCard}>
          <h2 style={sectionTitle}>Create Response Team</h2>

          <input
            style={inputStyle}
            name="teamName"
            placeholder="Team Name"
            value={form.teamName}
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            name="leaderName"
            placeholder="Leader Name"
            value={form.leaderName}
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            name="contactNumber"
            placeholder="Contact Number"
            value={form.contactNumber}
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            name="specialization"
            placeholder="Specialization e.g. Fire Rescue"
            value={form.specialization}
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            name="currentLocation"
            placeholder="Current Location"
            value={form.currentLocation}
            onChange={handleChange}
          />

          <select
            style={inputStyle}
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="BUSY">BUSY</option>
          </select>

          <button style={createButton} onClick={createTeam}>
            Create Team
          </button>
        </div>

        <h2 style={sectionTitle}>All Response Teams</h2>

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Team</th>
              <th style={thStyle}>Leader</th>
              <th style={thStyle}>Contact</th>
              <th style={thStyle}>Specialization</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Location</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {teams.length === 0 ? (
              <tr>
                <td style={tdStyle} colSpan="8">
                  No teams found
                </td>
              </tr>
            ) : (
              teams.map((team) => (
                <tr key={team.id}>
                  <td style={tdStyle}>{team.id}</td>
                  <td style={tdStyle}>{team.teamName}</td>
                  <td style={tdStyle}>{team.leaderName}</td>
                  <td style={tdStyle}>{team.contactNumber}</td>
                  <td style={tdStyle}>{team.specialization}</td>
                  <td style={tdStyle}>{team.status}</td>
                  <td style={tdStyle}>{team.currentLocation}</td>
                  <td style={tdStyle}>
                    <button
                      style={deleteButton}
                      onClick={() => deleteTeam(team.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}

const pageStyle = {
  background: "#020617",
  minHeight: "100vh",
  color: "white",
};

const mainStyle = {
  marginLeft: "270px",
  padding: "35px",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "38px",
  marginBottom: "25px",
};

const formCard = {
  background: "#0f172a",
  padding: "30px",
  borderRadius: "14px",
  border: "1px solid #1e293b",
  maxWidth: "850px",
  margin: "0 auto 35px auto",
};

const sectionTitle = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#e5e7eb",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#020617",
  color: "white",
};

const createButton = {
  display: "block",
  margin: "10px auto 0 auto",
  padding: "12px 25px",
  background: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#0f172a",
  marginTop: "20px",
};

const thStyle = {
  border: "1px solid #1e293b",
  padding: "12px",
  color: "#93c5fd",
  background: "#111827",
};

const tdStyle = {
  border: "1px solid #1e293b",
  padding: "12px",
  textAlign: "center",
};

const deleteButton = {
  padding: "8px 14px",
  background: "#991b1b",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Teams;
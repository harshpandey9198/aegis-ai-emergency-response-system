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
    status: "AVAILABLE",
    currentLocation: "",
  });

  const loadTeams = async () => {
    try {
      const response = await API.get("/teams");
      setTeams(response.data);
    } catch (error) {
      alert("Failed to load teams");
    }
  };

  const createTeam = async () => {
    try {
      await API.post("/teams", form);
      setForm({
        teamName: "",
        leaderName: "",
        contactNumber: "",
        specialization: "",
        status: "AVAILABLE",
        currentLocation: "",
      });
      loadTeams();
      alert("Team created successfully");
    } catch (error) {
      alert("Team creation failed");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/teams/${id}/status?status=${status}`);
      loadTeams();
    } catch (error) {
      alert("Status update failed");
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  return (
    <div style={{ background: "#020617", color: "white", minHeight: "100vh" }}>
      <Sidebar />

      <main style={{ marginLeft: "270px", padding: "35px" }}>
        <h1 style={{ fontSize: "42px", textAlign: "center" }}>
          Response Team Management
        </h1>

        <div style={cardStyle}>
          <h2 style={{ textAlign: "center" }}>Create Response Team</h2>

          <input
            placeholder="Team Name"
            value={form.teamName}
            onChange={(e) => setForm({ ...form, teamName: e.target.value })}
            style={inputStyle}
          />

          <input
            placeholder="Leader Name"
            value={form.leaderName}
            onChange={(e) => setForm({ ...form, leaderName: e.target.value })}
            style={inputStyle}
          />

          <input
            placeholder="Contact Number"
            value={form.contactNumber}
            onChange={(e) =>
              setForm({ ...form, contactNumber: e.target.value })
            }
            style={inputStyle}
          />

          <input
            placeholder="Specialization e.g. Fire Rescue"
            value={form.specialization}
            onChange={(e) =>
              setForm({ ...form, specialization: e.target.value })
            }
            style={inputStyle}
          />

          <input
            placeholder="Current Location"
            value={form.currentLocation}
            onChange={(e) =>
              setForm({ ...form, currentLocation: e.target.value })
            }
            style={inputStyle}
          />

          <div style={{ textAlign: "center" }}>
            <button onClick={createTeam} style={buttonStyle}>
              Create Team
            </button>
          </div>
        </div>

        <div style={{ marginTop: "35px" }}>
          <h2 style={{ textAlign: "center" }}>All Response Teams</h2>

          <table style={tableStyle}>
            <thead>
              <tr style={{ background: "#1e293b" }}>
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
              {teams.map((team) => (
                <tr key={team.id} style={{ background: "#0f172a" }}>
                  <td style={tdStyle}>{team.id}</td>
                  <td style={tdStyle}>{team.teamName}</td>
                  <td style={tdStyle}>{team.leaderName}</td>
                  <td style={tdStyle}>{team.contactNumber}</td>
                  <td style={tdStyle}>{team.specialization}</td>
                  <td style={tdStyle}>{team.status}</td>
                  <td style={tdStyle}>{team.currentLocation}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => updateStatus(team.id, "AVAILABLE")}
                      style={smallButton}
                    >
                      Available
                    </button>

                    <button
                      onClick={() => updateStatus(team.id, "BUSY")}
                      style={{ ...smallButton, background: "orange" }}
                    >
                      Busy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

const cardStyle = {
  background: "#0f172a",
  padding: "25px",
  borderRadius: "14px",
  marginTop: "25px",
  border: "1px solid #1e293b",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  background: "#020617",
  color: "white",
  border: "1px solid #334155",
  borderRadius: "8px",
};

const buttonStyle = {
  padding: "12px 20px",
  marginTop: "15px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "15px",
};

const thStyle = {
  padding: "12px",
  border: "1px solid #334155",
};

const tdStyle = {
  padding: "12px",
  border: "1px solid #334155",
  textAlign: "center",
};

const smallButton = {
  padding: "7px 10px",
  margin: "3px",
  background: "green",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Teams;
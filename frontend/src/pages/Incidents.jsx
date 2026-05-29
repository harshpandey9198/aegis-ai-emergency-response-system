import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState({});

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
  });

  const loadIncidents = async () => {
    const response = await API.get("/incidents");
    setIncidents(response.data);
  };

  const loadTeams = async () => {
    const response = await API.get("/teams");
    setTeams(response.data);
  };

  const createIncident = async () => {
    await API.post("/incidents", form);
    setForm({ title: "", description: "", location: "" });
    loadIncidents();
    alert("Incident reported successfully");
  };

  const resolveIncident = async (id) => {
    await API.put(`/incidents/${id}/status?status=RESOLVED`);
    loadIncidents();
  };

  const assignTeam = async (incidentId) => {
    const teamId = selectedTeams[incidentId];

    if (!teamId) {
      alert("Please select a team");
      return;
    }

    await API.put(`/incidents/${incidentId}/assign-team/${teamId}`);
    loadIncidents();
    alert("Team assigned successfully");
  };

  useEffect(() => {
    loadIncidents();
    loadTeams();
  }, []);

  return (
    <div style={{ background: "#020617", color: "white", minHeight: "100vh" }}>
      <Sidebar />

      <main style={{ marginLeft: "270px", padding: "35px" }}>
        <h1 style={{ fontSize: "42px", textAlign: "center" }}>
          Incident Management
        </h1>

        <div style={cardStyle}>
          <h2 style={{ textAlign: "center" }}>Report Emergency</h2>

          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={inputStyle}
          />

          <input
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            style={inputStyle}
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            style={{ ...inputStyle, height: "90px" }}
          />

          <div style={{ textAlign: "center" }}>
            <button onClick={createIncident} style={buttonStyle}>
              Submit Incident
            </button>
          </div>
        </div>

        <div style={{ marginTop: "35px" }}>
          <h2 style={{ textAlign: "center" }}>All Incidents</h2>

          <table style={tableStyle}>
            <thead>
              <tr style={{ background: "#1e293b" }}>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Severity</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Location</th>
                <th style={thStyle}>Assigned Team</th>
                <th style={thStyle}>Assign</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              {incidents.map((incident) => (
                <tr key={incident.id} style={{ background: "#0f172a" }}>
                  <td style={tdStyle}>{incident.id}</td>
                  <td style={tdStyle}>{incident.title}</td>
                  <td style={tdStyle}>{incident.emergencyType}</td>
                  <td style={tdStyle}>{incident.severity}</td>
                  <td style={tdStyle}>{incident.status}</td>
                  <td style={tdStyle}>{incident.location}</td>
                  <td style={tdStyle}>
                    {incident.assignedTeamId
                      ? `Team #${incident.assignedTeamId}`
                      : "Not Assigned"}
                  </td>

                  <td style={tdStyle}>
                    <select
                      value={selectedTeams[incident.id] || ""}
                      onChange={(e) =>
                        setSelectedTeams({
                          ...selectedTeams,
                          [incident.id]: e.target.value,
                        })
                      }
                      style={selectStyle}
                    >
                      <option value="">Select Team</option>
                      {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.teamName} - {team.status}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => assignTeam(incident.id)}
                      style={smallButton}
                    >
                      Assign
                    </button>
                  </td>

                  <td style={tdStyle}>
                    {incident.status !== "RESOLVED" ? (
                      <button
                        onClick={() => resolveIncident(incident.id)}
                        style={{ ...smallButton, background: "green" }}
                      >
                        Resolve
                      </button>
                    ) : (
                      "Done"
                    )}
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

const selectStyle = {
  padding: "8px",
  background: "#020617",
  color: "white",
  border: "1px solid #334155",
  borderRadius: "6px",
};

const smallButton = {
  padding: "7px 10px",
  margin: "4px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Incidents;
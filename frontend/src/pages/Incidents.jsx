import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function Incidents() {
  const [incidents, setIncidents] = useState([]);

  const [form, setForm] = useState({
    title: "",
    location: "",
    description: "",
    emergencyType: "FIRE",
    severity: "HIGH",
    status: "PENDING",
    latitude: 28.6139,
    longitude: 77.209,
  });

  const loadIncidents = async () => {
    try {
      const response = await API.get("/api/incidents");
      setIncidents(response.data || []);
    } catch (error) {
      console.error("Failed to load incidents:", error);
      alert("Failed to load incidents");
    }
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitIncident = async () => {
    if (!form.title || !form.location || !form.description) {
      alert("Please fill title, location and description");
      return;
    }

    try {
      await API.post("/api/incidents", {
        ...form,
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
      });

      alert("Incident submitted successfully ✅");

      setForm({
        title: "",
        location: "",
        description: "",
        emergencyType: "FIRE",
        severity: "HIGH",
        status: "PENDING",
        latitude: 28.6139,
        longitude: 77.209,
      });

      loadIncidents();
    } catch (error) {
      console.error("Failed to submit incident:", error);
      alert("Failed to submit incident");
    }
  };

  const deleteIncident = async (id) => {
    try {
      await API.delete(`/api/incidents/${id}`);
      alert("Incident deleted successfully");
      loadIncidents();
    } catch (error) {
      console.error("Failed to delete incident:", error);
      alert("Failed to delete incident");
    }
  };

  return (
    <div style={pageStyle}>
      <Sidebar />

      <main style={mainStyle}>
        <h1 style={titleStyle}>Incident Management</h1>

        <div style={formCard}>
          <h2 style={sectionTitle}>Report Emergency</h2>

          <input
            style={inputStyle}
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />

          <textarea
            style={textareaStyle}
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <select
            style={inputStyle}
            name="emergencyType"
            value={form.emergencyType}
            onChange={handleChange}
          >
            <option value="FIRE">FIRE</option>
            <option value="ACCIDENT">ACCIDENT</option>
            <option value="FLOOD">FLOOD</option>
            <option value="MEDICAL">MEDICAL</option>
          </select>

          <select
            style={inputStyle}
            name="severity"
            value={form.severity}
            onChange={handleChange}
          >
            <option value="LOW">LOW</option>
            <option value="NORMAL">NORMAL</option>
            <option value="HIGH">HIGH</option>
            <option value="CRITICAL">CRITICAL</option>
          </select>

          <select
            style={inputStyle}
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="PENDING">PENDING</option>
            <option value="DISPATCHED">DISPATCHED</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>

          <input
            style={inputStyle}
            name="latitude"
            placeholder="Latitude"
            value={form.latitude}
            onChange={handleChange}
          />

          <input
            style={inputStyle}
            name="longitude"
            placeholder="Longitude"
            value={form.longitude}
            onChange={handleChange}
          />

          <button style={submitButton} onClick={submitIncident}>
            Submit Incident
          </button>
        </div>

        <h2 style={sectionTitle}>All Incidents</h2>

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Severity</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Location</th>
              <th style={thStyle}>Latitude</th>
              <th style={thStyle}>Longitude</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {incidents.length === 0 ? (
              <tr>
                <td style={tdStyle} colSpan="9">
                  No incidents found
                </td>
              </tr>
            ) : (
              incidents.map((incident) => (
                <tr key={incident.id}>
                  <td style={tdStyle}>{incident.id}</td>
                  <td style={tdStyle}>{incident.title}</td>
                  <td style={tdStyle}>{incident.emergencyType}</td>
                  <td style={tdStyle}>{incident.severity}</td>
                  <td style={tdStyle}>{incident.status}</td>
                  <td style={tdStyle}>{incident.location}</td>
                  <td style={tdStyle}>{incident.latitude}</td>
                  <td style={tdStyle}>{incident.longitude}</td>
                  <td style={tdStyle}>
                    <button
                      style={deleteButton}
                      onClick={() => deleteIncident(incident.id)}
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
  fontSize: "36px",
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

const textareaStyle = {
  width: "100%",
  height: "110px",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#020617",
  color: "white",
};

const submitButton = {
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

export default Incidents;
import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const blueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LiveMap() {
  const [incidents, setIncidents] = useState([]);

  const loadIncidents = async () => {
    try {
      const response = await API.get("/incidents");
      setIncidents(response.data);
    } catch (error) {
      alert("Failed to load incidents on map");
    }
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  const getIcon = (incident) => {
    if (incident.status === "RESOLVED") {
      return greenIcon;
    }

    if (incident.severity === "HIGH" || incident.severity === "CRITICAL") {
      return redIcon;
    }

    return blueIcon;
  };

  const getPosition = (index) => {
    return [28.6139 + index * 0.02, 77.209 + index * 0.02];
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
        <div style={heroBox}>
          <h1 style={heroTitle}>AEGIS AI Emergency Response System</h1>

          <p style={heroText}>
            Monitor incidents in real time, track emergency response teams, and
            visualize disaster locations across the city.
          </p>
        </div>

        <h1 style={pageTitle}>Live Incident Map</h1>

        <p style={pageSubtitle}>
          Real-time emergency location monitoring and incident visualization
        </p>

        <div style={statsBox}>
          <div style={statCard}>Total Incidents: {incidents.length}</div>

          <div style={statCard}>
            Active: {incidents.filter((i) => i.status !== "RESOLVED").length}
          </div>

          <div style={statCard}>
            Resolved: {incidents.filter((i) => i.status === "RESOLVED").length}
          </div>
        </div>

        <div style={legendBox}>
          <span>🔴 High/Critical</span>
          <span>🔵 Normal</span>
          <span>🟢 Resolved</span>
        </div>

        <div style={mapWrapper}>
          <MapContainer
            center={[28.6139, 77.209]}
            zoom={11}
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <TileLayer
              attribution="OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {incidents.map((incident, index) => (
              <Marker
                key={incident.id}
                position={getPosition(index)}
                icon={getIcon(incident)}
              >
                <Popup>
                  <div style={{ minWidth: "220px" }}>
                    <h3 style={{ marginBottom: "8px" }}>{incident.title}</h3>

                    <p>
                      <b>Type:</b> {incident.emergencyType}
                    </p>

                    <p>
                      <b>Severity:</b> {incident.severity}
                    </p>

                    <p>
                      <b>Status:</b> {incident.status}
                    </p>

                    <p>
                      <b>Location:</b> {incident.location}
                    </p>

                    <p>
                      <b>Assigned Team:</b>{" "}
                      {incident.assignedTeamId
                        ? `Team #${incident.assignedTeamId}`
                        : "Not Assigned"}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </main>
    </div>
  );
}

const heroBox = {
  background: "linear-gradient(135deg, #dc2626, #7f1d1d)",
  padding: "25px",
  borderRadius: "16px",
  marginBottom: "30px",
  textAlign: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
};

const heroTitle = {
  fontSize: "34px",
  fontWeight: "700",
  marginBottom: "8px",
  lineHeight: "1.2",
};

const heroText = {
  color: "#fee2e2",
  fontSize: "15px",
  maxWidth: "650px",
  margin: "0 auto",
  lineHeight: "1.5",
};

const pageTitle = {
  fontSize: "38px",
  textAlign: "center",
  marginBottom: "8px",
};

const pageSubtitle = {
  textAlign: "center",
  color: "#94a3b8",
};

const statsBox = {
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  marginTop: "25px",
};

const statCard = {
  background: "#0f172a",
  padding: "15px 25px",
  borderRadius: "10px",
  border: "1px solid #1e293b",
  boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
};

const legendBox = {
  display: "flex",
  gap: "25px",
  justifyContent: "center",
  marginTop: "20px",
  marginBottom: "20px",
  color: "#cbd5e1",
};

const mapWrapper = {
  height: "720px",
  width: "100%",
  borderRadius: "16px",
  overflow: "hidden",
  border: "1px solid #1e293b",
  boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
};

export default LiveMap;
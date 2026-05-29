import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LiveMap() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadIncidents = async () => {
    try {
      setLoading(true);

      const response = await API.get("/api/incidents");

      const validIncidents = (response.data || []).filter(
        (item) =>
          item.latitude !== null &&
          item.longitude !== null &&
          item.latitude !== undefined &&
          item.longitude !== undefined
      );

      setIncidents(validIncidents);
    } catch (error) {
      console.error("Failed to load incidents on map:", error);
      alert("Failed to load incidents on map");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  const totalIncidents = incidents.length;

  const activeIncidents = incidents.filter(
    (incident) => incident.status !== "RESOLVED"
  ).length;

  const resolvedIncidents = incidents.filter(
    (incident) => incident.status === "RESOLVED"
  ).length;

  const defaultCenter = [28.6139, 77.209];

  return (
    <div style={pageStyle}>
      <Sidebar />

      <main style={mainStyle}>
        <div style={heroBox}>
          <h1 style={heroTitle}>AEGIS AI Emergency Response System</h1>
          <p style={heroText}>
            Monitor incidents in real time, track emergency response teams, and
            visualize disaster locations across the city.
          </p>
        </div>

        <h1 style={titleStyle}>Live Incident Map</h1>

        <p style={subtitleStyle}>
          Real-time emergency location monitoring and incident visualization
        </p>

        <div style={statsBox}>
          <div style={statCard}>Total Incidents: {totalIncidents}</div>
          <div style={statCard}>Active: {activeIncidents}</div>
          <div style={statCard}>Resolved: {resolvedIncidents}</div>
        </div>

        <div style={legendBox}>
          <span style={legendItem}>
            <span style={{ ...dotStyle, background: "#ef4444" }}></span>
            High/Critical
          </span>

          <span style={legendItem}>
            <span style={{ ...dotStyle, background: "#3b82f6" }}></span>
            Normal
          </span>

          <span style={legendItem}>
            <span style={{ ...dotStyle, background: "#22c55e" }}></span>
            Resolved
          </span>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", marginTop: "40px" }}>
            Loading incidents on map...
          </p>
        ) : (
          <div style={mapWrapper}>
            <MapContainer
              center={defaultCenter}
              zoom={10}
              scrollWheelZoom={true}
              style={{ height: "560px", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {incidents.map((incident) => (
                <Marker
                  key={incident.id}
                  position={[
                    Number(incident.latitude),
                    Number(incident.longitude),
                  ]}
                >
                  <Popup>
                    <strong>{incident.title}</strong>
                    <br />
                    Type: {incident.emergencyType}
                    <br />
                    Severity: {incident.severity}
                    <br />
                    Status: {incident.status}
                    <br />
                    Location: {incident.location}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
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

const heroBox = {
  maxWidth: "780px",
  margin: "0 auto 25px auto",
  background: "linear-gradient(135deg, #dc2626, #991b1b)",
  borderRadius: "14px",
  padding: "30px",
  textAlign: "center",
};

const heroTitle = {
  fontSize: "32px",
  marginBottom: "10px",
};

const heroText = {
  color: "#fee2e2",
  lineHeight: "1.6",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "34px",
  marginTop: "20px",
};

const subtitleStyle = {
  textAlign: "center",
  color: "#94a3b8",
};

const statsBox = {
  display: "flex",
  justifyContent: "center",
  gap: "18px",
  marginTop: "25px",
  flexWrap: "wrap",
};

const statCard = {
  background: "#0f172a",
  border: "1px solid #1e293b",
  padding: "15px 28px",
  borderRadius: "10px",
};

const legendBox = {
  display: "flex",
  justifyContent: "center",
  gap: "25px",
  marginTop: "20px",
  marginBottom: "20px",
  flexWrap: "wrap",
};

const legendItem = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const dotStyle = {
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  display: "inline-block",
};

const mapWrapper = {
  maxWidth: "900px",
  margin: "0 auto",
  borderRadius: "14px",
  overflow: "hidden",
  border: "1px solid #1e293b",
};

export default LiveMap;
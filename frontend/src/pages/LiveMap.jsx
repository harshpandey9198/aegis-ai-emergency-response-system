import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import API from "../services/api";
import Sidebar from "../components/Sidebar";

function LiveMap() {
  const [incidents, setIncidents] = useState([]);

  const loadIncidents = async () => {
    try {
      const response = await API.get("/incidents");
      setIncidents(response.data);
    } catch (error) {
      alert("Failed to load map incidents");
    }
  };

  useEffect(() => {
    loadIncidents();
  }, []);

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
        <h1 style={{ fontSize: "42px", textAlign: "center" }}>
          Live Emergency Map
        </h1>

        <p style={{ textAlign: "center", color: "#94a3b8" }}>
          Real-time incident visualization across city zones
        </p>

        <div
          style={{
            marginTop: "30px",
            height: "600px",
            borderRadius: "14px",
            overflow: "hidden",
            border: "1px solid #1e293b",
          }}
        >
          <MapContainer
            center={[28.6139, 77.209]}
            zoom={11}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution="OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {incidents.map((incident) => (
              <Marker
                key={incident.id}
                position={[
                  28.6139 + incident.id * 0.01,
                  77.209 + incident.id * 0.01,
                ]}
              >
                <Popup>
                  <b>{incident.title}</b>
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
      </main>
    </div>
  );
}

export default LiveMap;
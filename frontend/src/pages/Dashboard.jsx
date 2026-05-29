import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Dashboard() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);

  const loadSummary = async () => {
    try {
      const response = await API.get("/api/analytics/summary");
      setSummary(response.data);
    } catch (error) {
      console.error("Analytics error:", error);
      alert("Analytics load failed. Please check backend.");
      setSummary({});
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

  const incidentTypeData = {
    labels: ["Fire", "Accident", "Flood", "Medical"],
    datasets: [
      {
        label: "Incidents",
        data: [
          summary?.fireIncidents || 0,
          summary?.accidentIncidents || 0,
          summary?.floodIncidents || 0,
          summary?.medicalIncidents || 0,
        ],
        backgroundColor: ["#ef4444", "#f97316", "#3b82f6", "#22c55e"],
        borderColor: "#020617",
        borderWidth: 2,
      },
    ],
  };

  const severityData = {
    labels: ["High", "Critical"],
    datasets: [
      {
        label: "Severity Count",
        data: [summary?.highSeverity || 0, summary?.criticalSeverity || 0],
        backgroundColor: ["#f97316", "#ef4444"],
        borderColor: "#020617",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={pageStyle}>
      <Sidebar />

      <main style={mainStyle}>
        <h1 style={mainTitle}>AEGIS AI Dashboard</h1>

        <p style={subtitle}>
          AI Powered Emergency Response & Disaster Monitoring System
        </p>

        <div style={navBox}>
          <button onClick={() => navigate("/incidents")} style={navButton}>
            Manage Incidents
          </button>

          <button onClick={() => navigate("/teams")} style={navButton}>
            Response Teams
          </button>

          <button onClick={() => navigate("/assistant")} style={navButton}>
            AI Assistant
          </button>

          <button onClick={() => navigate("/map")} style={navButton}>
            Live Map
          </button>
        </div>

        {!summary ? (
          <p style={{ textAlign: "center", marginTop: "40px" }}>
            Loading analytics...
          </p>
        ) : (
          <>
            <div style={cardGrid}>
              <Card title="Total Incidents" value={summary.totalIncidents || 0} />
              <Card title="Pending" value={summary.pendingIncidents || 0} />
              <Card title="Resolved" value={summary.resolvedIncidents || 0} />
              <Card title="Dispatched" value={summary.dispatchedIncidents || 0} />

              <Card title="High Severity" value={summary.highSeverity || 0} />
              <Card title="Critical" value={summary.criticalSeverity || 0} />
              <Card title="Fire Incidents" value={summary.fireIncidents || 0} />
              <Card title="Accidents" value={summary.accidentIncidents || 0} />

              <Card title="Total Teams" value={summary.totalTeams || 0} />
              <Card title="Available Teams" value={summary.availableTeams || 0} />
              <Card title="Busy Teams" value={summary.busyTeams || 0} />
              <Card title="Medical Cases" value={summary.medicalIncidents || 0} />
            </div>

            <div style={dashboardGrid}>
              <div style={chartCard}>
                <h2 style={sectionTitle}>Incident Type Analysis</h2>
                <div style={pieWrapper}>
                  <Pie data={incidentTypeData} />
                </div>
              </div>

              <div style={heroCard}>
                <h2 style={heroTitle}>
                  AEGIS AI
                  <br />
                  Emergency Response System
                </h2>

                <p style={heroText}>
                  Real-Time Incident Monitoring, AI Emergency Guidance, Response
                  Team Coordination
                </p>
              </div>

              <div style={chartCard}>
                <h2 style={sectionTitle}>Severity Breakdown</h2>
                <Bar data={severityData} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={cardStyle}>
      <h3 style={cardTitle}>{title}</h3>
      <h1 style={cardValue}>{value}</h1>
    </div>
  );
}

const pageStyle = {
  background: "#020617",
  color: "white",
  minHeight: "100vh",
};

const mainStyle = {
  marginLeft: "270px",
  padding: "35px",
};

const mainTitle = {
  fontSize: "42px",
  textAlign: "center",
  marginBottom: "8px",
};

const subtitle = {
  textAlign: "center",
  color: "#94a3b8",
};

const navBox = {
  display: "flex",
  flexWrap: "wrap",
  gap: "15px",
  marginTop: "25px",
  marginBottom: "30px",
  justifyContent: "center",
};

const navButton = {
  padding: "12px 20px",
  background: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "15px",
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(160px, 1fr))",
  gap: "20px",
  marginTop: "30px",
};

const cardStyle = {
  background: "#0f172a",
  padding: "22px",
  borderRadius: "14px",
  textAlign: "center",
  border: "1px solid #1e293b",
  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
};

const cardTitle = {
  color: "#93c5fd",
  fontSize: "15px",
  marginBottom: "10px",
};

const cardValue = {
  fontSize: "36px",
  color: "#fb7185",
  margin: 0,
};

const dashboardGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "25px",
  marginTop: "35px",
  alignItems: "stretch",
};

const chartCard = {
  background: "#0f172a",
  padding: "25px",
  borderRadius: "14px",
  border: "1px solid #1e293b",
  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
};

const sectionTitle = {
  textAlign: "center",
  fontSize: "22px",
  marginBottom: "15px",
};

const pieWrapper = {
  maxWidth: "420px",
  margin: "0 auto",
};

const heroCard = {
  background: "linear-gradient(135deg, #dc2626, #991b1b)",
  padding: "35px",
  borderRadius: "14px",
  textAlign: "center",
  border: "1px solid #ef4444",
  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const heroTitle = {
  fontSize: "32px",
  fontWeight: "700",
  lineHeight: "1.2",
  marginBottom: "18px",
};

const heroText = {
  fontSize: "16px",
  lineHeight: "1.6",
  maxWidth: "420px",
  margin: "0 auto",
};

export default Dashboard;
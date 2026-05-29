import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import {
  FaFire,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUsers
} from "react-icons/fa";

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
      const response = await API.get("/analytics/summary");
      setSummary(response.data);
    } catch (error) {
      alert("Analytics load failed. Please check backend.");
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

  const incidentTypeData = summary && {
    labels: ["Fire", "Accident", "Flood", "Medical"],
    datasets: [
      {
        label: "Incidents",
        data: [
          summary.fireIncidents || 0,
          summary.accidentIncidents || 0,
          summary.floodIncidents || 0,
          summary.medicalIncidents || 0,
        ],
        backgroundColor: ["#ef4444", "#f97316", "#3b82f6", "#22c55e"],
        borderColor: "#020617",
        borderWidth: 2,
      },
    ],
  };

  const severityData = summary && {
    labels: ["High", "Critical"],
    datasets: [
      {
        label: "Severity Count",
        data: [summary.highSeverity || 0, summary.criticalSeverity || 0],
        backgroundColor: ["#f97316", "#ef4444"],
        borderColor: "#020617",
        borderWidth: 2,
      },
    ],
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
        <h1 style={{ fontSize: "42px", textAlign: "center" }}>
          AEGIS AI Dashboard
        </h1>

        <p style={{ textAlign: "center", color: "#94a3b8" }}>
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
              <Card title="Total Incidents" value={summary.totalIncidents || 0} icon={<FaExclamationTriangle size={30} />} />
              <Card title="Pending" value={summary.pendingIncidents || 0} />
              <Card title="Resolved" value={summary.resolvedIncidents || 0 } icon={<FaCheckCircle size={30} />} />
              <Card title="Dispatched" value={summary.dispatchedIncidents || 0} />

              <Card title="High Severity" value={summary.highSeverity || 0} />
              <Card title="Critical" value={summary.criticalSeverity || 0} />
              <Card title="Fire Incidents" value={summary.fireIncidents || 0} />
              <Card title="Accidents" value={summary.accidentIncidents || 0} />

              <Card title="Total Teams" value={summary.totalTeams || 0}  icon={<FaUsers size={30} />}/>
              <Card title="Available Teams" value={summary.availableTeams || 0} />
              <Card title="Busy Teams" value={summary.busyTeams || 0} />
              <Card title="Medical Cases" value={summary.medicalIncidents || 0} />
            </div>

            <div style={chartGrid}>
              <div style={chartCard}>
                <h2 style={{ textAlign: "center" }}>Incident Type Analysis</h2>
                <div style={{ maxWidth: "420px", margin: "0 auto" }}>
                  <Pie data={incidentTypeData} />
                </div>
              </div>
              <div
 style={{
   background:"#dc2626",
   padding:"25px",
   borderRadius:"15px",
   marginBottom:"25px"
 }}
>
   <h1>AEGIS AI Emergency Response System</h1>

   <p>
      Real-Time Incident Monitoring,
      AI Emergency Guidance,
      Response Team Coordination
   </p>
</div>

              <div style={chartCard}>
                <h2 style={{ textAlign: "center" }}>Severity Breakdown</h2>
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
      <h3 style={{ color: "#94a3b8", fontSize: "16px" }}>{title}</h3>

      <h1 style={{ fontSize: "38px", color: "#f87171", marginTop: "10px" }}>
        {value}
      </h1>
    </div>
  );
}

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
  fontSize: "16px",
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
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

const chartGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "25px",
  marginTop: "35px",
};

const chartCard = {
  background: "#0f172a",
  padding: "25px",
  borderRadius: "14px",
  border: "1px solid #1e293b",
  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
};

export default Dashboard;
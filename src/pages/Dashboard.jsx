import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar";

import {
  FileText,
  CheckCircle,
  Star,
} from "lucide-react";

function Dashboard({ navigate, user, setUser, theme, setTheme, analysisData, setAnalysisData }) {

  const [stats, setStats] = useState({
    totalResumes: 0,
    totalAnalyses: 0,
    averageScore: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/dashboard-stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const cards = [
    {
      icon: <FileText size={28} color="#2563eb" />,
      label: "Total Resumes",
      value: stats.totalResumes,
      color: "#e8f0fe",
    },
    {
      icon: <CheckCircle size={28} color="#16a34a" />,
      label: "AI Matches",
      value: stats.totalAnalyses,
      color: "#e8fef4",
    },
    {
      icon: <Star size={28} color="#eab308" />,
      label: "Avg Match Score",
      value: Math.round(stats.averageScore) + "%",
      color: "#fff8e1",
    },
  ];

  /* scans for Recent Activity — derived from analysisData if available */
  const scans = analysisData?.scans || [];

  return (
    <div className="page-wrapper">
      {/* Sidebar remains untouched */}
      <Sidebar active="dashboard" navigate={navigate} user={user} />

      {/* Main Dashboard Content */}
      <div className="main-content dashboard-container">

        {/* Heading */}
        <h2 className="dashboard-title">
          Good Morning, {user?.name || "Harini"}
        </h2>
        <p className="dashboard-subtitle">
          Optimize Your Resume. Unlock Better Opportunities.
        </p>

        {/* Top Cards */}
        <div className="stats-grid">
          {cards.map((c) => (
            <div key={c.label} className="stat-card">
              <div 
                className="stat-icon-wrapper" 
                style={{ backgroundColor: c.color }}
              >
                {c.icon}
              </div>
              <div className="stat-value">{c.value}</div>
              <div className="stat-label">{c.label}</div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="bottom-grid">

          {/* Graph Section */}
          <div className="content-card">
            <h3 className="card-title">Monthly Applications</h3>
            <div className="chart-container">
              {/* Using percentage heights instead of fixed pixels so it scales dynamically */}
              {[40, 80, 60, 100, 70, 120].map((h, i) => (
                <div
                  key={i}
                  className="chart-bar"
                  style={{ height: `${(h / 120) * 100}%` }} 
                ></div>
              ))}
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="content-card">
            <h3 className="card-title">Recent Activity</h3>

            {scans.length === 0 ? (
              <div className="empty-state">
                <p>No recent activity yet</p>
                <p>Upload your resume</p>
              </div>
            ) : (
              <div className="activity-list">
                {scans
                  .slice(-3)
                  .reverse()
                  .map((s, i) => (
                    <div key={i} className="activity-item">
                      <div>
                        <div className="activity-title">
                          {s.jobTitle || "Resume"}
                        </div>
                        <div className="activity-date">
                          {s.date}
                        </div>
                      </div>

                      <div
                        className="activity-badge"
                        style={{
                          background: s.score >= 70 ? "#dcfce7" : "#fef3c7",
                          color: s.score >= 70 ? "#166534" : "#92400e",
                        }}
                      >
                        {s.score}%
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
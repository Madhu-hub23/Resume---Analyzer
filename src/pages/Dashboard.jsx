import React, { useEffect, useState } from "react";
import "./Dashboard.css";


import {
  FileText,
  CheckCircle,
  Star,
  Bot,
} from "lucide-react";




function Dashboard({ setPage, scans = [] }) {

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
      icon: <FileText size={48} color="#2563eb" />,
      label: "Total Resumes",
      value: stats.totalResumes,
      color: "#e8f0fe",
    },
    {
      icon: <CheckCircle size={48} color="#16a34a" />,
      label: "AI Matches",
      value: stats.totalAnalyses,
      color: "#e8fef4",
    },
    {
      icon: <Star size={48} color="#eab308" />,
      label: "Avg Match Score",
      value: Math.round(stats.averageScore) + "%",
      color: "#fff8e1",
    },
  ];

  // rest of your JSX...


  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f7fb",
        fontFamily: "'Poppins',sans-serif",
        
      }}
    >

      
      {/* Main Dashboard */}
      <div style={{ flex: 1, padding: "36px 40px" }}>

        {/* Heading */}
        <h2
          style={{
            fontWeight: 700,
            fontSize: 50,
            color: "#1a1d1f",
          }}
        >
          Good Morning, Harini
        </h2><br></br>
        <p
          style={{
            fontSize: 36,
            color: "#666",
            marginBottom: 28,
          }}
        >
          Optimize Your Resume. Unlock Better Opportunities.
        </p>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 20,
            marginBottom: 28,
            
          }}
        >
          {cards.map((c) => (
            <div
              key={c.label}
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: "24px 20px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 14,
                  background: c.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                }}
              >
                {c.icon}
              </div>

              <div
                style={{
                  fontWeight: 400,
                  fontSize: 42,
                  color: "#1a1d1f",
                  
                }}
              >
                {c.value}
              </div>

              <div
                style={{
                  fontSize: 24,
                  color: "#666",
                }}
              >
                {c.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            height: "150px",
          }}
        >

          {/* Graph */}
          <div
            style={{
              background: "#fff",
              borderRadius: 40,
              padding: 24,
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              height: "750px",
            }}
          >
            <h3
              style={{
                marginBottom: 20,
                color: "#1a1d1f",
                fontSize: 42,

              }}
            >
              Monthly Applications
            </h3>

            <div
              style={{
                height: 420,
                display: "flex",
                alignItems: "flex-end",
                gap: 16,
              }}
            >
              {[40, 80, 60, 100, 70, 120].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: h,
                    background:
                      "linear-gradient(to top, #2563eb, #60a5fa)",
                    borderRadius: 10,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 24,
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              height: "750px",
            }}
          >
            <h3
              style={{
                marginBottom: 20,
                color: "#1a1d1f",
                fontSize: 42,

              }}
            >
              Recent Activity
            </h3>

            {scans.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#888",
                  marginTop: 60,
                  fontSize: 32,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "40vh",

                }}
              >
                No recent activity yet
                <br />
                Upload your resume
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {scans
                  .slice(-3)
                  .reverse()
                  .map((s, i) => (
                    <div
                      key={i}
                      style={{
                        background: "#f8fafc",
                        padding: 14,
                        borderRadius: 12,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: 14,
                          }}
                        >
                          {s.jobTitle || "Resume"}
                        </div>

                        <div
                          style={{
                            fontSize: 12,
                            color: "#888",
                            marginTop: 4,
                          }}
                        >
                          {s.date}
                        </div>
                      </div>

                      <div
                        style={{
                          background:
                            s.score >= 70
                              ? "#dcfce7"
                              : "#fef3c7",

                          color:
                            s.score >= 70
                              ? "#166534"
                              : "#92400e",

                          padding: "6px 12px",
                          borderRadius: 10,
                          fontWeight: 700,
                          fontSize: 13,
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
/*
 * ═══════════════════════════════════════════════════════════════
 *  ScanHistory.jsx  —  Scan History page
 * ───────────────────────────────────────────────────────────────
 *  CSS:        ./ScanHistory.css
 *  Sidebar:    ./Sidebar.jsx  →  active="scan-history"
 *  Connected:  App.jsx  (screen="scan-history")
 *
 *  Props:
 *    navigate (fn)  — navigate to another screen
 *    user     (obj) — { name, email } for sidebar
 *
 *  Features:
 *    • 5 stat cards (Total, Avg, Best, This Month, Needs Improvement)
 *    • Searchable, sortable table
 *    • Delete rows
 *    • 👁 View action navigates to result page
 *    • Quick-action buttons
 * ═══════════════════════════════════════════════════════════════
 */

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./ScanHistory.css";

/* ── Mock scan records ── */
const INITIAL_SCANS = [
  { id: 1, score: 92, job: "Data Analyst",   skills: "Python, PowerBI",  date: "May 10, 2026  10:30 AM" },
  { id: 2, score: 74, job: "AI Engineer",    skills: "Python, ML, DL",   date: "May 9,  2026   8:30 AM" },
  { id: 3, score: 38, job: "Data Scientist", skills: "Statistics, ML",   date: "May 5,  2026  10:30 AM" },
  { id: 4, score: 83, job: "ML Engineer",    skills: "Python, ML, DL",   date: "May 1,  2026  11:00 AM" },
];

/* ── Build stat strip from current scans array ── */
function buildStats(scans) {
  const total = scans.length;
  const avg   = total ? Math.round(scans.reduce((s, r) => s + r.score, 0) / total) : 0;
  const best  = total ? Math.max(...scans.map(r => r.score)) : 0;
const month = scans.length;

const low   = scans.filter(r => r.score < 60).length;
  return [
    { icon: "📋", label: "Total Scans",       value: total  },
    { icon: "📊", label: "Avg Score",         value: `${avg}%` },
    { icon: "🏆", label: "Best Score",        value: `${best}%` },
    { icon: "📅", label: "This Month",        value: month  },
    { icon: "⚠️", label: "Needs Improvement", value: low    },
  ];
}

/* ── Score badge colour ── */
function badgeStyle(score) {
  if (score >= 80) return { bg: "#dcfce7", color: "#16a34a" };
  if (score >= 60) return { bg: "#fef3c7", color: "#d97706" };
  return               { bg: "#fee2e2", color: "#dc2626" };
}

/* ════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════════ */
export default function ScanHistory({
  navigate,
  user,
  analysisData,
  setAnalysisData,
}) {
  const [scans, setScans] = useState([]);
  const [search, setSearch] = useState("");
  const [sortDir, setSortDir] = useState("desc");

  useEffect(() => {
    fetch("http://localhost:5001/analysis-history")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setScans(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  /* Filter + sort */
  const filtered = scans
    .filter(s =>
  (s.skills_found || "")
    .toLowerCase()
    .includes(search.toLowerCase())
)
.sort((a, b) =>
  new Date(b.analyzed_at) - new Date(a.analyzed_at)
)
  const stats = buildStats(scans);

  const deleteRow = async (id) => {
  try {
    await fetch(
      `http://localhost:5001/delete-analysis/${id}`,
      {
        method: "DELETE",
      }
    );

    setScans(prev =>
      prev.filter(s => s.id !== id)
    );
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="page-wrapper">
      {/* Sidebar — active = scan-history */}
      <Sidebar active="scan-history" navigate={navigate} user={user} />

      <div className="main-content">

        {/* ── Header ── */}
        <div className="sh__header">
          <div>
            <h2 className="sh__title">Scan History</h2>
            <p className="sh__sub">View and manage all your resume scans and their results</p>
          </div>
          <div className="sh__controls">
            {/* Search */}
            <div className="sh__search-wrap">
              <span className="sh__search-icon">🔍</span>
              <input
                className="sh__search"
                placeholder="Search job or skills..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            {/* Sort toggle */}
            <button
              className="sh__sort-btn"
              onClick={() => setSortDir(d => d === "desc" ? "asc" : "desc")}
            >
              {sortDir === "desc" ? "↓ Score" : "↑ Score"}
            </button>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="sh__stats">
          {stats.map(({ icon, label, value }) => (
            <div className="card sh__stat-card" key={label}>
              <span className="sh__stat-icon">{icon}</span>
              <span className="sh__stat-value">{value}</span>
              <span className="sh__stat-label">{label}</span>
            </div>
          ))}
        </div>

        {/* ── Table ── */}
        <div className="card sh__table-card">
          {filtered.length === 0 ? (
            <p className="sh__empty">No results found.</p>
          ) : (
            <div className="sh__table-scroll">
              <table className="sh__table">
                <thead>
                  <tr>
                    <th>SCORE</th>
                    <th>JOB TITLE</th>
                    <th>SKILLS</th>
                    <th>SCAN DATE</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(row => {
                    const { bg, color } = badgeStyle(row.score);
                    return (
                      <tr key={row.id}>
                        <td>
                          <span className="sh__badge" style={{ background: bg, color }}>
                            {row.score}%
                          </span>
                        </td>
                        <td className="sh__job">
                              Resume {row.resume_id}
                        </td>
                        <td className="sh__skills">{row.skills_found}</td>
                        <td className="sh__date">
                             {new Date(row.analyzed_at).toLocaleString()}
                        </td>            
                        <td>
                          <div className="sh__actions">
                                <button
  className="sh__action-btn"
  onClick={() => {
    setAnalysisData({
      score: row.score,
      skillsFound: row.skills_found,
      suggestions: row.suggestions,
    });

    navigate("result");
  }}
>
  👁
</button>
                            <button
                              className="sh__action-btn"
                              title="Download"
                              onClick={() => window.print()}
                            >⬇</button>
                            <button
                              className="sh__action-btn sh__action-btn--del"
                              title="Delete"
                              onClick={() => deleteRow(row.id)}
                            >🗑</button>

            
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Quick actions ── */}
        <div className="card sh__quick">
          <span className="sh__quick-label">Quick Actions</span>
          <div className="sh__quick-btns">
            <button className="btn btn-primary" onClick={() => navigate("resume-upload")}>
              📂 Upload Resume
            </button>
            <button className="btn btn-outline" onClick={() => navigate("result")}>
              📊 View Result
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

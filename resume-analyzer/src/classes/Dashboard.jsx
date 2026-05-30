/*
 * ═══════════════════════════════════════════════════════════════
 *  Dashboard.jsx
 *  Placeholder page — not your module
 * ───────────────────────────────────────────────────────────────
 *  CSS:       ./Dashboard.css
 *  Sidebar:   ./Sidebar.jsx  →  active="dashboard"
 *  Connected: App.jsx  (screen="dashboard")
 * ═══════════════════════════════════════════════════════════════
 */

import Sidebar from "./Sidebar";
import "./Dashboard.css";

export default function Dashboard({ navigate, user }) {
  return (
    <div className="page-wrapper">
      {/* Sidebar — active page = dashboard */}
      <Sidebar active="dashboard" navigate={navigate} user={user} />

      <div className="main-content">
        <div className="db__placeholder">
          <div className="db__icon">🏠</div>
          <h2 className="db__title">Dashboard</h2>
          <p className="db__desc">
            This page belongs to another team member.<br />
            The dashboard will display resume stats, match scores,
            recent activity, and monthly application charts.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("resume-upload")}
          >
            Go to Resume Upload →
          </button>
        </div>
      </div>
    </div>
  );
}

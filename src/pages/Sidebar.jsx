/*
 * ═══════════════════════════════════════════════════════════════
 *  Sidebar.jsx
 *  Shared sidebar used by ALL modules
 * ───────────────────────────────────────────────────────────────
 *  CSS:        ./Sidebar.css  (sidebar-specific)
 *              ./global.css   (base variables & sidebar classes)
 *
 *  Used by:
 *    Dashboard.jsx      →  active="dashboard"
 *    ResumeUpload.jsx   →  active="resume-upload"
 *    Result.jsx         →  active="result"
 *    ScanHistory.jsx    →  active="scan-history"
 *    Settings.jsx       →  active="settings"
 *
 *  Props:
 *    active   (string)   — current page key
 *    navigate (function) — switches screen in App.jsx
 *    user     (object)   — { name, email } shown at bottom
 *                          updates live when Settings saves
 * ═══════════════════════════════════════════════════════════════
 */

import { useState } from "react";
import { FaRobot }       from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import { MdDashboard, MdUploadFile, MdBarChart,
         MdHistory, MdSettings }  from "react-icons/md";
import "./Sidebar.css"; /* sidebar-specific overrides */
import { MdLogout } from "react-icons/md";

/* ── Navigation items
      key   → matches screen keys in App.jsx
      label → text shown when expanded
      icon  → react-icons component                             */

export default function Sidebar({ active, navigate, user }) {
  const [collapsed, setCollapsed] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const language = localStorage.getItem("language") || "English";

const NAV_ITEMS =
  language === "Tamil"
    ? [
        { key: "dashboard", label: "டாஷ்போர்டு", Icon: MdDashboard },
        { key: "resume-upload", label: "ரெசுமே பதிவேற்றம்", Icon: MdUploadFile },
        { key: "result", label: "முடிவுகள்", Icon: MdBarChart },
        { key: "scan-history", label: "வரலாறு", Icon: MdHistory },
        { key: "settings", label: "அமைப்புகள்", Icon: MdSettings },
      ]
    : [
        { key: "dashboard", label: "Dashboard", Icon: MdDashboard },
        { key: "resume-upload", label: "Resume Upload", Icon: MdUploadFile },
        { key: "result", label: "Result & Analyze", Icon: MdBarChart },
        { key: "scan-history", label: "Scan History", Icon: MdHistory },
        { key: "settings", label: "Settings", Icon: MdSettings },
      ];

  const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  alert("Logged out successfully");

  window.location.href = "/";
};

  /* Live-updated from Settings → Save Changes */
  const name    = user?.name  || "Harini";
  const email   = user?.email || "harini@gmail.com";
  const initial = name.charAt(0).toUpperCase();

  return (
    <aside
      className="sidebar"
      style={{ width: collapsed ? "66px" : "var(--sidebar-width)" }}
    >

      {/* ── TOP BLOCK: logo + nav ─────────────────────────── */}
      <div>

        {/* Brand row */}
        <div className="sidebar__brand">

          {/* Purple square + robot icon + text (hidden when collapsed) */}
          {!collapsed && (
            <div className="sidebar__logo-wrap">
              {/* Purple rounded-square — matches Figma logo box */}
              <div className="sidebar__logo-box">
                <FaRobot size={20} />
              </div>
              <span className="sidebar__brand-name">AI SCREENER</span>
            </div>
          )}

          {/* Collapsed: only show the logo box, no text */}
          {collapsed && (
            <div className="sidebar__logo-box" style={{ margin: "0 auto" }}>
              <FaRobot size={20} />
            </div>
          )}

          {/* Toggle button with chevron icon */}
          <button
            className="sidebar__toggle"
            onClick={() => setCollapsed(c => !c)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            style={{ marginLeft: collapsed ? 0 : undefined }}
          >
            <IoChevronBack
              size={16}
              className="sidebar__chevron"
              style={{
                transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.25s ease",
              }}
            />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="sidebar__nav">
          {NAV_ITEMS.map(({ key, label, Icon }) => (
            <button
              key={key}
              className={`sidebar__nav-item${active === key ? " active" : ""}`}
              onClick={() => navigate(key)}
              /* Show tooltip with label when collapsed */
              title={collapsed ? label : ""}
              style={{ justifyContent: collapsed ? "center" : "flex-start" }}
            >
              {/* react-icons icon */}
              <span className="sidebar__nav-icon">
                <Icon size={20} />
              </span>
              {/* Label text — hidden when collapsed */}
              {!collapsed && <span>{label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* ── BOTTOM BLOCK: user profile ───────────────────── */}
      <div
  className="sidebar__user"
  onClick={() => setShowLogout(!showLogout)}
  style={{ cursor: "pointer", position: "relative" }}
>
        {/* Avatar circle — always visible */}
        <div className="sidebar__avatar">{initial}</div>

        {/* Name + email — hidden when collapsed */}
        {!collapsed && (
          <div className="sidebar__user-info">
            <span className="sidebar__user-name">{name}</span>
            <span className="sidebar__user-email">{email}</span>
          </div>
        )}

        {showLogout && !collapsed && (
  <div
    style={{
      position: "absolute",
      bottom: "60px",
      left: "10px",
      right: "10px",
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      zIndex: 100,
    }}
  >
    <button
  onClick={handleLogout}
  style={{
    width: "100%",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px",
  }}
>
  <MdLogout size={18} />
  {language === "Tamil" ? "வெளியேறு" : "Logout"}
</button>
  </div>
)}
      </div>

    </aside>
  );
}

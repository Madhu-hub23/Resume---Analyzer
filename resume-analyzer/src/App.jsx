/*
 * ═══════════════════════════════════════════════════════════════
 *  App.jsx  —  Root of Resume Analyzer
 * ───────────────────────────────────────────────────────────────
 *  Manages global state:
 *    screen        → active page key (which module renders)
 *    theme         → "light" | "dark"  applied via data-theme on <html>
 *    user          → { name, email, phone, location }
 *    analysisData  → passed from ResumeUpload → Result page
 *
 *  All modules live in:  src/modules/
 *  Shared CSS:           src/modules/global.css  (imported here once)
 *
 *  Connection map:
 *    App.jsx
 *      ├── global.css          (shared vars, reset, layout, sidebar, cards)
 *      ├── Dashboard.jsx       → Dashboard.css
 *      ├── ResumeUpload.jsx    → ResumeUpload.css
 *      ├── Result.jsx          → Result.css
 *      ├── ScanHistory.jsx     → ScanHistory.css
 *      └── Settings.jsx        → Settings.css
 *                 ↑ all five import Sidebar.jsx → Sidebar.css → global.css
 * ═══════════════════════════════════════════════════════════════
 */

import { useState, useEffect } from "react";

/* ── Modules (all in src/modules/) ── */
import Dashboard    from "./classes/Dashboard";
import ResumeUpload from "./classes/ResumeUpload";
import Result       from "./classes/Result";
import ScanHistory  from "./classes/ScanHistory";
import Settings     from "./classes/Settings";

/* ── Global shared CSS — imported ONCE here, applies everywhere ── */
import "./modules/global.css";

export default function App() {

  /* ── 1. Active screen ──────────────────────────────────────── */
  const [screen, setScreen] = useState("dashboard");
  const navigate = (key) => setScreen(key);

  /* ── 2. Theme — "light" | "dark" ──────────────────────────── */
  /*   Applied to <html data-theme="..."> so every CSS variable
       override in global.css takes effect across ALL modules      */
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  /* ── 3. User profile ───────────────────────────────────────── */
  /*   Settings calls setUser() on Save → Sidebar refreshes live  */
  const [user, setUser] = useState({
    name:     "Harini",
    email:    "harini@gmail.com",
    phone:    "911504 84084",
    location: "India",
  });

  /* ── 4. Analysis data  ResumeUpload → Result ───────────────── */
  /*   ResumeUpload calls setAnalysisData() then navigate("result")
       Result.jsx reads analysisData.candidates array               */
  const [analysisData, setAnalysisData] = useState(null);

  /* ── Shared props bundle passed to every module ────────────── */
  const shared = {
    navigate,
    user,
    setUser,
    theme,
    setTheme,
    analysisData,
    setAnalysisData,
  };

  /* ── Screen map — one key per module ──────────────────────── */
  const screens = {
    "dashboard":     <Dashboard    {...shared} />,
    "resume-upload": <ResumeUpload {...shared} />,
    "result":        <Result       {...shared} />,
    "scan-history":  <ScanHistory  {...shared} />,
    "settings":      <Settings     {...shared} />,
  };

  return (
    <div className="app-root">
      {screens[screen] ?? screens["dashboard"]}
    </div>
  );
}

/*
 * ─── TEAM INTEGRATION QUICK REFERENCE ──────────────────────────
 *
 *  ResumeUpload → call these after AI analysis:
 *    setAnalysisData({
 *      candidates: [
 *        {
 *          id: 1, name: "Candidate 1", score: 88,
 *          summary: "Great match.",
 *          breakdown: [
 *            { label: "Skill Match", pct: 90 },
 *            { label: "Experience",  pct: 85 },
 *            { label: "Education",   pct: 80 },
 *            { label: "Key Words",   pct: 88 },
 *            { label: "Overall",     pct: 88 },
 *          ],
 *        },
 *      ],
 *    })
 *    navigate("result")
 *
 *  LoginPage / SignUpPage → call after auth:
 *    setUser({ name: "User Name", email: "user@email.com" })
 *    navigate("dashboard")
 *
 *  Settings → already wired:
 *    setUser()  → Sidebar name/email updates
 *    setTheme() → ALL pages switch dark/light
 * ────────────────────────────────────────────────────────────────
 */

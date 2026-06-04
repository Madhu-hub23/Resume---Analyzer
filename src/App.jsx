/*
 * ═══════════════════════════════════════════════════════════════
 *  App.jsx  —  Root of Resume Analyzer
 * ───────────────────────────────────────────────────────────────
 *  All pages live in:  src/pages/
 *  Shared CSS:         src/pages/global.css  (imported here once)
 * ═══════════════════════════════════════════════════════════════
 */

import { useState, useEffect } from "react";
import Login        from "./pages/Login";
import Signup       from "./pages/Signup";
import Dashboard    from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import Result       from "./pages/Result";
import ScanHistory  from "./pages/ScanHistory";
import Settings     from "./pages/Settings";

import "./pages/global.css";

export default function App() {

  /* ── 1. Active screen ── */
  const [screen, setScreen] = useState("login");
  const navigate = (key) => setScreen(key);

  /* ── 2. Theme ── */
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  /* ── 3. User profile ── */
  const [user, setUser] = useState({
    name:     "Harini",
    email:    "harini@gmail.com",
    phone:    "911504 84084",
    location: "India",
  });

  /* ── 4. Analysis data  ResumeUpload → Result ── */
  const [analysisData, setAnalysisData] = useState(null);

  const shared = {
    navigate,
    user,
    setUser,
    theme,
    setTheme,
    analysisData,
    setAnalysisData,
  };

  const screens = {
    "login":         <Login        {...shared} />,
    "signup":        <Signup       {...shared} />,
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

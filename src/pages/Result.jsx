/*
 * ═══════════════════════════════════════════════════════════════
 *  Result.jsx  —  Result & Analyze page
 * ───────────────────────────────────────────────────────────────
 *  CSS:        ./Result.css
 *  Sidebar:    ./Sidebar.jsx  →  active="result"
 *  Connected:  App.jsx  (screen="result")
 *
 *  Props:
 *    navigate      (fn)     — navigate to another screen
 *    user          (obj)    — { name, email } for sidebar
 *    analysisData  (obj)    — passed from ResumeUpload (optional)
 *                             falls back to DEMO_CANDIDATES
 *
 *  Features:
 *    • 4 candidate cards with tab selection
 *    • Animated donut score per candidate
 *    • Animated progress bars (score breakdown)
 *    • "View Overall Report" → navigates to scan-history
 *    • Accepts real analysisData.candidates from ResumeUpload
 * ═══════════════════════════════════════════════════════════════
 */

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Result.css";

/* ── Demo candidates (shown when no analysisData is provided) ── */
const DEMO_CANDIDATES = [
  {
    id: 1, name: "Candidate 1", score: 92,
    summary: "Excellent match. Strong technical skills and relevant experience.",
    breakdown: [
      { label: "Skill Match", pct: 95 },
      { label: "Experience",  pct: 90 },
      { label: "Education",   pct: 88 },
      { label: "Key Words",   pct: 94 },
      { label: "Overall",     pct: 92 },
    ],
  },
  {
    id: 2, name: "Candidate 2", score: 74,
    summary: "Good match. Has core skills but limited experience.",
    breakdown: [
      { label: "Skill Match", pct: 78 },
      { label: "Experience",  pct: 65 },
      { label: "Education",   pct: 80 },
      { label: "Key Words",   pct: 72 },
      { label: "Overall",     pct: 74 },
    ],
  },
  {
    id: 3, name: "Candidate 3", score: 55,
    summary: "Partial match. Some skills missing for this role.",
    breakdown: [
      { label: "Skill Match", pct: 50 },
      { label: "Experience",  pct: 60 },
      { label: "Education",   pct: 65 },
      { label: "Key Words",   pct: 48 },
      { label: "Overall",     pct: 55 },
    ],
  },
  {
    id: 4, name: "Candidate 4", score: 38,
    summary: "Low match. Resume does not align well with job requirements.",
    breakdown: [
      { label: "Skill Match", pct: 35 },
      { label: "Experience",  pct: 40 },
      { label: "Education",   pct: 50 },
      { label: "Key Words",   pct: 30 },
      { label: "Overall",     pct: 38 },
    ],
  },
];

/* ── Score → label + colours ── */
function scoreInfo(score) {
  if (score >= 80) return { label: "Good Match",       bg: "#dcfce7", color: "#16a34a", arc: "#22c55e" };
  if (score >= 60) return { label: "Average Match",    bg: "#fef3c7", color: "#d97706", arc: "#f59e0b" };
  return               { label: "Needs Improvement", bg: "#fee2e2", color: "#dc2626", arc: "#ef4444" };
}

/* ── Donut SVG ── */
function Donut({ score }) {
  const R = 78;
  const C = 2 * Math.PI * R;
  const filled = C * (score / 100);
  const { arc, color, label } = scoreInfo(score);

  return (
    <svg viewBox="0 0 200 200" className="result__donut" aria-label={`Score ${score}%`}>
      <defs>
        <linearGradient id={`grad-${score}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#2585f3" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      {/* Track */}
      <circle cx="100" cy="100" r={R} fill="none" stroke="var(--input-bg)" strokeWidth="24" />
      {/* Filled arc */}
      <circle
        cx="100" cy="100" r={R}
        fill="none"
        stroke={`url(#grad-${score})`}
        strokeWidth="24"
        strokeDasharray={`${filled} ${C}`}
        strokeLinecap="round"
        transform="rotate(-90 100 100)"
        style={{ transition: "stroke-dasharray 0.9s ease" }}
      />
      {/* Score text */}
      <text x="100" y="88" textAnchor="middle"
        style={{ fontSize: 26, fontWeight: 700, fontFamily: "Poppins,sans-serif", fill: "var(--text)" }}>
        {score}%
      </text>
      {/* Label text */}
      <text x="100" y="114" textAnchor="middle"
        style={{ fontSize: 12, fontFamily: "Poppins,sans-serif", fill: color, fontWeight: 600 }}>
        {label}
      </text>
    </svg>
  );
}

/* ── Animated progress bar row ── */
function BreakdownRow({ label, pct }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { const t = setTimeout(() => setWidth(pct), 150); return () => clearTimeout(t); }, [pct]);
  return (
    <div className="result__row">
      <div className="result__row-meta">
        <span className="result__row-label">{label}</span>
        <span className="result__row-pct">{pct}%</span>
      </div>
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════════ */
export default function Result({ navigate, user, analysisData }) {
  /* Use real data from ResumeUpload if available, else demo */
  const candidates = analysisData?.candidates || DEMO_CANDIDATES;

  /* Selected candidate tab index */
  const [selected, setSelected] = useState(0);
  const candidate = candidates[selected];
  const { bg, color, label: matchLabel } = scoreInfo(candidate.score);

  return (
    <div className="page-wrapper">
      {/* Sidebar — active = result */}
      <Sidebar active="result" navigate={navigate} user={user} />

      <div className="main-content">

        {/* ── Page header ── */}
        <div className="result__header">
          <div>
            <h2 className="result__page-title">Result &amp; Analyze</h2>
            <p className="result__page-sub">AI-powered candidate analysis results</p>
          </div>
          <button
            className="btn btn-outline"
            onClick={() => window.print()}
          >
            📄 Download PDF
          </button>
        </div>

        {/* ── Candidate tabs ── */}
        <div className="result__tabs">
          {candidates.map((c, i) => {
            const { color: tc, label: tl } = scoreInfo(c.score);
            return (
              <button
                key={c.id}
                className={`result__tab${selected === i ? " result__tab--active" : ""}`}
                onClick={() => setSelected(i)}
              >
                <span className="result__tab-name">{c.name}</span>
                <span className="result__tab-score" style={{ color: tc }}>{c.score}%</span>
              </button>
            );
          })}
        </div>

        {/* ── Two-panel layout ── */}
        <div className="result__panels">

          {/* LEFT — Donut + summary */}
          <div className="card result__score-card">
            <h3 className="result__panel-title">AI Match Score</h3>
            <div className="result__donut-wrap">
              <Donut score={candidate.score} key={candidate.id} />
            </div>
            <p className="result__summary">{candidate.summary}</p>
            <div className="result__pill-wrap">
              <span className="result__match-pill" style={{ background: bg, color }}>
                {matchLabel}
              </span>
            </div>
          </div>

          {/* RIGHT — Score breakdown */}
          <div className="card result__breakdown-card">
            <h3 className="result__panel-title">Score Breakdown</h3>
            <div className="result__breakdown-list">
              {candidate.breakdown.map(({ label, pct }) => (
                <BreakdownRow key={label} label={label} pct={pct} />
              ))}
            </div>
          </div>

        </div>

        {/* ── Action bar ── */}
        <div className="card result__action-bar">
          <p className="result__action-note">
            Analysis complete — review scores above for {candidate.name}
          </p>
          <div className="result__action-btns">
            <button
              className="btn btn-outline"
              onClick={() => navigate("resume-upload")}
            >
              ↩ Analyze Again
            </button>
            {/* "View Overall Report" → Scan History */}
            <button
              className="btn btn-primary"
              onClick={() => navigate("scan-history")}
            >
              View Overall Report →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

/*
 * ═══════════════════════════════════════════════════════════════
 *  ResumeUpload.jsx
 *  Placeholder page — not your module
 * ───────────────────────────────────────────────────────────────
 *  CSS:       ./ResumeUpload.css
 *  Sidebar:   ./Sidebar.jsx  →  active="resume-upload"
 *  Connected: App.jsx  (screen="resume-upload")
 *
 *  When this module is built by the team, they should:
 *    1. Call setAnalysisData({ score, summary, breakdown })
 *    2. Call navigate("result")
 *  Both props are passed from App.jsx
 * ═══════════════════════════════════════════════════════════════
 */

import Sidebar from "./Sidebar";
import "./ResumeUpload.css";

export default function ResumeUpload({ navigate, user, setAnalysisData }) {
  return (
    <div className="page-wrapper">
      {/* Sidebar — active page = resume-upload */}
      <Sidebar active="resume-upload" navigate={navigate} user={user} />

      <div className="main-content">
        <div className="ru__placeholder">
          <div className="ru__icon">📄</div>
          <h2 className="ru__title">Resume Upload</h2>
          <p className="ru__desc">
            This page belongs to another team member.<br />
            It will allow uploading a resume PDF and a job description,
            then compute an AI match score and pass results to Result &amp; Analyze.
          </p>
          {/* Demo button — simulates a completed upload for testing Result page */}
          <button
            className="btn btn-primary"
            onClick={() => {
              if (setAnalysisData) {
                setAnalysisData({
                  candidates: [
                    {
                      id: 1, name: "Candidate 1", score: 92,
                      summary: "Excellent match for the role.",
                      breakdown: [
                        { label: "Skill Match", pct: 95 },
                        { label: "Experience",  pct: 90 },
                        { label: "Education",   pct: 88 },
                        { label: "Key Words",   pct: 94 },
                        { label: "Overall",     pct: 92 },
                      ],
                    },
                  ],
                });
              }
              navigate("result");
            }}
          >
            Simulate Upload &amp; Go to Result →
          </button>
        </div>
      </div>
    </div>
  );
}

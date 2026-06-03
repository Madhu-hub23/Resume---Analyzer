import { useState } from "react";
import "./ResumeUpload.css";
import Sidebar from "./Sidebar";
import { MdDescription } from "react-icons/md";
import { BsFileEarmarkArrowDownFill } from "react-icons/bs";

function ResumeUpload({ navigate, user, setUser, theme, setTheme, analysisData, setAnalysisData }) {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [score, setScore] = useState(null);
  const [skills, setSkills] = useState("");
  const [suggestions, setSuggestions] = useState("");

  return (
    <div className="page-wrapper">
      <Sidebar active="resume-upload" navigate={navigate} user={user} />

      {/* Main Content */}
      <div className="main-content upload-container">
        
        <div className="upload-header-section">
          <h1 className="upload-title">Welcome, {user?.name || "Harini"}!</h1>
          <p className="upload-subtitle">
            Upload your resume and job description to analyze your match
          </p>
        </div>

        <div className="upload-box">
          {/* Resume Upload Section */}
          <div className="section-header">
            <MdDescription className="section-icon" size={28} />
            <div className="section-text">
              <h2>Upload Resume</h2>
              <p>Upload your resume in PDF/DOCX format</p>
            </div>
          </div>

          <div className="drop-area">
            <BsFileEarmarkArrowDownFill color="#3563d8" size={48} />
            <h2>Drag & Drop Resume Here</h2>
            <h3>or</h3>

            <input
              type="file"
              id="resume-upload"
              hidden
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files[0])}
            />

            <label htmlFor="resume-upload" className="browse-btn">
              Browse Files
            </label>

            {resume && (
              <p className="selected-file-text">
                Selected File: {resume.name}
              </p>
            )}
          </div>

          {/* Job Description Section */}
          <div className="section-header" style={{ marginTop: "32px" }}>
            <MdDescription className="section-icon" size={28} />
            <div className="section-text">
              <h2>Job Description</h2>
              <p>Paste your job description here to compare with resume</p>
            </div>
          </div>

          <textarea
            className="job-textarea"
            placeholder="Paste job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <button
            className="analyze-btn"
            onClick={async () => {
              if (!resume) {
                alert("Please select a resume");
                return;
              }

              try {
                const response = await fetch(
                  "http://localhost:5000/analyze-resume",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      resumeId: 2,
                      jobDescription: jobDescription,
                    }),
                  }
                );

               const data = await response.json();

setAnalysisData({
  score: data.score,
  skillsFound: data.skillsFound,
  suggestions: data.suggestions,
});

navigate("result");

              } catch (error) {
                console.error(error);
                alert("Error analyzing resume");
              }
            }}
          >
            Analyze Resume
          </button>

          {score && (
            <div className="result-box">
              <h2>Analysis Result</h2>
              <p>
                <strong>Match Score:</strong> {score}%
              </p>
              <p>
                <strong>Skills Found:</strong> {skills}
              </p>
              <p>
                <strong>Suggestions:</strong> {suggestions}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeUpload;
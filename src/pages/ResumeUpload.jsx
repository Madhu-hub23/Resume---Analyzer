import { useState } from "react";
import "./ResumeUpload.css";
import { MdDescription } from "react-icons/md";
import { BsFileEarmarkArrowDownFill } from "react-icons/bs";

function ResumeUpload() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [score, setScore] = useState(null);
  const [skills, setSkills] = useState("");
  const [suggestions, setSuggestions] = useState("");

  return (
    <div className="upload-page">
      <h1>Welcome, Harini!</h1>

      <p>
        Upload your resume and job description
        to analyze your match
      </p>

      <div className="upload-box">
        <div className="upload-header">
          <MdDescription
            className="upload-icon"
            size={52}
          />

          <div className="upload-text">
            <h2>Upload Resume</h2>
            <p>Upload your resume in PDF/DOCX format</p>
          </div>
        </div>

        <div className="drop-area">
          <BsFileEarmarkArrowDownFill
            color="#3563d8"
            size={70}
          />

          <h2>Drag & Drop Resume Here</h2>
          <h3>or</h3>

          <input
            type="file"
            id="resume-upload"
            hidden
            accept=".pdf,.doc,.docx"
            onChange={(e) =>
              setResume(e.target.files[0])
            }
          />

          <label
            htmlFor="resume-upload"
            className="browse-btn"
          >
            Browse Files
          </label>

          {resume && (
            <p
              style={{
                marginTop: "15px",
                fontWeight: "600",
              }}
            >
              Selected File: {resume.name}
            </p>
          )}
        </div>

        <div className="upload-box2">
          <div className="job-header">
            <MdDescription className="job-icon" />

            <div className="job-text">
              <h2>Job Description</h2>
              <p>
                Paste your job description here to compare
                with resume
              </p>
            </div>
          </div>
        </div>

        <textarea
          placeholder="Paste job description here..."
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(e.target.value)
          }
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

              setScore(data.score);
              setSkills(data.skillsFound);
              setSuggestions(data.suggestions);

              console.log("Resume:", resume.name);
              console.log(
                "Job Description:",
                jobDescription
              );
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
  );
}

export default ResumeUpload;
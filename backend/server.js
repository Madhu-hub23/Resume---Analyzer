const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");

// Enable CORS
app.use(cors());

// Enable JSON
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// Get All Users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

// Add User
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json({
          message: "User Added Successfully",
          id: result.insertId,
        });
      }
    }
  );
});

// Upload Resume
app.post("/upload-resume", (req, res) => {
  console.log("Upload API Hit");
  console.log(req.body);

  const { fileName } = req.body;

  db.query(
    "INSERT INTO resumes (user_id, file_name) VALUES (?, ?)",
    [1, fileName],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json(err);
      } else {
        res.json({
          message: "Resume Saved Successfully",
          id: result.insertId,
        });
      }
    }
  );
});
app.post("/analyze-resume", (req, res) => {
  const { resumeId, jobDescription } = req.body;

  // Dummy Analysis
  const score = 85;
  const skillsFound = jobDescription;
  const suggestions =
    "Add more projects, certifications, and internship experience.";

  db.query(
    `INSERT INTO analysis_results
    (resume_id, score, skills_found, suggestions)
    VALUES (?, ?, ?, ?)`,
    [resumeId, score, skillsFound, suggestions],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json(err);
      } else {
        res.json({
          score,
          skillsFound,
          suggestions,
        });
      }
    }
  );
});
app.post("/analyze-resume", (req, res) => {
  // analysis code
});
// Upload Resume
app.post("/upload-resume", (req, res) => {
  // your code
});

// Dashboard Stats API
app.get("/dashboard-stats", (req, res) => {
  db.query(
    `
    SELECT
      (SELECT COUNT(*) FROM resumes) AS totalResumes,
      (SELECT COUNT(*) FROM analysis_results) AS totalAnalyses,
      (SELECT AVG(score) FROM analysis_results) AS averageScore
    `,
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result[0]);
      }
    }
  );
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
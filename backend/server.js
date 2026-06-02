const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Resume Analyzer Backend Running");
});

// ==================== USERS ====================

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

// ==================== RESUME UPLOAD ====================

app.post("/upload-resume", (req, res) => {
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

// ==================== RESUME ANALYSIS ====================

app.post("/analyze-resume", (req, res) => {
  const { resumeId, jobDescription } = req.body;

  let score = 50;
  let skills = [];
  let suggestions = [];

  const text = jobDescription.toLowerCase();
v
  // Skill Detection
  if (text.includes("html")) {
    skills.push("HTML");
    score += 10;
  }

  if (text.includes("css")) {
    skills.push("CSS");
    score += 10;
  }

  if (text.includes("javascript") || text.includes("js")) {
    skills.push("JavaScript");
    score += 10;
  }

  if (text.includes("react")) {
    skills.push("React");
    score += 10;
  }

  if (text.includes("python")) {
    skills.push("Python");
    score += 10;
  }

  if (text.includes("sql")) {
    skills.push("SQL");
    score += 10;
  }

  // Suggestions
  if (!text.includes("project")) {
    suggestions.push("Add more projects");
  }

  if (!text.includes("internship")) {
    suggestions.push("Add internship experience");
  }

  if (!text.includes("certification")) {
    suggestions.push("Add certifications");
  }

  score = Math.min(score, 100);

  const skillsFound = skills.join(", ");
  const suggestionText = suggestions.join(", ");

  db.query(
    `INSERT INTO analysis_results
    (resume_id, score, skills_found, suggestions)
    VALUES (?, ?, ?, ?)`,
    [resumeId, score, skillsFound, suggestionText],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).json(err);
      } else {
        res.json({
          score,
          skillsFound,
          suggestions: suggestionText,
        });
      }
    }
  );
});

// ==================== ANALYSIS HISTORY ====================

app.get("/analysis-history", (req, res) => {
  db.query(
    "SELECT * FROM analysis_results ORDER BY id DESC",
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
});

// ==================== DASHBOARD STATS ====================

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

// ==================== START SERVER ====================

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
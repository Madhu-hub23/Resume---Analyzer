const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "P25DS010",
  database: "resume_analyzer",
});

db.connect((err) => {
  if (err) {
    console.log("Connection Failed");
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;
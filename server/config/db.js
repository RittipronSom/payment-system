const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // XAMPP ปกติไม่มีรหัส
  database: "payment_db"
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB Error:", err);
  } else {
    console.log("✅ Connected to MySQL (XAMPP)");
  }
});

module.exports = db;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize SQLite database
const db = new sqlite3.Database(":memory:");

// Create transactions table
db.serialize(() => {
  db.run(`
    CREATE TABLE transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      amount REAL,
      description TEXT,
      date TEXT,
      balance REAL
    )
  `);
});

// API Endpoints
app.get("/transactions", (req, res) => {
  db.all("SELECT * FROM transactions", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ transactions: rows });
  });
});

app.post("/transactions", (req, res) => {
  const { type, amount, description } = req.body;
  const date = new Date().toISOString().split("T")[0];

  db.get(
    "SELECT balance FROM transactions ORDER BY id DESC LIMIT 1",
    (err, row) => {
      let balance = row ? row.balance : 0;
      balance = type === "credit" ? balance + amount : balance - amount;

      db.run(
        `INSERT INTO transactions (type, amount, description, date, balance) VALUES (?, ?, ?, ?, ?)`,
        [type, amount, description, date, balance],
        function (err) {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json({ id: this.lastID });
        }
      );
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "taskflow",
  password: "postgres",
  port: 5432,
});

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashed]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json("User not found");
    }

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json("Invalid password");
    }

    const token = jwt.sign({ id: user.id }, "secret");

    res.json({ token });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

app.listen(3002, () => {
  console.log("Server running on port 3002");
});
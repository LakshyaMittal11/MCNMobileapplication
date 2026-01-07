import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 Serve frontend files (index.html, css, js)
app.use(express.static(__dirname));

// 🔹 In-memory leaderboard
let leaderboard = [];

/* 🔹 Fetch Questions (Proxy API) */
app.get("/api/questions", async (req, res) => {
  const { amount = 5, category, difficulty } = req.query;

  let url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
  if (category) url += `&category=${category}`;
  if (difficulty) url += `&difficulty=${difficulty}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch questions" });
  }
});

/* 🔹 Save Score */
app.post("/api/score", (req, res) => {
  const { name, score } = req.body;
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);
  res.json({ message: "Score saved" });
});

/* 🔹 Get Leaderboard */
app.get("/api/leaderboard", (req, res) => {
  res.json(leaderboard.slice(0, 10));
});

// 🔹 Default route (open app)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(5000, () => {
  console.log("✅ App running at http://localhost:5000");
});

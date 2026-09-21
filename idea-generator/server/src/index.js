import express from "express";
import cors from "cors";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { QUESTIONS } from "./data/questions.js";
import { generateTopIdeas } from "./scoring.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ideas = JSON.parse(readFileSync(join(__dirname, "data", "ideas.json"), "utf-8"));

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/api/questions", (req, res) => {
  res.json({ questions: QUESTIONS });
});

app.post("/api/generate-ideas", (req, res) => {
  const answers = req.body || {};

  if (!answers.category) {
    return res.status(400).json({ error: "Missing required answer: category" });
  }

  const results = generateTopIdeas(ideas, answers, 5);
  const withoutSteps = results.map(({ steps, ...rest }) => rest);
  res.json({ results: withoutSteps });
});

app.get("/api/ideas/:id", (req, res) => {
  const idea = ideas.find((i) => i.id === req.params.id);
  if (!idea) return res.status(404).json({ error: "Idea not found" });
  res.json({ idea });
});

app.listen(PORT, () => {
  console.log(`Idea Generator API listening on port ${PORT}`);
});

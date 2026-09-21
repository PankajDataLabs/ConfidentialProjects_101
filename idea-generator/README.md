# Idea Generator

A web app that helps you find and execute your next idea:

1. **Checklist** — answer 10 quick questions about your goals, time, budget, skill level, risk tolerance, and interests.
2. **Search & score** — the backend matches your answers against a curated database of ideas across 7 categories (business, tech, creative, health, learning, social impact, home/DIY) and scores each one.
3. **Top 5 results** — see the best-fit ideas, sorted from best to worst, each with a score out of 100 and the reasons it matched you.
4. **Decide** — pick an idea and confirm whether you want to move forward.
   - **Yes** → get a step-by-step execution plan.
   - **No** → go back and pick a different idea, or start over.

## Project structure

```
idea-generator/
  server/   Express API: questions, scoring engine, idea database
  client/   React (Vite) frontend
```

## Running locally

**1. Start the backend** (port 4000):

```bash
cd server
npm install
npm start
```

**2. Start the frontend** (port 5173, proxies /api to the backend):

```bash
cd client
npm install
npm run dev
```

Then open http://localhost:5173.

## How scoring works

Each idea in `server/src/data/ideas.json` has attributes (category, goals, time
commitment, budget, team size, skill level, risk tolerance, timeframe, mode,
and tags). `server/src/scoring.js` compares your answers against every idea
using a weighted match across those dimensions plus a keyword-overlap bonus,
producing a 0-100 score and a short list of reasons why it matched. The top 5
scoring ideas are returned, sorted best to worst.

This is an offline heuristic engine (no external APIs or keys required) —
extend `ideas.json` with more entries to widen the pool of suggestions.

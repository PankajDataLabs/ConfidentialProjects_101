const LEVELS = {
  timeCommitment: ["low", "medium", "high", "full"],
  budget: ["none", "low", "medium", "high"],
  skillLevel: ["beginner", "intermediate", "advanced"],
  riskTolerance: ["low", "medium", "high"],
  timeframe: ["quick", "short", "medium", "long"],
};

function ordinalDistanceScore(scale, userValue, ideaValue, maxPoints) {
  const levels = LEVELS[scale];
  const userIdx = levels.indexOf(userValue);
  const ideaIdx = levels.indexOf(ideaValue);
  if (userIdx === -1 || ideaIdx === -1) return { points: maxPoints / 2, matched: false };
  const diff = Math.abs(userIdx - ideaIdx);
  const step = maxPoints / (levels.length - 1);
  const points = Math.max(0, maxPoints - diff * step);
  return { points, matched: diff === 0 };
}

function skillScore(userSkill, ideaSkill, maxPoints) {
  const levels = LEVELS.skillLevel;
  const userIdx = levels.indexOf(userSkill);
  const ideaIdx = levels.indexOf(ideaSkill);
  if (userIdx === -1 || ideaIdx === -1) return { points: maxPoints / 2, matched: false };
  const diff = ideaIdx - userIdx;
  if (diff <= 0) return { points: maxPoints, matched: true };
  if (diff === 1) return { points: maxPoints * 0.5, matched: false };
  return { points: 0, matched: false };
}

function tokenize(text) {
  return (text || "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2);
}

const WEIGHTS = {
  category: 20,
  goal: 15,
  timeCommitment: 15,
  budget: 15,
  teamSize: 10,
  skillLevel: 10,
  riskTolerance: 10,
  timeframe: 10,
  mode: 5,
  keywords: 10,
};

const MAX_SCORE = Object.values(WEIGHTS).reduce((a, b) => a + b, 0);

function scoreIdea(idea, answers) {
  let raw = 0;
  const reasons = [];

  if (answers.category && idea.category === answers.category) {
    raw += WEIGHTS.category;
    reasons.push(`Matches your chosen category (${idea.category}).`);
  }

  if (Array.isArray(answers.goals) && answers.goals.length) {
    const overlap = idea.goals.filter((g) => answers.goals.includes(g));
    if (overlap.length) {
      raw += WEIGHTS.goal;
      reasons.push(`Aligns with your goal of "${overlap[0].replace("_", " ")}".`);
    }
  }

  const time = ordinalDistanceScore("timeCommitment", answers.timeCommitment, idea.timeCommitment, WEIGHTS.timeCommitment);
  raw += time.points;
  if (time.matched) reasons.push(`Fits your available time commitment (${idea.timeCommitment}).`);

  const budget = ordinalDistanceScore("budget", answers.budget, idea.budget, WEIGHTS.budget);
  raw += budget.points;
  if (budget.matched) reasons.push(`Fits your budget range (${idea.budget}).`);

  if (answers.teamSize) {
    if (idea.teamSize === "either" || answers.teamSize === "either" || idea.teamSize === answers.teamSize) {
      raw += WEIGHTS.teamSize;
      reasons.push(`Works for your preferred way of working (${answers.teamSize}).`);
    }
  }

  const skill = skillScore(answers.skillLevel, idea.skillLevel, WEIGHTS.skillLevel);
  raw += skill.points;
  if (skill.matched) reasons.push(`Matches your current skill level (${answers.skillLevel}).`);

  const risk = ordinalDistanceScore("riskTolerance", answers.riskTolerance, idea.riskTolerance, WEIGHTS.riskTolerance);
  raw += risk.points;
  if (risk.matched) reasons.push(`Matches your risk tolerance (${idea.riskTolerance}).`);

  const timeframe = ordinalDistanceScore("timeframe", answers.timeframe, idea.timeframe, WEIGHTS.timeframe);
  raw += timeframe.points;
  if (timeframe.matched) reasons.push(`Matches the timeframe you're looking for (${idea.timeframe}).`);

  if (answers.mode) {
    if (idea.mode === "either" || answers.mode === "either" || idea.mode === answers.mode) {
      raw += WEIGHTS.mode;
    }
  }

  if (answers.interests) {
    const interestTokens = new Set(tokenize(answers.interests));
    const ideaTokens = new Set([
      ...idea.tags.flatMap(tokenize),
      ...tokenize(idea.title),
      ...tokenize(idea.description),
    ]);
    let matches = 0;
    for (const token of interestTokens) {
      if (ideaTokens.has(token)) matches += 1;
    }
    if (matches > 0) {
      const points = Math.min(WEIGHTS.keywords, matches * 3.5);
      raw += points;
      reasons.push(`Relates to keywords you mentioned ("${answers.interests}").`);
    }
  }

  const score = Math.round((raw / MAX_SCORE) * 100);
  return { score, reasons: reasons.slice(0, 4) };
}

function generateTopIdeas(ideas, answers, limit = 5) {
  const scored = ideas.map((idea) => {
    const { score, reasons } = scoreIdea(idea, answers);
    return { ...idea, score, matchReasons: reasons };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}

export { scoreIdea, generateTopIdeas, MAX_SCORE };

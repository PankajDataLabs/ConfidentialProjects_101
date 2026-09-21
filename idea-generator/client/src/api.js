const BASE = "/api";

export async function fetchQuestions() {
  const res = await fetch(`${BASE}/questions`);
  if (!res.ok) throw new Error("Failed to load questions");
  const data = await res.json();
  return data.questions;
}

export async function generateIdeas(answers) {
  const res = await fetch(`${BASE}/generate-ideas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answers),
  });
  if (!res.ok) throw new Error("Failed to generate ideas");
  const data = await res.json();
  return data.results;
}

export async function fetchIdea(id) {
  const res = await fetch(`${BASE}/ideas/${id}`);
  if (!res.ok) throw new Error("Failed to load idea");
  const data = await res.json();
  return data.idea;
}

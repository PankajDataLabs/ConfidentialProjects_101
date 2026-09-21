export const QUESTIONS = [
  {
    id: "category",
    text: "Which area are you most interested in exploring?",
    type: "single",
    options: [
      { value: "business", label: "Business & Side Hustle" },
      { value: "tech", label: "Tech & Software" },
      { value: "creative", label: "Creative & Content" },
      { value: "health", label: "Health & Fitness" },
      { value: "learning", label: "Learning & Skill-Building" },
      { value: "social", label: "Social Impact & Community" },
      { value: "home", label: "Home & DIY" },
    ],
  },
  {
    id: "goals",
    text: "What's your main goal? (choose up to 2)",
    type: "multi",
    maxSelect: 2,
    options: [
      { value: "money", label: "Make money" },
      { value: "learn", label: "Learn a new skill" },
      { value: "hobby", label: "Have fun / hobby" },
      { value: "solve_problem", label: "Solve a personal problem" },
      { value: "impact", label: "Help others / social impact" },
    ],
  },
  {
    id: "timeCommitment",
    text: "How much time can you realistically commit per week?",
    type: "single",
    options: [
      { value: "low", label: "Under 2 hours" },
      { value: "medium", label: "2-5 hours" },
      { value: "high", label: "5-10 hours" },
      { value: "full", label: "10+ hours (near full-time)" },
    ],
  },
  {
    id: "budget",
    text: "What's your budget to get started?",
    type: "single",
    options: [
      { value: "none", label: "$0-50" },
      { value: "low", label: "$50-500" },
      { value: "medium", label: "$500-5,000" },
      { value: "high", label: "$5,000+" },
    ],
  },
  {
    id: "teamSize",
    text: "Do you want to work solo or with others?",
    type: "single",
    options: [
      { value: "solo", label: "Solo" },
      { value: "team", label: "With a team / partner" },
      { value: "either", label: "No preference" },
    ],
  },
  {
    id: "skillLevel",
    text: "What's your experience level in this area?",
    type: "single",
    options: [
      { value: "beginner", label: "Beginner" },
      { value: "intermediate", label: "Intermediate" },
      { value: "advanced", label: "Advanced" },
    ],
  },
  {
    id: "riskTolerance",
    text: "How much risk are you comfortable with?",
    type: "single",
    options: [
      { value: "low", label: "Low - I want something safe and proven" },
      { value: "medium", label: "Medium - some uncertainty is fine" },
      { value: "high", label: "High - I'm happy to experiment" },
    ],
  },
  {
    id: "timeframe",
    text: "What timeframe are you hoping to see results in?",
    type: "single",
    options: [
      { value: "quick", label: "Days to a few weeks (quick win)" },
      { value: "short", label: "1-3 months" },
      { value: "medium", label: "6-12 months" },
      { value: "long", label: "1+ years (long-term)" },
    ],
  },
  {
    id: "mode",
    text: "Do you prefer digital/online work or physical/hands-on activities?",
    type: "single",
    options: [
      { value: "digital", label: "Digital / online" },
      { value: "physical", label: "Physical / hands-on" },
      { value: "either", label: "No preference" },
    ],
  },
  {
    id: "interests",
    text: "Any specific interests, hobbies, or keywords you'd like your idea to relate to? (optional)",
    type: "text",
    optional: true,
  },
];

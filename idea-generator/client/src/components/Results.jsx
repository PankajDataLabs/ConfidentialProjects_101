const CATEGORY_LABELS = {
  business: "Business & Side Hustle",
  tech: "Tech & Software",
  creative: "Creative & Content",
  health: "Health & Fitness",
  learning: "Learning & Skill-Building",
  social: "Social Impact & Community",
  home: "Home & DIY",
};

export default function Results({ results, onSelect, onRestart }) {
  return (
    <div className="screen results-screen">
      <h2>Your Top 5 Ideas</h2>
      <p className="subtitle">
        Ranked from best to worst fit based on your answers.
      </p>

      <div className="results-list">
        {results.map((idea, index) => (
          <div className="idea-card" key={idea.id}>
            <div className="idea-card-header">
              <span className="rank-badge">#{index + 1}</span>
              <span className="score-badge">{idea.score}/100</span>
            </div>
            <h3>{idea.title}</h3>
            <span className="category-pill">{CATEGORY_LABELS[idea.category] || idea.category}</span>
            <p className="idea-desc">{idea.description}</p>
            {idea.matchReasons?.length > 0 && (
              <ul className="reasons-list">
                {idea.matchReasons.map((reason, i) => (
                  <li key={i}>{reason}</li>
                ))}
              </ul>
            )}
            <button className="btn btn-primary" onClick={() => onSelect(idea)}>
              Choose This Idea
            </button>
          </div>
        ))}
      </div>

      <button className="btn btn-secondary" onClick={onRestart}>
        Start Over
      </button>
    </div>
  );
}

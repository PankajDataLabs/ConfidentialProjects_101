export default function Confirm({ idea, onYes, onNo }) {
  return (
    <div className="screen confirm-screen">
      <h2>Move forward with this idea?</h2>
      <div className="idea-card highlight">
        <div className="idea-card-header">
          <span className="score-badge">{idea.score}/100</span>
        </div>
        <h3>{idea.title}</h3>
        <p className="idea-desc">{idea.description}</p>
      </div>
      <p className="subtitle">
        If you say yes, we'll give you a step-by-step plan to execute it.
      </p>
      <div className="nav-row">
        <button className="btn btn-secondary" onClick={onNo}>
          No, go back
        </button>
        <button className="btn btn-primary" onClick={onYes}>
          Yes, let's go
        </button>
      </div>
    </div>
  );
}

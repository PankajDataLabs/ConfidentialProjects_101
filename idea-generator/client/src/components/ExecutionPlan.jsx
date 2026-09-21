export default function ExecutionPlan({ idea, onRestart }) {
  return (
    <div className="screen plan-screen">
      <h2>Step-by-Step Plan</h2>
      <h3 className="plan-title">{idea.title}</h3>
      <p className="idea-desc">{idea.description}</p>

      <ol className="steps-list">
        {idea.steps.map((step, i) => (
          <li key={i}>
            <span className="step-number">{i + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      <button className="btn btn-primary" onClick={onRestart}>
        Back to Home
      </button>
    </div>
  );
}

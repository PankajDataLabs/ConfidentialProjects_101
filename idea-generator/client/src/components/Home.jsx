export default function Home({ onStart }) {
  return (
    <div className="screen home-screen">
      <div className="home-icon">💡</div>
      <h1>Idea Generator</h1>
      <p className="subtitle">
        Answer a short checklist about your preferences and we'll research and
        score the best-fit ideas for you — then walk you through executing
        the one you pick.
      </p>
      <button className="btn btn-primary btn-large" onClick={onStart}>
        Get Started
      </button>
    </div>
  );
}

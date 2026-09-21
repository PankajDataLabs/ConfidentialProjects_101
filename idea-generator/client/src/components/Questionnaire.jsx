import { useState } from "react";

export default function Questionnaire({ questions, onComplete, onCancel }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ goals: [] });

  const question = questions[step];
  const isLast = step === questions.length - 1;

  function currentValue() {
    return answers[question.id];
  }

  function selectSingle(value) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function toggleMulti(value) {
    setAnswers((prev) => {
      const existing = prev[question.id] || [];
      let next;
      if (existing.includes(value)) {
        next = existing.filter((v) => v !== value);
      } else {
        if (question.maxSelect && existing.length >= question.maxSelect) {
          next = [...existing.slice(1), value];
        } else {
          next = [...existing, value];
        }
      }
      return { ...prev, [question.id]: next };
    });
  }

  function setText(value) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function canAdvance() {
    if (question.optional) return true;
    const value = currentValue();
    if (question.type === "multi") return Array.isArray(value) && value.length > 0;
    return value !== undefined && value !== "";
  }

  function next() {
    if (isLast) {
      onComplete(answers);
    } else {
      setStep((s) => s + 1);
    }
  }

  function back() {
    if (step === 0) {
      onCancel();
    } else {
      setStep((s) => s - 1);
    }
  }

  const progressPct = Math.round(((step + 1) / questions.length) * 100);

  return (
    <div className="screen questionnaire-screen">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progressPct}%` }} />
      </div>
      <p className="step-count">
        Question {step + 1} of {questions.length}
      </p>
      <h2>{question.text}</h2>

      {question.type === "single" && (
        <div className="options-grid">
          {question.options.map((opt) => (
            <button
              key={opt.value}
              className={`option-btn ${currentValue() === opt.value ? "selected" : ""}`}
              onClick={() => selectSingle(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {question.type === "multi" && (
        <div className="options-grid">
          {question.options.map((opt) => {
            const selected = (currentValue() || []).includes(opt.value);
            return (
              <button
                key={opt.value}
                className={`option-btn ${selected ? "selected" : ""}`}
                onClick={() => toggleMulti(opt.value)}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}

      {question.type === "text" && (
        <input
          className="text-input"
          type="text"
          placeholder="e.g. cooking, woodworking, AI, travel..."
          value={currentValue() || ""}
          onChange={(e) => setText(e.target.value)}
        />
      )}

      <div className="nav-row">
        <button className="btn btn-secondary" onClick={back}>
          Back
        </button>
        <button className="btn btn-primary" onClick={next} disabled={!canAdvance()}>
          {isLast ? "Generate Ideas" : "Next"}
        </button>
      </div>
    </div>
  );
}

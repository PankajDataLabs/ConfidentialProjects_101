import { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Questionnaire from "./components/Questionnaire";
import Results from "./components/Results";
import Confirm from "./components/Confirm";
import ExecutionPlan from "./components/ExecutionPlan";
import { fetchQuestions, generateIdeas, fetchIdea } from "./api";

const SCREENS = {
  HOME: "home",
  QUESTIONNAIRE: "questionnaire",
  LOADING: "loading",
  RESULTS: "results",
  CONFIRM: "confirm",
  PLAN: "plan",
};

function reset() {
  return {
    screen: SCREENS.HOME,
    questions: [],
    results: [],
    selectedIdea: null,
    fullIdea: null,
    error: null,
  };
}

export default function App() {
  const [state, setState] = useState(reset);

  useEffect(() => {
    fetchQuestions()
      .then((questions) => setState((s) => ({ ...s, questions })))
      .catch((err) => setState((s) => ({ ...s, error: err.message })));
  }, []);

  function startQuestionnaire() {
    setState((s) => ({ ...s, screen: SCREENS.QUESTIONNAIRE }));
  }

  async function handleAnswersComplete(answers) {
    setState((s) => ({ ...s, screen: SCREENS.LOADING }));
    try {
      const [results] = await Promise.all([
        generateIdeas(answers),
        new Promise((resolve) => setTimeout(resolve, 700)),
      ]);
      setState((s) => ({ ...s, results, screen: SCREENS.RESULTS }));
    } catch (err) {
      setState((s) => ({ ...s, error: err.message, screen: SCREENS.HOME }));
    }
  }

  function handleSelectIdea(idea) {
    setState((s) => ({ ...s, selectedIdea: idea, screen: SCREENS.CONFIRM }));
  }

  async function handleConfirmYes() {
    try {
      const fullIdea = await fetchIdea(state.selectedIdea.id);
      setState((s) => ({ ...s, fullIdea, screen: SCREENS.PLAN }));
    } catch (err) {
      setState((s) => ({ ...s, error: err.message }));
    }
  }

  function handleConfirmNo() {
    setState((s) => ({ ...s, selectedIdea: null, screen: SCREENS.RESULTS }));
  }

  function handleRestart() {
    setState((s) => ({ ...reset(), questions: s.questions }));
  }

  return (
    <div className="app-shell">
      {state.error && <div className="error-banner">{state.error}</div>}

      {state.screen === SCREENS.HOME && <Home onStart={startQuestionnaire} />}

      {state.screen === SCREENS.QUESTIONNAIRE && state.questions.length > 0 && (
        <Questionnaire
          questions={state.questions}
          onComplete={handleAnswersComplete}
          onCancel={handleRestart}
        />
      )}

      {state.screen === SCREENS.LOADING && (
        <div className="screen loading-screen">
          <div className="spinner" />
          <p>Searching for the best ideas that match your preferences...</p>
        </div>
      )}

      {state.screen === SCREENS.RESULTS && (
        <Results
          results={state.results}
          onSelect={handleSelectIdea}
          onRestart={handleRestart}
        />
      )}

      {state.screen === SCREENS.CONFIRM && state.selectedIdea && (
        <Confirm idea={state.selectedIdea} onYes={handleConfirmYes} onNo={handleConfirmNo} />
      )}

      {state.screen === SCREENS.PLAN && state.fullIdea && (
        <ExecutionPlan idea={state.fullIdea} onRestart={handleRestart} />
      )}
    </div>
  );
}

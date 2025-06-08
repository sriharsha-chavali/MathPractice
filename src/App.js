import React, { useState, useRef, useEffect } from "react";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
  const num1 = getRandomInt(1, 9);
  const num2 = getRandomInt(0, num1);
  return { num1, num2 };
}

const QUESTIONS_PER_SET = 20;

export default function SubtractionGame() {
  const [problem, setProblem] = useState(generateProblem());
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState({ right: 0, wrong: 0 });
  const [questionNumber, setQuestionNumber] = useState(1);
  const [setFinished, setSetFinished] = useState(false);
  const inputRef = useRef(null);

  // Focus the input whenever a new problem is loaded
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [problem, setFinished]);

  const renderGraphics = (count) => (
    <span style={{ fontSize: "2rem" }}>{"🐹".repeat(count)}</span>
  );

  const nextQuestion = () => {
    if (questionNumber < QUESTIONS_PER_SET) {
      setProblem(generateProblem());
      setUserAnswer("");
      setFeedback("");
      setQuestionNumber(q => q + 1);
    } else {
      setSetFinished(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctAnswer = problem.num1 - problem.num2;
    if (parseInt(userAnswer, 10) === correctAnswer) {
      setFeedback("🎉 Correct! Great job!");
      setScore(s => ({ ...s, right: s.right + 1 }));
    } else {
      setFeedback("❌ Oops! Try again.");
      setScore(s => ({ ...s, wrong: s.wrong + 1 }));
    }
    setTimeout(nextQuestion, 1200);
  };

  const handleRestart = () => {
    setScore({ right: 0, wrong: 0 });
    setQuestionNumber(1);
    setSetFinished(false);
    setProblem(generateProblem());
    setUserAnswer("");
    setFeedback("");
  };

  if (setFinished) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Set Finished!</h2>
        <div style={{ fontSize: "1.5rem", margin: "1rem" }}>
          You got <span style={{ color: "green" }}>{score.right}</span> right and <span style={{ color: "red" }}>{score.wrong}</span> wrong out of {QUESTIONS_PER_SET} questions.
        </div>
        <button
          onClick={handleRestart}
          style={{ fontSize: "1.2rem", marginTop: "1rem" }}
        >
          Start New Set
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Subtraction Practice</h2>
      <div style={{ marginBottom: "1rem" }}>
        <div>
          Question: {questionNumber} / {QUESTIONS_PER_SET}
        </div>
        <div>
          Correct: <span style={{ color: "green" }}>{score.right}</span> | 
          Wrong: <span style={{ color: "red" }}>{score.wrong}</span>
        </div>
      </div>
      <div>
        {renderGraphics(problem.num1)}
        <div style={{ fontSize: "1.5rem", margin: "1rem" }}>
          - {renderGraphics(problem.num2)}
        </div>
        <div style={{ fontSize: "2rem", margin: "1rem" }}>
          {problem.num1} - {problem.num2} = ?
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="number"
          min="0"
          max="9"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          style={{ fontSize: "1.2rem", width: "3rem", textAlign: "center" }}
          disabled={!!feedback}
        />
        <button 
          type="submit" 
          style={{ fontSize: "1.2rem", marginLeft: "1rem" }}
          disabled={!!feedback}
        >
          Check
        </button>
      </form>
      <div style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
        {feedback}
      </div>
    </div>
  );
}

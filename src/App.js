import React, { useState, useRef, useEffect } from "react";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem(operation) {
  const num1 = 6;
  if (operation === "subtraction") {
    const num2 = getRandomInt(0, num1);
    return { num1, num2 };
  } else {
    // addition: both addends between 0 and 6, sum <= 6
    const num2 = getRandomInt(0, num1);
    const num1_add = getRandomInt(0, num1 - num2);
    return { num1: num1_add, num2 };
  }
}

const QUESTIONS_PER_SET = 20;

export default function MathGame() {
  const [operation, setOperation] = useState("subtraction");
  const [problem, setProblem] = useState(generateProblem("subtraction"));
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState({ right: 0, wrong: 0 });
  const [questionNumber, setQuestionNumber] = useState(1);
  const [setFinished, setSetFinished] = useState(false);
  const [questionTime, setQuestionTime] = useState(0);
  const timerId = useRef(null);
  const inputRef = useRef(null);

  // Timer and input focus management
  useEffect(() => {
    setQuestionTime(0);
    if (timerId.current) clearInterval(timerId.current);

    if (!setFinished) {
      timerId.current = setInterval(() => {
        setQuestionTime((t) => t + 1);
      }, 1000);
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }

    return () => clearInterval(timerId.current);
  }, [problem, setFinished]);

  // When operation changes, reset everything
  useEffect(() => {
    setProblem(generateProblem(operation));
    setUserAnswer("");
    setFeedback("");
    setScore({ right: 0, wrong: 0 });
    setQuestionNumber(1);
    setSetFinished(false);
    setQuestionTime(0);
  }, [operation]);

  const nextQuestion = () => {
    if (questionNumber < QUESTIONS_PER_SET) {
      setProblem(generateProblem(operation));
      setUserAnswer("");
      setFeedback("");
      setQuestionNumber(q => q + 1);
    } else {
      setSetFinished(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearInterval(timerId.current);
    let correctAnswer;
    if (operation === "subtraction") {
      correctAnswer = problem.num1 - problem.num2;
    } else {
      correctAnswer = problem.num1 + problem.num2;
    }

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
    setProblem(generateProblem(operation));
    setUserAnswer("");
    setFeedback("");
    setQuestionTime(0);
  };

  // Breadcrumb navigation UI
  const breadcrumbStyle = (op) => ({
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontWeight: operation === op ? "bold" : "normal",
    color: operation === op ? "#fff" : "#007bff",
    background: operation === op ? "#007bff" : "transparent",
    borderRadius: "1rem",
    marginRight: "0.5rem",
    border: "none",
    outline: "none",
    fontSize: "1.1rem",
    transition: "background 0.2s, color 0.2s"
  });

  if (setFinished) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <span
            style={breadcrumbStyle("subtraction")}
            onClick={() => setOperation("subtraction")}
          >
            Subtraction
          </span>
          <span
            style={breadcrumbStyle("addition")}
            onClick={() => setOperation("addition")}
          >
            Addition
          </span>
        </div>
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
      <div style={{ marginBottom: "1.5rem" }}>
        <span
          style={breadcrumbStyle("subtraction")}
          onClick={() => setOperation("subtraction")}
        >
          Subtraction
        </span>
        <span
          style={breadcrumbStyle("addition")}
          onClick={() => setOperation("addition")}
        >
          Addition
        </span>
      </div>
      <h2>{operation === "subtraction" ? "Subtraction Practice" : "Addition Practice"}</h2>
      <div style={{ marginBottom: "1rem" }}>
        <div>
          Question: {questionNumber} / {QUESTIONS_PER_SET}
        </div>
        <div>
          Correct: <span style={{ color: "green" }}>{score.right}</span> | 
          Wrong: <span style={{ color: "red" }}>{score.wrong}</span>
        </div>
        <div>
          Time: <span style={{ color: "blue" }}>{questionTime}s</span>
        </div>
      </div>
      <div>
        <div style={{ fontSize: "2rem", margin: "1rem" }}>
          {problem.num1} {operation === "subtraction" ? "-" : "+"} {problem.num2} = ?
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="number"
          min="0"
          max="6"
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

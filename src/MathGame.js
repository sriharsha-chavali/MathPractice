// MathGame.js

import React, { useState, useRef, useEffect } from "react";
import { getRandomInt, generateProblem } from "./utils/mathUtils";
import Breadcrumb from "./components/Breadcrumb";
import MaxNumberInput from "./components/MaxNumberInput";
import Scoreboard from "./components/Scoreboard";
import ProblemForm from "./components/ProblemForm";
import SetFinished from "./components/SetFinished";
import ClockPractice from "./components/ClockPractice";

const QUESTIONS_PER_SET = 12;

export default function MathGame() {
  const [operation, setOperation] = useState("subtraction");
  const [maxNumber, setMaxNumber] = useState(6);
  const [problem, setProblem] = useState(generateProblem("subtraction", 6));
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

  // When operation or maxNumber changes, reset everything
  useEffect(() => {
    setProblem(generateProblem(operation, maxNumber));
    setUserAnswer("");
    setFeedback("");
    setScore({ right: 0, wrong: 0 });
    setQuestionNumber(1);
    setSetFinished(false);
    setQuestionTime(0);
  }, [operation, maxNumber]);

  const nextQuestion = () => {
    if (questionNumber < QUESTIONS_PER_SET) {
      setProblem(generateProblem(operation, maxNumber));
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
    setProblem(generateProblem(operation, maxNumber));
    setUserAnswer("");
    setFeedback("");
    setQuestionTime(0);
  };

  // --- NEW: Render ClockPractice if operation is "clocks" ---
  if (operation === "clocks") {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Breadcrumb operation={operation} setOperation={setOperation} />
        <ClockPractice />
      </div>
    );
  }

  // --- Existing math practice rendering ---
  if (setFinished) {
    return (
      <SetFinished
        operation={operation}
        setOperation={setOperation}
        maxNumber={maxNumber}
        setMaxNumber={setMaxNumber}
        score={score}
        QUESTIONS_PER_SET={QUESTIONS_PER_SET}
        handleRestart={handleRestart}
      />
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <Breadcrumb operation={operation} setOperation={setOperation} />
      {operation === "subtraction" && (
        <MaxNumberInput
          maxNumber={maxNumber}
          setMaxNumber={setMaxNumber}
          disabled={!!feedback}
        />
      )}
      <h2>{operation === "subtraction" ? "Subtraction Practice" : "Addition Practice"}</h2>
      <Scoreboard
        questionNumber={questionNumber}
        QUESTIONS_PER_SET={QUESTIONS_PER_SET}
        score={score}
        questionTime={questionTime}
      />
      <div>
        <div style={{ fontSize: "2rem", margin: "1rem" }}>
          {problem.num1} {operation === "subtraction" ? "-" : "+"} {problem.num2} = ?
        </div>
      </div>
      <ProblemForm
        operation={operation}
        problem={problem}
        userAnswer={userAnswer}
        setUserAnswer={setUserAnswer}
        handleSubmit={handleSubmit}
        feedback={feedback}
        inputRef={inputRef}
        maxNumber={maxNumber}
      />
      <div style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
        {feedback}
      </div>
    </div>
  );
}

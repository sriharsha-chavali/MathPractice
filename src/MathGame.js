import React, { useState, useRef, useEffect } from "react";
import { generateProblem } from "./utils/mathUtils";
import Breadcrumb from "./components/Breadcrumb";
import MaxNumberInput from "./components/MaxNumberInput";
import Scoreboard from "./components/Scoreboard";
import ProblemForm from "./components/ProblemForm";
import SetFinished from "./components/SetFinished";
import ClockPractice from "./components/ClockPractice";
import AnalogClockPractice from "./components/AnalogClockPractice";

const QUESTIONS_PER_SET = 12;

export default function MathGame() {
  const [operation, setOperation] = useState("subtraction"); // user selection, can be "mixed"
  const [maxNumber, setMaxNumber] = useState(6);

  // The actual problem operation for current question
  const [problemOperation, setProblemOperation] = useState("subtraction");

  const [problem, setProblem] = useState(generateProblem("subtraction", maxNumber));
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState({ right: 0, wrong: 0 });
  const [questionNumber, setQuestionNumber] = useState(1);
  const [setFinished, setSetFinished] = useState(false);
  const [questionTime, setQuestionTime] = useState(0);
  const timerId = useRef(null);
  const inputRef = useRef(null);
  const shouldFocus = useRef(false);

  const getRandomOperation = () => (Math.random() < 0.5 ? "addition" : "subtraction");

  // Generate new problem according to problemOperation
  const generateNewProblem = (op) => {
    setProblemOperation(op);
    setProblem(generateProblem(op, maxNumber));
    setUserAnswer("");
    setFeedback("");
  };

  useEffect(() => {
    // When operation or maxNumber changes, reset everything
    let op = operation === "mixed" ? getRandomOperation() : operation;
    generateNewProblem(op);
    setScore({ right: 0, wrong: 0 });
    setQuestionNumber(1);
    setSetFinished(false);
    setQuestionTime(0);
  }, [operation, maxNumber]);

  // Timer and input focus
  useEffect(() => {
    setQuestionTime(0);
    if (timerId.current) clearInterval(timerId.current);

    if (!setFinished) {
      timerId.current = setInterval(() => {
        setQuestionTime((t) => t + 1);
      }, 1000);
    }

    if (shouldFocus.current && inputRef.current) {
      inputRef.current.focus();
      shouldFocus.current = false;
    }

    return () => clearInterval(timerId.current);
  }, [problem, setFinished]);

  const nextQuestion = () => {
    if (questionNumber < QUESTIONS_PER_SET) {
      let op = operation === "mixed" ? getRandomOperation() : operation;
      generateNewProblem(op);
      setQuestionNumber((q) => q + 1);
      shouldFocus.current = true;
    } else {
      setSetFinished(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearInterval(timerId.current);

    const answerValue = parseInt(userAnswer, 10);
    let correctAnswer;

    switch (problemOperation) {
      case "subtraction":
        correctAnswer = problem.num1 - problem.num2;
        break;
      case "addition":
        correctAnswer = problem.num1 + problem.num2;
        break;
      case "multiplication":
        correctAnswer = problem.num1 * problem.num2;
        break;
      case "division":
        correctAnswer = problem.num1 / problem.num2;
        break;
      default:
        correctAnswer = problem.num1 + problem.num2;
    }

    if (answerValue === correctAnswer) {
      setFeedback("🎉 Correct! Great job!");
      setScore((s) => ({ ...s, right: s.right + 1 }));
    } else {
      setFeedback("❌ Oops! Try again.");
      setScore((s) => ({ ...s, wrong: s.wrong + 1 }));
    }

    setTimeout(nextQuestion, 1200);
  };

  const handleRestart = () => {
    setScore({ right: 0, wrong: 0 });
    setQuestionNumber(1);
    setSetFinished(false);
    let op = operation === "mixed" ? getRandomOperation() : operation;
    generateNewProblem(op);
    setQuestionTime(0);
    shouldFocus.current = true;
  };

  // Special case: digital clocks
  if (operation === "clocks") {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Breadcrumb operation={operation} setOperation={setOperation} />
        <ClockPractice />
      </div>
    );
  }

  // Special case: analog clocks
  if (operation === "analog-clocks") {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Breadcrumb operation={operation} setOperation={setOperation} />
        <AnalogClockPractice />
      </div>
    );
  }

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

  // Display operator by current problemOperation
  const displayOperator =
    problemOperation === "subtraction"
      ? " - "
      : problemOperation === "addition"
      ? " + "
      : problemOperation === "multiplication"
      ? " × "
      : problemOperation === "division"
      ? " ÷ "
      : " + ";

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <Breadcrumb operation={operation} setOperation={setOperation} />

      {(operation === "subtraction" ||
        operation === "multiplication" ||
        operation === "division" ||
        operation === "mixed") && (
        <MaxNumberInput maxNumber={maxNumber} setMaxNumber={setMaxNumber} disabled={!!feedback} />
      )}

      <h2>
        {operation === "mixed"
          ? "Mixed (Addition + Subtraction) Practice"
          : `${operation.charAt(0).toUpperCase() + operation.slice(1)} Practice`}
      </h2>

      <Scoreboard
        questionNumber={questionNumber}
        QUESTIONS_PER_SET={QUESTIONS_PER_SET}
        score={score}
        questionTime={questionTime}
      />

      <div>
        <div style={{ fontSize: "2rem", margin: "1rem" }}>
          {problem.num1}
          {displayOperator}
          {problem.num2} = ?
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

      <div style={{ marginTop: "1rem", fontSize: "1.2rem" }}>{feedback}</div>
    </div>
  );
}

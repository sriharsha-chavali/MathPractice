// components/ClockPractice.js
import React, { useState } from "react";

function randomTime() {
  const hour = Math.floor(Math.random() * 12) + 1; // 1-12
  const minute = Math.floor(Math.random() * 60); // 0-59
  return { hour, minute };
}

function formatTime({ hour, minute }) {
  return `${hour}:${minute.toString().padStart(2, "0")}`;
}

export default function ClockPractice({ QUESTIONS_PER_SET = 12 }) {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState({ right: 0, wrong: 0 });
  const [feedback, setFeedback] = useState("");
  const [userHour, setUserHour] = useState("");
  const [userMinute, setUserMinute] = useState("");
  const [setFinished, setSetFinished] = useState(false);
  const [clock, setClock] = useState(randomTime());

  const handleSubmit = (e) => {
    e.preventDefault();
    const correct = clock.hour === Number(userHour) && clock.minute === Number(userMinute);
    setFeedback(correct ? "🎉 Correct!" : `❌ Oops! It was ${formatTime(clock)}`);
    setScore((s) => ({
      right: s.right + (correct ? 1 : 0),
      wrong: s.wrong + (correct ? 0 : 1)
    }));

    setTimeout(() => {
      if (questionNumber < QUESTIONS_PER_SET) {
        setClock(randomTime());
        setUserHour("");
        setUserMinute("");
        setFeedback("");
        setQuestionNumber(q => q + 1);
      } else {
        setSetFinished(true);
      }
    }, 1200);
  };

  const handleRestart = () => {
    setScore({ right: 0, wrong: 0 });
    setQuestionNumber(1);
    setSetFinished(false);
    setClock(randomTime());
    setUserHour("");
    setUserMinute("");
    setFeedback("");
  };

  if (setFinished) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Set Finished!</h2>
        <div style={{ fontSize: "1.5rem", margin: "1rem" }}>
          You got <span style={{ color: "green" }}>{score.right}</span> right and <span style={{ color: "red" }}>{score.wrong}</span> wrong out of {QUESTIONS_PER_SET} questions.
        </div>
        <button onClick={handleRestart} style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
          Start New Set
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Clocks Practice</h2>
      <div>
        Question: {questionNumber} / {QUESTIONS_PER_SET}
      </div>
      <div>
        Correct: <span style={{ color: "green" }}>{score.right}</span> | 
        Wrong: <span style={{ color: "red" }}>{score.wrong}</span>
      </div>
      <div style={{
        fontSize: "3rem",
        margin: "2rem",
        border: "2px solid #007bff",
        display: "inline-block",
        padding: "1rem",
        borderRadius: "1rem",
        background: "#f0f7ff"
      }}>
        <span role="img" aria-label="clock">🕒</span>
        <span style={{ marginLeft: "1rem" }}> {formatTime(clock)}</span>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Hour:
          <input
            type="number"
            min="1"
            max="12"
            value={userHour}
            onChange={e => setUserHour(e.target.value)}
            disabled={!!feedback}
            style={{ width: "3rem", marginLeft: "0.5rem", marginRight: "1rem" }}
          />
        </label>
        <label>
          Minute:
          <input
            type="number"
            min="0"
            max="59"
            value={userMinute}
            onChange={e => setUserMinute(e.target.value)}
            disabled={!!feedback}
            style={{ width: "3rem", marginLeft: "0.5rem" }}
          />
        </label>
        <button type="submit" disabled={!!feedback} style={{ marginLeft: "1rem" }}>
          Check
        </button>
      </form>
      <div style={{ marginTop: "1rem", fontSize: "1.2rem" }}>{feedback}</div>
    </div>
  );
}

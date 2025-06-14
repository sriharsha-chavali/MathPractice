// components/Scoreboard.js

import React from "react";

export default function Scoreboard({ questionNumber, QUESTIONS_PER_SET, score, questionTime }) {
  return (
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
  );
}

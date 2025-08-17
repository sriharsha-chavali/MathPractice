// components/ProblemForm.js

import React from "react";

export default function ProblemForm({
  operation,
  problem,
  userAnswer,
  setUserAnswer,
  handleSubmit,
  feedback,
  inputRef,
  maxNumber
}) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="number"
        min="0"
        // max={maxNumber}
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
  );
}

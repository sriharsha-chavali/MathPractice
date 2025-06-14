// components/SetFinished.js

import React from "react";
import Breadcrumb from "./Breadcrumb";
import MaxNumberInput from "./MaxNumberInput";

export default function SetFinished({
  operation,
  setOperation,
  maxNumber,
  setMaxNumber,
  score,
  QUESTIONS_PER_SET,
  handleRestart
}) {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <Breadcrumb operation={operation} setOperation={setOperation} />
      {operation === "subtraction" && (
        <MaxNumberInput
          maxNumber={maxNumber}
          setMaxNumber={setMaxNumber}
          disabled={true}
        />
      )}
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

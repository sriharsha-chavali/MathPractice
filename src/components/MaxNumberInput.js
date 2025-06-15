import React from "react";

export default function MaxNumberInput({ maxNumber, setMaxNumber, disabled }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>
        Max Number:{" "}
        <input
          type="number"
          min="1"
          value={maxNumber}
          onChange={e => setMaxNumber(Number(e.target.value))}
          style={{ width: "4rem", fontSize: "1rem", textAlign: "center" }}
          disabled={disabled}
        />
      </label>
    </div>
  );
}

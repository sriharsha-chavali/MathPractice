// components/Breadcrumb.js

import React from "react";

export default function Breadcrumb({ operation, setOperation }) {
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

  return (
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
	   <span style={breadcrumbStyle("clocks")} onClick={() => setOperation("clocks")}>
        Clocks
      </span>
	  <span style={breadcrumbStyle("analog-clocks")} onClick={() => setOperation("analog-clocks")}>
        Analog Clocks
      </span>
    </div>
  );
}

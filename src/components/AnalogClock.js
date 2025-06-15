import React from "react";

function getAngle(unit, max) {
  return (360 * unit) / max - 90; // -90 to start at 12 o'clock
}

export default function AnalogClock({ hour, minute, size = 120 }) {
  // Adjust hour hand for minutes
  const hourAngle = getAngle((hour % 12) + minute / 60, 12);
  const minuteAngle = getAngle(minute, 60);
  const center = size / 2;
  const hourLength = size * 0.28;
  const minuteLength = size * 0.4;

  // Helper for hand positions
  const handPos = (angle, length) => ({
    x2: center + length * Math.cos((angle * Math.PI) / 180),
    y2: center + length * Math.sin((angle * Math.PI) / 180),
  });

  const hourHand = handPos(hourAngle, hourLength);
  const minuteHand = handPos(minuteAngle, minuteLength);

  // Draw hour marks
  const marks = [];
  for (let i = 0; i < 12; i++) {
    const angle = getAngle(i, 12);
    const inner = handPos(angle, size * 0.42);
    const outer = handPos(angle, size * 0.48);
    marks.push(
      <line
        key={`hour-${i}`}
        x1={inner.x2}
        y1={inner.y2}
        x2={outer.x2}
        y2={outer.y2}
        stroke="#333"
        strokeWidth={2}
      />
    );
  }

  // Draw minute marks (60 smaller marks)
  const minuteMarks = [];
  for (let i = 0; i < 60; i++) {
    if (i % 5 === 0) continue; // Skip positions with hour marks
    const angle = getAngle(i, 60);
    const inner = handPos(angle, size * 0.45);
    const outer = handPos(angle, size * 0.48);
    minuteMarks.push(
      <line
        key={`minute-${i}`}
        x1={inner.x2}
        y1={inner.y2}
        x2={outer.x2}
        y2={outer.y2}
        stroke="#999"
        strokeWidth={1}
      />
    );
  }

  return (
    <svg width={size} height={size} style={{ background: "#f8f9fa", borderRadius: "50%" }}>
      {/* Clock face */}
      <circle cx={center} cy={center} r={size * 0.48} fill="#fff" stroke="#888" strokeWidth={3} />
      {/* Minute marks */}
      {minuteMarks}
      {/* Hour marks */}
      {marks}
      {/* Hour hand */}
      <line
        x1={center}
        y1={center}
        x2={hourHand.x2}
        y2={hourHand.y2}
        stroke="#222"
        strokeWidth={5}
        strokeLinecap="round"
      />
      {/* Minute hand */}
      <line
        x1={center}
        y1={center}
        x2={minuteHand.x2}
        y2={minuteHand.y2}
        stroke="#007bff"
        strokeWidth={3}
        strokeLinecap="round"
      />
      {/* Center dot */}
      <circle cx={center} cy={center} r={4} fill="#007bff" />
    </svg>
  );
}

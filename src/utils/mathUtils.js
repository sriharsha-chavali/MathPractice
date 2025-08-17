export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateProblem(operation, maxNumber) {
  if (operation === "subtraction") {
    const num1 = getRandomInt(11, 99);
    const num2 = getRandomInt(6, 9);
    return { num1, num2 };
  }

  if (operation === "addition") {
    const num2 = getRandomInt(6, 9);
    const num1 = getRandomInt(11, 99);
    return { num1, num2 };
  }

  if (operation === "multiplication") {
  // Randomly decide which number is first
  const swap = Math.random() > 0.5;
  let num1, num2;
  if (swap) {
    num2 = getRandomInt(1, maxNumber);
    const maxMultiplier = Math.floor(maxNumber / num2);
    num1 = getRandomInt(1, maxMultiplier || 1);
  } else {
    num1 = getRandomInt(1, maxNumber);
    const maxMultiplier = Math.floor(maxNumber / num1);
    num2 = getRandomInt(1, maxMultiplier || 1);
  }
  return { num1, num2 };
}

  if (operation === "division") {
    const divisor = getRandomInt(2, Math.min(maxNumber, 10));
    const quotient = getRandomInt(1, Math.floor(maxNumber / divisor));
    const dividend = divisor * quotient;
    return { num1: dividend, num2: divisor };
  }

  // Default to addition if unknown operation
  const num2 = getRandomInt(0, maxNumber);
  const num1 = getRandomInt(0, maxNumber - num2);
  return { num1, num2 };
}

// utils/mathUtils.js

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateProblem(operation, maxNumber) {
  if (operation === "subtraction") {
    const num1 = maxNumber;
    const num2 = getRandomInt(0, num1);
    return { num1, num2 };
  } else {
    // addition: both addends between 0 and maxNumber, sum <= maxNumber
    const num2 = getRandomInt(0, maxNumber);
    const num1_add = getRandomInt(0, maxNumber - num2);
    return { num1: num1_add, num2 };
  }
}

/**
 * Calculates the sum of two numbers by adding them together
 * @param {number} num1
 * @param {number} num2
 * @returns {number}
 */
function add(num1, num2) {
  return num1 + num2;
}

/**
 * Calculates the difference of two numbers by subtracting num2 from num1
 * @param {number} num1 minuend - starting number
 * @param {number} num2 subtrahend - number taken away
 * @returns {number}
 */
function subtract(num1, num2) {
  return num1 - num2;
}

/**
 * Calculates the product of two numbers by multiplying them together
 * @param {number} num1
 * @param {number} num2
 * @returns {number}
 */
function multiply(num1, num2) {
  return num1 * num2;
}

/**
 * Calculates the quotient of two numbers by dividing num1 by num2
 * @param {number} num1 dividend - number being divided
 * @param {number} num2 divisor - number dividing by
 * @returns {number}
 */
function divide(num1, num2) {
  return num1 / num2;
}

/**
 * Handler function that calls the appropriate operator to perform calculation
 * @param {number} operator
 * @param {number} num1
 * @param {number} num2
 */
function operate(operator, num1, num2) {
  switch (operator) {
    case "add":
      add(num1, num2);
      break;
    case "subtract":
      subtract(num1, num2);
      break;
    case "multiply":
      multiply(num1, num2);
      break;
    case "divide":
      divide(num1, num2);
      break;
  }
}

const btns = document.querySelector(".btns");

btns.addEventListener("click", (e) => {
  console.log(e);
  const isPrimaryBtn =
    (e.target.classList[0] === "primary-btn" ||
    e.target.classList[0] === "operator-btn") && 
    (e.target.textContent != "." &&
    e.target.textContent != "=");

  if (isPrimaryBtn) {
    const value = e.target.textContent;
    const display = document.querySelector(".display");
    display.textContent = value;
  }
});

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

function handleClearBtnPress(calcDisplay) {
  calcDisplay.textContent = "0";
}

function handleBackspaceBtnPress(calcDisplay) {
  if (calcDisplay.textContent != "0" && calcDisplay.textContent.length === 1) {
    calcDisplay.textContent = "0";
  } else if (
    calcDisplay.textContent != "0" &&
    calcDisplay.textContent.length != 1
  ) {
    const updatedDisplayContent = calcDisplay.textContent.slice(0, -1);
    calcDisplay.textContent = updatedDisplayContent;
  }
}

function handleNumBtnPress(value, calcDisplay) {
  if (calcDisplay.textContent === "0") {
    calcDisplay.textContent = value;
  } else {
    calcDisplay.textContent += value;
  }
}

function main() {
  // code below is major WIP
  let calcLogic = {
    num1: "0",
    num2: "",
    firstOperandMode: true,
    secondOperandMode: false,
  }

  const calcDisplay = document.querySelector(".display");
  const btns = document.querySelector(".btns");

  btns.addEventListener("click", (e) => {
    const value = e.target.textContent;
    const isButton = e.target.nodeName === 'BUTTON';
    
    if (isButton && value != '.') {
      switch (value) {
        case "AC":
          handleClearBtnPress(calcDisplay);
          break;
        case "⌫":
          handleBackspaceBtnPress(calcDisplay);
          break;
        default:
          handleNumBtnPress(value, calcDisplay);
      }
    }
  });
}

main();

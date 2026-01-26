/**
 * Calculates the sum of two numbers by adding them together
 * @param {number} operand1
 * @param {number} operand2
 * @returns {number}
 */
function add(operand1, operand2) {
  return operand1 + operand2;
}

/**
 * Calculates the difference of two numbers by subtracting operand2 from operand1
 * @param {number} operand1 minuend - starting number
 * @param {number} operand2 subtrahend - number taken away
 * @returns {number}
 */
function subtract(operand1, operand2) {
  return operand1 - operand2;
}

/**
 * Calculates the product of two numbers by multiplying them together
 * @param {number} operand1
 * @param {number} operand2
 * @returns {number}
 */
function multiply(operand1, operand2) {
  return operand1 * operand2;
}

/**
 * Calculates the quotient of two numbers by dividing operand1 by operand2
 * @param {number} operand1 dividend - number being divided
 * @param {number} operand2 divisor - number dividing by
 * @returns {number}
 */
function divide(operand1, operand2) {
  return operand1 / operand2;
}

/**
 * Handler function that calls the appropriate operator to perform calculation
 * @param {number} operator
 * @param {number} operand1
 * @param {number} operand2
 */
function operate(operator, operand1, operand2) {
  switch (operator) {
    case "add":
      add(operand1, operand2);
      break;
    case "subtract":
      subtract(operand1, operand2);
      break;
    case "multiply":
      multiply(operand1, operand2);
      break;
    case "divide":
      divide(operand1, operand2);
      break;
  }
}

function resetCalcLogic(calcLogic, calcDisplay) {
  calcLogic.operand1 = "0";
  calcLogic.operand2 = "";
  calcLogic.operator = "";
  calcDisplay.textContent = calcLogic.operand1;
}

function removeLastCharInCalcDisplay(calcDisplay) {
  const updatedDisplayContent = calcDisplay.textContent.slice(0, -1);
  calcDisplay.textContent = updatedDisplayContent;
}

function handleClearBtnPress(calcLogic, calcDisplay) {
  resetCalcLogic(calcLogic, calcDisplay);
}

function handleBackspaceBtnPress(calcLogic, calcDisplay) {
  if (calcDisplay.textContent != "0" && calcDisplay.textContent.length === 1) {
    resetCalcLogic(calcLogic, calcDisplay);
  } else if (
    calcDisplay.textContent != "0" &&
    calcDisplay.textContent.length > 1
  ) {
    removeLastCharInCalcDisplay(calcDisplay);
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
  let calcLogic = {
    operand1: "0",
    operand2: "",
    operator: "",
  };

  const calcDisplay = document.querySelector(".display");
  const btns = document.querySelector(".btns");

  btns.addEventListener("click", (e) => {
    const value = e.target.textContent;
    const isButton = e.target.nodeName === "BUTTON";
    console.log(calcDisplay);

    if (isButton && value != ".") {
      switch (value) {
        case "AC":
          handleClearBtnPress(calcLogic, calcDisplay);
          break;
        case "⌫":
          handleBackspaceBtnPress(calcLogic, calcDisplay);
          break;
        default:
          handleNumBtnPress(value, calcDisplay);
      }
    }
  });
}

main();

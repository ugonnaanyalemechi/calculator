const UNDEFINED = "Undefined";

const formatResult = (value) => (+value.toFixed(5)).toString();
const add = (operand1, operand2) => formatResult(+operand1 + +operand2);
const subtract = (operand1, operand2) => formatResult(+operand1 - +operand2);
const multiply = (operand1, operand2) => formatResult(+operand1 * +operand2);
const divide = (operand1, operand2) =>
  operand2 === "0" ? UNDEFINED : formatResult(+operand1 / +operand2);

function operate(operator, operand1, operand2) {
  let result = 0;

  switch (operator) {
    case "+":
      result = add(operand1, operand2);
      break;
    case "-":
      result = subtract(operand1, operand2);
      break;
    case "x":
      result = multiply(operand1, operand2);
      break;
    case "÷":
      result = divide(operand1, operand2);
      break;
  }

  return result;
}

function resetCalcLogicAndDisplay(calcLogic, calcDisplay) {
  calcLogic.operand1 = "0";
  calcLogic.operand2 = "";
  calcLogic.operator = "";
  calcLogic.resultProvided = false;
  calcLogic.decimalBtnPressed = false;
  calcDisplay.textContent = calcLogic.operand1;
}

function removeLastCharInCalcDisplay(calcDisplay) {
  const updatedDisplayContent = calcDisplay.textContent.slice(0, -1);
  calcDisplay.textContent = updatedDisplayContent;
}

function updateCharRemovalInCalcLogic(calcLogic) {
  calcLogic.resultProvided = false;
  if (calcLogic.operand2 !== "") {
    if (calcLogic.operand2.at(-1) === ".") calcLogic.decimalBtnPressed = false;
    calcLogic.operand2 = calcLogic.operand2.slice(0, -1);
  } else if (calcLogic.operand1 !== "" && calcLogic.operator !== "") {
    calcLogic.operator = "";
  } else {
    if (calcLogic.operand1.at(-1) === ".") calcLogic.decimalBtnPressed = false;
    calcLogic.operand1 = calcLogic.operand1.slice(0, -1);
  }
}

function updateNumAdditionInCalcLogic(value, calcLogic) {
  if (calcLogic.operand1 !== "" && calcLogic.operator !== "") {
    calcLogic.operand2 += value;
  } else {
    calcLogic.operand1 += value;
  }
}

function handleClearBtnPress(calcLogic, calcDisplay) {
  resetCalcLogicAndDisplay(calcLogic, calcDisplay);
}

function handleBackspaceBtnPress(calcLogic, calcDisplay) {
  if (calcDisplay.textContent !== "0" && calcDisplay.textContent.length === 1) {
    resetCalcLogicAndDisplay(calcLogic, calcDisplay);
  } else if (
    calcDisplay.textContent !== "0" &&
    calcDisplay.textContent.length > 1 &&
    calcLogic.operand1 !== UNDEFINED
  ) {
    updateCharRemovalInCalcLogic(calcLogic);
    removeLastCharInCalcDisplay(calcDisplay);
  }
}

function handleNumBtnPress(value, calcLogic, calcDisplay) {
  if (calcDisplay.textContent === "0" || calcLogic.resultProvided) {
    calcLogic.operand1 = value;
    calcLogic.resultProvided = false;
    calcDisplay.textContent = value;
  } else {
    updateNumAdditionInCalcLogic(value, calcLogic);
    calcDisplay.textContent += value;
  }
}

function performBinaryOperationAndDisplayResult(calcLogic, calcDisplay) {
  const result = operate(
    calcLogic.operator,
    calcLogic.operand1,
    calcLogic.operand2,
  );
  resetCalcLogicAndDisplay(calcLogic, calcDisplay);
  calcLogic.operand1 = result;
  calcLogic.resultProvided = true;
  calcDisplay.textContent = result;
}

function performSequentialOperationAndDisplayResult(
  selectedOperator,
  calcLogic,
  calcDisplay,
) {
  const result = operate(
    calcLogic.operator,
    calcLogic.operand1,
    calcLogic.operand2,
  );
  resetCalcLogicAndDisplay(calcLogic, calcDisplay);
  calcLogic.operand1 = result;
  calcLogic.operator = selectedOperator;
  calcDisplay.textContent = `${result}${calcLogic.operator}`;
}

function prepareForNegativeOperand(calcLogic, calcDisplay) {
  calcLogic.resultProvided = false;
  calcLogic.operand1 = "-";
  calcDisplay.textContent = calcLogic.operand1;
}

function updateCalcLogicAndDisplayWithOperator(
  selectedOperator,
  calcLogic,
  calcDisplay,
) {
  calcLogic.resultProvided = false;
  calcLogic.decimalBtnPressed = false;
  calcLogic.operator = selectedOperator;
  calcDisplay.textContent += selectedOperator;
}

function handleOperatorBtnPress(selectedOperator, calcLogic, calcDisplay) {
  const hasExpression =
    calcLogic.operand1 !== "" &&
    calcLogic.operand2 !== "" &&
    calcLogic.operator !== "";

  if (
    selectedOperator === "-" &&
    calcLogic.operator === "" &&
    calcLogic.operand1 === "0"
  ) {
    prepareForNegativeOperand(calcLogic, calcDisplay);
  } else if (selectedOperator === "=" && hasExpression) {
    performBinaryOperationAndDisplayResult(calcLogic, calcDisplay);
  } else if (selectedOperator !== "=" && hasExpression) {
    performSequentialOperationAndDisplayResult(
      selectedOperator,
      calcLogic,
      calcDisplay,
    );
  } else if (
    calcLogic.operator === "" &&
    selectedOperator !== "=" &&
    calcLogic.operand1 !== "-"
  ) {
    updateCalcLogicAndDisplayWithOperator(
      selectedOperator,
      calcLogic,
      calcDisplay,
    );
  }
}

function handleDecimalBtnPress(calcLogic, calcDisplay) {
  calcLogic.decimalBtnPressed = true;
  calcLogic.resultProvided = false;

  if (calcLogic.operator !== "" && calcLogic.operand2 === "") {
    calcLogic.operand2 = "0.";
    calcDisplay.textContent += "0.";
  } else if (calcLogic.operand2 !== "") {
    calcLogic.operand2 += ".";
    calcDisplay.textContent += ".";
  } else if (calcLogic.operand1 === "-") {
    calcLogic.operand1 = "0.";
    calcDisplay.textContent += "0.";
  } else {
    calcLogic.operand1 += ".";
    calcDisplay.textContent += ".";
  }
}

function checkAndAdjustOverflow(calcDisplay) {
  if (calcDisplay.textContent.length >= 10) {
    calcDisplay.classList.add("overflow-active");
    calcDisplay.scrollLeft =  calcDisplay.scrollWidth;
  } else {
    calcDisplay.classList.remove("overflow-active");
  }
}

function main() {
  let calcLogic = {
    operand1: "0",
    operand2: "",
    operator: "",
    resultProvided: false,
    decimalBtnPressed: false,
  };

  const calcDisplay = document.querySelector(".display");
  const btns = document.querySelector(".btns");

  btns.addEventListener("click", (e) => {
    const value = e.target.textContent;
    const isButton = e.target.nodeName === "BUTTON";

    if (isButton) {
      switch (value) {
        case "AC":
          handleClearBtnPress(calcLogic, calcDisplay);
          break;
        case "⌫":
          handleBackspaceBtnPress(calcLogic, calcDisplay);
          break;
        case ".":
          if (!calcLogic.decimalBtnPressed)
            handleDecimalBtnPress(calcLogic, calcDisplay);
          break;
        default:
          if (e.target.classList[0] === "operator-btn") {
            handleOperatorBtnPress(value, calcLogic, calcDisplay);
          } else {
            handleNumBtnPress(value, calcLogic, calcDisplay);
          }
      }
    }
  
    checkAndAdjustOverflow(calcDisplay);
  });

  document.addEventListener("keydown", (e) => {
    let keyName = e.key;

    if (keyName === "*") {
      keyName = "x";
    } else if (keyName === "/") {
      keyName = "÷";
    } else if (keyName === "Enter") {
      keyName = "=";
    }

    switch (keyName) {
      case "c":
        handleClearBtnPress(calcLogic, calcDisplay);
        break;
      case "Backspace":
        handleBackspaceBtnPress(calcLogic, calcDisplay);
        break;
      case ".":
        if (!calcLogic.decimalBtnPressed)
          handleDecimalBtnPress(calcLogic, calcDisplay);
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        handleNumBtnPress(keyName, calcLogic, calcDisplay);
        break;
      case "÷":
      case "x":
      case "-":
      case "+":
      case "=":
        handleOperatorBtnPress(keyName, calcLogic, calcDisplay);
        break;
    }

    checkAndAdjustOverflow(calcDisplay);
  });
}

main();

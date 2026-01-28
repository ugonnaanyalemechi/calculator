const add = (operand1, operand2) => {
  let result = +operand1 + +operand2;
  result = +result.toFixed(5);
  return result.toString();
};

const subtract = (operand1, operand2) => {
  let result = +operand1 - +operand2;
  result = +result.toFixed(5);
  return result.toString();
}

const multiply = (operand1, operand2) => {
  let result = +operand1 * +operand2;
  result = +result.toFixed(5);
  return result.toString();
}

const divide = (operand1, operand2) => {
  let result = +operand1 / +operand2;
  result = +result.toFixed(5);
  return result.toString();
}

const operate = (operator, operand1, operand2) => {
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

const resetCalcLogicAndDisplay = (calcLogic, calcDisplay) => {
  calcLogic.operand1 = "0";
  calcLogic.operand2 = "";
  calcLogic.operator = "";
  calcDisplay.textContent = calcLogic.operand1;
}

const removeLastCharInCalcDisplay = (calcDisplay) => {
  const updatedDisplayContent = calcDisplay.textContent.slice(0, -1);
  calcDisplay.textContent = updatedDisplayContent;
}

const updateCharRemovalInCalcLogic = (calcLogic) => {
  if (calcLogic.operand2.length != 0) {
    calcLogic.operand2 = calcLogic.operand2.slice(0, -1);
  } else if (calcLogic.operand1 != "" && calcLogic.operator != "") {
    calcLogic.operator = "";
  } else {
    calcLogic.operand1 = calcLogic.operand1.slice(0, -1);
  }
}

const updateNumAdditionInCalcLogic = (value, calcLogic) => {
  if (calcLogic.operand1 != "" && calcLogic.operator != "") {
    calcLogic.operand2 += value;
  } else {
    calcLogic.operand1 += value;
  }
}

const handleClearBtnPress = (calcLogic, calcDisplay) => {
  resetCalcLogicAndDisplay(calcLogic, calcDisplay);
}

const handleBackspaceBtnPress = (calcLogic, calcDisplay) => {
  if (calcDisplay.textContent != "0" && calcDisplay.textContent.length === 1) {
    resetCalcLogicAndDisplay(calcLogic, calcDisplay);
  } else if (
    calcDisplay.textContent != "0" &&
    calcDisplay.textContent.length > 1
  ) {
    updateCharRemovalInCalcLogic(calcLogic);
    removeLastCharInCalcDisplay(calcDisplay);
  }
}

const handleNumBtnPress = (value, calcLogic, calcDisplay) => {
  if (calcDisplay.textContent === "0") {
    calcLogic.operand1 = value;
    calcDisplay.textContent = value;
  } else {
    updateNumAdditionInCalcLogic(value, calcLogic);
    calcDisplay.textContent += value;
  }
}

const performBinaryOperationAndDisplayResult = (calcLogic, calcDisplay) => {
  const result = operate(calcLogic.operator, calcLogic.operand1, calcLogic.operand2);
  calcLogic.operand1 = result;
  calcLogic.operand2 = '';
  calcLogic.operator = '';
  calcDisplay.textContent = result;
}

const performSequentialOperationAndDisplayResult = (selectedOperator, calcLogic, calcDisplay) => {
  const result = operate(calcLogic.operator, calcLogic.operand1, calcLogic.operand2);
  calcLogic.operand1 = result;
  calcLogic.operand2 = '';
  calcLogic.operator = selectedOperator;
  calcDisplay.textContent = `${result}${calcLogic.operator}`;
}

const handleOperatorBtnPress = (selectedOperator, calcLogic, calcDisplay) => {
  if (
    selectedOperator === "=" &&
    calcLogic.operand1 != "" &&
    calcLogic.operand2 != "" &&
    calcLogic.operator != ""
  ) {
    performBinaryOperationAndDisplayResult(calcLogic, calcDisplay);
  } else if (
    selectedOperator != "=" &&
    calcLogic.operand1 != "" &&
    calcLogic.operand2 != "" &&
    calcLogic.operator != ""
  ) {
    performSequentialOperationAndDisplayResult(selectedOperator, calcLogic, calcDisplay);
  } else if (calcLogic.operator === "" && selectedOperator != "=") {
    calcLogic.operator = selectedOperator;
    calcDisplay.textContent += selectedOperator;
  }
}

const main = () => {
  let calcLogic = {
    operand1: "0",
    operand2: "",
    operator: "",
    resultProvided: false,
  };

  const calcDisplay = document.querySelector(".display");
  const btns = document.querySelector(".btns");

  btns.addEventListener("click", (e) => {
    const value = e.target.textContent;
    const isButton = e.target.nodeName === "BUTTON";

    if (isButton && value != ".") {
      switch (value) {
        case "AC":
          handleClearBtnPress(calcLogic, calcDisplay);
          break;
        case "⌫":
          handleBackspaceBtnPress(calcLogic, calcDisplay);
          break;
        default:
          if (e.target.classList[0] === "operator-btn") {
            handleOperatorBtnPress(value, calcLogic, calcDisplay);
          } else {
            handleNumBtnPress(value, calcLogic, calcDisplay);
          }
      }
    }

    console.log(calcLogic);
  });
}

main();

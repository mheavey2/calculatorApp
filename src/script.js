console.log("JS loaded");

// list all required HTML elements
const calculator = document.querySelector(".calculator");
const calculatorKeys = document.querySelector(".calculator-keys");
const operatorKeys = document.querySelectorAll(".key-operator");
const actionKeys = document.querySelectorAll("action-key");
const numberKeys = document.querySelectorAll(".key-number");
const equalsButton = document.querySelector(".key-equal");
const clearAllButton = document.querySelector(".all-clear");
const decimalButton = document.querySelector(".decimal");
const displayCurrent = document.querySelector(".display-current-operand");

// define variables to store current and previous operand and operation performed
let currentOperand = "";
let previousOperand = "";
let operation = null;

// define functions
//clear screen
function clear() {
  displayCurrent.textContent = "0";
  console.log("display reset");
  return displayCurrent;
  // reset calculators' state to the default of 0
}

//calculation functions

//sum
const sum = (a, b) => {
  return a + b;
};
//subtract
const subtract = (a, b) => {
  return a - b;
};
//multiply
const multiply = (a, b) => {
  return a * b;
};
//divide
const divide = (a, b) => {
  return a / b;
};

//handle the calculation, store prev and current operand and value of the computation result
function calculateExpression(previousOperand, currentOperand, operation) {
  // compute the expression
  let computation;
  //convert the string values inputted to numerical values
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  //if either of the inputted values are not numbers return
  if (isNaN(prev) || isNaN(current)) return;
  //do one of the following depending on what operation was inputted
  switch (operation) {
    case "+":
      computation = sum(prev, current);
      break;
    case "-":
      computation = subtract(prev, current);
      break;
    case "*":
      computation = multiply(prev, current);
      break;
    case "/":
      computation = divide(prev, current);
      break;
    default:
      return;
  }
  //update currentOperand value to computed value
  currentOperand = computation;
  //reset operation to undefined
  operation = undefined;
  //set previous operand to current
  previousOperand = currentOperand;
  //update the display
  updateDisplay();
}

// handle decimal input
function appendDot(currentInput) {
  if (!currentOperand.includes(".")) {
    currentOperand = currentOperand.toString() + currentInput;
  }
  console.log("appendDot currentOperand is: " + currentOperand);
  updateDisplay();
}

//append value of the key the user just pressed to display.
function appendNumber(currentInput) {
  console.log("currentInput in appendNumber method is: " + currentInput);

  // check to see if there's already a decimal point, (don't allow duplicate)
  if (currentInput === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + currentInput.toString();
  previousOperand = currentOperand;
}

function chooseOperation(selectedOperation) {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    calculateExpression();
  }
  operation = selectedOperation;
  previousOperand = currentOperand;
  currentOperand = "";
}

function updateDisplay() {
  displayCurrent.innerText = currentOperand;
  //   document.querySelector(".previous-operand").innerText = currentOperand;
}
// button event listeners
//see what button was pressed
//if (calculatorKeys) {
//calculatorKeys.addEventListener("click", (e) => {
//if (document.getElementsByTagName("button")) {
//     const action = e.target.dataset.action;

//     if (!action) {
//       console.log("input is a number key");
//     } else if (action === "decimal") {
//       console.log("input is decimal key");
//     } else if (action === "clear") {
//       console.log("input is clear key");
//     } else if (action === "calculate") {
//       console.log("input is equals key");
//     } else {
//       console.log("input is operation key");
//     }
//   }
// });

// number keys
if (numberKeys) {
  numberKeys.forEach((button) => {
    button.addEventListener("click", (e) => {
      // TODO:remove consoleLog
      console.log(button.innerText);
      appendNumber(button.innerText);
      updateDisplay();
    });
  });
}
//operator keys
if (operatorKeys) {
  operatorKeys.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log(button.classList);
      if (button.classList.contains("in-use")) return;
      button.classList.add("in-use");
      console.log(button.classList);
      // if there's already an operator key pressed do nothing
    });
  });
}

clearAllButton.addEventListener("click", clear);
equalsButton.addEventListener("click", calculateExpression);
decimalButton.addEventListener("click", (e) => {
  console.log("decimal btn event: " + decimalButton.innerText);

  appendDot(decimalButton.innerText);
});
//}

const exportedFunctions = {
  sum,
  divide,
  multiply,
  subtract,
  calculateExpression,
};

module.exports = exportedFunctions;

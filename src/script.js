console.log("JS loaded");

// list all required HTML elements
const calculator = document.querySelector(".calculator");
const operatorKeys = document.querySelectorAll(".key-operator");
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
function clear(params) {
  // clear calculators' state
}
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
  return a % b;
};
function calculateExpression(params) {
  // compute the expression
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case "+":
      computation = sum(prev + current);
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
    default:
      return;
  }
  currentOperand = computation;
  operation = undefined;
  previousOperand = "";
  updateDisplay();
}

function appendDot(params) {
  // handle decimal input
}

function appendNumber(number) {
  // check to see if there's already a decimal point
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + number.toString();
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

function updateDisplay(params) {
  document.querySelector(".display-current-operand").innerText = currentOperand;
  //   document.querySelector(".previous-operand").innerText = currentOperand;
}
// button event listeners
// operator keys
operatorKeys.forEach((button) => {
  button.addEventListener("click", (e) => {
    chooseOperation(button.innerText);
    updateDisplay();
  });
});
// number keys
numberKeys.forEach((button) => {
  button.addEventListener("click", (e) => {
    // TODO:remove consoleLog
    console.log(button.innerText);
    appendNumber(button.innerText);
    updateDisplay();
  });
});

// clearAllButton.addEventListener("click", clear);
// equalsButton.addEventListener("click", calculateExpression);
// decimalButton.addEventListener("click", appendDot);

const exportedFunctions = {
  sum,
  divide,
  multiply,
  subtract,
};

module.exports = exportedFunctions;

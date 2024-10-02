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
const displayPrevious = document.querySelector(".display-previous-operand");

// define variables to store current and previous operand and operation performed
let currentOperand = "";
let previousOperand = "";
let operation = null;

// define functions
//clear screen and reset calculators' state to the default
function clear() {
  displayCurrent.textContent = "";
  displayPrevious.textContent = "";
  console.log("display reset");
  currentOperand = "";
  previousOperand = "";
  operation = null;

  return displayCurrent;
}

//function to update current operand to reduce code repitition

let updateCurrentOperand = (currentInput) => {
  currentOperand = currentOperand + currentInput;
};

// handle decimal input
function appendDot(currentInput) {
  if (!currentOperand.includes(".")) {
    updateCurrentOperand(currentInput);
  }
  console.log("appendDot currentOperand is: " + currentOperand);
  updateDisplay();
}

//append value of the key the user just pressed to display.
function appendNumber(currentInput) {
  // check to see if there's already a decimal point, (don't allow duplicate)
  if (currentInput === "." && currentOperand.includes(".")) return;
  updateCurrentOperand(currentInput);
}

// takes in the operator key selected and if there are values already passed as operands calls calculateExpression function
function chooseOperation(selectedOperation) {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    calculateExpression();
  }
  operation = selectedOperation;
  previousOperand = currentOperand;
  currentOperand = "";
}

//update display with the current and previous operands, with the chosen operator displayed next to the previous operand
function updateDisplay() {
  displayCurrent.innerText = currentOperand;
  displayPrevious.innerText = previousOperand + " " + (operation || " ");
}
// button event listeners

// number keys
//when user hits number key
//send the value to the appendNumber function to append to currentOperand
//update the display to include the new number
if (numberKeys) {
  numberKeys.forEach((button) => {
    button.addEventListener("click", (e) => {
      // TODO:remove consoleLog
      // console.log("button inner test: " + button.innerText);
      // console.log(
      //   "numberKey hit, currentOperand value is: " +
      //     currentOperand +
      //     typeof currentOperand
      // );
      // console.log(
      //   "numberKey hit, previousOperand value is: " +
      //     previousOperand +
      //     typeof previousOperand
      // );
      // console.log(
      //   "numberKey hit, operation value is: " + operation + typeof operation
      // );

      appendNumber(button.innerText);
      // console.log(
      //   "after appendNumber called, currentOperand value is: " + currentOperand
      // );
      // console.log(
      //   "after appendNumber called, previousOperand value is: " +
      //     previousOperand
      // );
      updateDisplay();
    });
  });
}
//operator keys
//set operation to button value when clicked.
//add 'in-use' class
//update display to include operator
//remove 'in-'use' class
if (operatorKeys) {
  operatorKeys.forEach((button) => {
    button.addEventListener("click", (e) => {
      //set the current operation to the value of the operator key
      operation = button.innerText;

      // //console logs
      // console.log("initial classlist value " + button.classList);
      // console.log("operation is: " + operation);
      // console.log("opKeycurOperand is: " + currentOperand);

      // if an operator key isn't pressed update
      if (
        button.classList.contains("in-use") ||
        currentOperand.includes(operation)
      )
        return;
      //when button is pressed add 'in-use' class to it
      button.classList.add("in-use");

      chooseOperation(operation);
      updateCurrentOperand(operation);

      updateDisplay();

      button.classList.remove("in-use");

      //TODO: remove console log
      // console.log(
      //   "after modifying classlist " + button.classList,
      //   button.innerText
      // );
    });
  });
}

//handle the calculation, store prev and current operand and value of the computation result
function calculateExpression() {
  // compute the expression
  let computation;

  //convert the string values inputted to numerical values
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  //if either of the inputted values are not numbers return
  if (isNaN(prev) || isNaN(current)) {
    console.log("invalid input. not a number");
    return;
  }
  //do one of the following depending on what operation was inputted
  switch (operation) {
    case "+":
      computation = prev + current;

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
      //console.log("default case: " + computation);
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

//TODO: all functionality to clear just last character
//when AC button clicked
if (clearAllButton) {
  clearAllButton.addEventListener("click", clear);
}
//when equals button clicked
if (equalsButton) {
  equalsButton.addEventListener("click", calculateExpression);
}

//when decimal button is clicked
if (decimalButton) {
  decimalButton.addEventListener("click", (e) => {
    console.log("decimal btn event: " + decimalButton.innerText);

    appendDot(decimalButton.innerText);
  });
}
//}

const exportedFunctions = {
  sum,
  divide,
  multiply,
  subtract,
  calculateExpression,
};

module.exports = exportedFunctions;

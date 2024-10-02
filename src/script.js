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
  displayCurrent.textContent = "";
  console.log("display reset");
  currentOperand = "0";
  previousOperand = "0";
  operation = null;

  return displayCurrent;
  // reset calculators' state to the default
}

//function to update current operand to reduce code repitition
let updateDisplayCurrentOperand = (currentInput) => {
  currentOperand = currentOperand.toString() + currentInput.toString();
};
let updateCurrentOperand = (currentInput) => {
  currentOperand = currentOperand + currentInput;
};

// handle decimal input
function appendDot(currentInput) {
  if (!currentOperand.includes(".")) {
    updateDisplayCurrentOperand(currentInput);
  }
  console.log("appendDot currentOperand is: " + currentOperand);
  updateDisplay();
}

//append value of the key the user just pressed to display.
function appendNumber(currentInput) {
  console.log("currentInput in appendNumber method is: " + currentInput);
  console.log("appendNumber initial currentOperand is: " + currentOperand);
  console.log("appendNumber initial previousOperand is: " + previousOperand);

  // check to see if there's already a decimal point, (don't allow duplicate)
  if (currentInput === "." && currentOperand.includes(".")) return;
  updateCurrentOperand(currentInput);
}

// takes in the operator key selected and if there are values already passed as operands calls calculateExpression function
function chooseOperation(selectedOperation) {
  operation = selectedOperation;
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    calculateExpression();
  }

  previousOperand = currentOperand;
  currentOperand = "";
}

//update display with the current and previous operands, with the chosen operator displayed next to the previous operand
function updateDisplay() {
  document.querySelector(".display-current-operand").innerText = currentOperand;
  document.querySelector("display.previous-operand").innerText =
    previousOperand + " " + (operation || " ");

  displayCurrent.innerText = currentOperand;
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
      updateDisplayCurrentOperand(operation);

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

  // //log to check values
  // console.log(
  //   "calculateEx prevOp argument value: " +
  //     previousOperand +
  //     typeof previousOperand
  // );
  // console.log(
  //   "calculateEx currentOp argument value: " +
  //     currentOperand +
  //     typeof currentOperand
  // );
  // console.log(
  //   "calculateEx operation argument value: " + operation + typeof operation
  // );
  // console.log(
  //   "calculateEx calculation argument value: " +
  //     computation +
  //     typeof computation
  // );

  //convert the string values inputted to numerical values
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  console.log("prev value post parsing: " + prev + typeof prev);
  console.log("current value post parsing: " + current + typeof prev);

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
  // console.log(
  //   "final computation value from calculate function: " + computation
  // );
  // console.log(
  //   "final currentOperand value from calculate function: " + currentOperand
  // );
}

//TODO: all functionality to clear just last character
if (clearAllButton) {
  clearAllButton.addEventListener("click", clear);
}
if (equalsButton) {
  equalsButton.addEventListener("click", (e) => {
    console.log("equals btn event: ");
    console.log(
      "equals btn currOperand value: " + currentOperand + typeof currentOperand
    );
    console.log(
      "equals btn prevOperand value: " +
        previousOperand +
        typeof previousOperand
    );
    console.log("equals btn operation value: " + operation);

    calculateExpression(currentOperand, previousOperand, operation);
  });
}

//when decimal is clicked
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

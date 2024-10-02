console.log("JS loaded");

// list all required HTML elements
const calculator = document.querySelector(".calculator");
const calculatorKeys = document.querySelector(".calculator-keys");
const operatorKeys = document.querySelectorAll(".key-operator");
const deleteNumberButton = document.querySelector(".delete-number");
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
  displayCurrent.classList.remove("result-active");
  displayPrevious.textContent = "";
  console.log("display reset");
  currentOperand = "";
  previousOperand = "";
  operation = null;

  return displayCurrent;
}

//delete value of last key
function deleteNumber() {
  currentOperand = currentOperand.toString().slice(0, -1);

  updateDisplay();
}
//function to update current operand to reduce code repitition

let updateCurrentOperand = (currentInput) => {
  currentOperand = currentOperand + currentInput;
};

// handle decimal input
function appendDot() {
  if (!currentOperand.includes(".")) {
    if (currentOperand === "") {
      currentOperand = "0";
    }
    currentOperand += ".";
  }

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
//update the display to include the new
//if hit number after a calculation nothing happens

if (numberKeys) {
  numberKeys.forEach((button) => {
    button.addEventListener("click", () => {
      if (!displayCurrent.classList.contains("result-active")) {
        appendNumber(button.innerText);
        updateDisplay();
      }
    });
  });
}

//operator keys

if (operatorKeys) {
  operatorKeys.forEach((button) => {
    button.addEventListener("click", () => {
      //if press operator after a calculation was completed remove the result-active class
      if (displayCurrent.classList.contains("result-active")) {
        displayCurrent.classList.remove("result-active");
      }
      chooseOperation(button.innerText);

      updateDisplay();
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
      return;
  }
  //set the previousOperand to the full equation
  previousOperand = previousOperand + operation + currentOperand + "=";
  //update currentOperand value to computed value
  currentOperand = computation;
  displayCurrent.classList.add("result-active");

  //reset operation to undefined
  operation = undefined;

  //update the display
  updateDisplay();
}

//TODO: all functionality to clear just last character
//when delete button is pressed
if (deleteNumberButton) {
  deleteNumberButton.addEventListener("click", () => {
    if (!displayCurrent.classList.contains("result-active")) {
      console.log("delNum dispCurr classlist: " + displayCurrent.classList);
      deleteNumber();
    }
  });
}

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
  decimalButton.addEventListener("click", appendDot);
}

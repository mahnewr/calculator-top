////////////////////////////////////////////////////////////////////////
// VARIABLES

// Number before operator:
let input1;
// Number after operator:
let input2;
// Operator
let inpOperator;
// To keep track of whether an operator has been clicked to calculate:
let operatorClicked = false;
// To keep track of whether we are updating input1 and input2:
let secondNumber = false;
// Calculator panel display:
let displayContent = document.getElementById("display-content");

// Buttons:
const clearContent = document.getElementById("clear");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equate = document.getElementById("equal");
const changeSign = document.getElementById("change-sign");
const percentage = document.getElementById("percentage");

////////////////////////////////////////////////////////////////////////
// FUNCTIONS

// Reset to defaults:
const reset = function () {
  displayContent.innerHTML = "0";
  input1 = undefined;
  input2 = undefined;
  inpOperator = "";
  operatorClicked = false;
  secondNumber = false;
};

// Number input:
const numberInp = function (number) {
  // If operator is not clicked and display does not show '0', number input is appended:
  if (!operatorClicked && displayContent.textContent !== "0") {
    displayContent.textContent += number;

    // If operator is clicked or display shows '0', number input overrides existing displayed content:
  } else {
    displayContent.textContent = number;
    operatorClicked = false;
  }

  // If secondNumber is true, then input2 is updated:
  if (secondNumber) {
    input2 = displayContent.textContent;
  } else {
    input1 = displayContent.textContent;
  }
};

// Operator input:
const applyOperator = function (operator) {
  // Not being on the second number and the display not being empty means we have input1:
  if (!secondNumber && displayContent.textContent !== "") {
    operatorClicked = true;
    secondNumber = true;
    inpOperator = operator;

    // If it's a subsequent operator clicked (after input2):
  } else {
    // Calculating the answer to input1 and input2 with previous operator when next operator is clicked:
    if (input1 !== undefined && input2 !== undefined) {
      // input1 is replaced with the solution to the result of input1 and input2 with previous operator:
      input1 = operate(input1, input2, inpOperator);
      displayContent.textContent = input1;
      inpOperator = operator;
      operatorClicked = true;
      secondNumber = true;
      input2 = undefined;
    }
  }
};

// Equal to:
const equateCalc = function () {
  // Only calculate solution if valid input1, input2, and operator exist:
  if (input1 !== undefined && input2 !== undefined && inpOperator !== "") {
    // input1 is updated with result of input1 and input2 with previous operator for further calculations:
    input1 = operate(input1, input2, inpOperator);
    displayContent.textContent = input1;

    // Reset:
    input2 = undefined;
    inpOperator = "";
    operatorClicked = false;
    secondNumber = false;
  }
};

// Addition:
const addition = function (num1, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  return num1 + num2;
};

// Subtraction:
const subtraction = function (num1, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  return num1 - num2;
};

// Multiplication:
const multiplication = function (num1, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  return num1 * num2;
};

// Division:
const division = function (num1, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  if (num2 === 0) {
    return "ERROR";
  } else {
    return num1 / num2;
  }
};

// Round a non-integer to three decimal places:
const roundToThreeDecimalPlaces = function (num) {
  const roundedNum = Math.round(num * 1000) / 1000;
  const decimalPlaces = roundedNum.toString().split(".")[1];

  // Return all decimal places if they're less than 3:
  if (decimalPlaces && decimalPlaces.length < 3) {
    return roundedNum.toFixed(decimalPlaces.length);
  }
  // Otherwise return rounded to 3 decimal places:
  return roundedNum.toFixed(3);
};

// Operate input1 and input2 based on the selected operator:
const operate = function (num1, num2, operator) {
  let result;
  if (operator === "+") {
    result = addition(num1, num2);
  } else if (operator === "-") {
    result = subtraction(num1, num2);
  } else if (operator === "×") {
    result = multiplication(num1, num2);
  } else if (operator === "÷") {
    result = division(num1, num2);
  }

  // Checking if result is an integer, otherwise rounding to 3 decimal places using function above:
  if (Number.isInteger(result) || result === "ERROR") {
    return result;
  } else {
    return roundToThreeDecimalPlaces(result);
  }
};

// To percentage:
const toPercentage = function () {
  // Check which input has to be updated:
  if (!secondNumber) {
    input1 = input1 / 100;
  } else {
    input2 = input2 / 100;
  }

  // Update display:
  let currentValue = parseFloat(displayContent.textContent);
  displayContent.textContent = currentValue / 100;
};

// Keyboard input:
const keyboardInp = function (event) {
  const key = event.key;

  if (!isNaN(key) && key !== " ") {
    numberInp(key);
  } else if (key === "+" || key === "-") {
    applyOperator(key);
  } else if (key === "/") {
    applyOperator("÷");
  } else if (key === "*") {
    applyOperator("×");
  } else if (key === "Enter") {
    equateCalc();
  } else if (key === "Escape") {
    reset();
  } else if (key === "%") {
    toPercentage();
  }
};

////////////////////////////////////////////////////////////////////////
// EVENT LISTENERS

// Handle keyboard input:
document.addEventListener("keydown", keyboardInp);

// Clear display content:
clearContent.addEventListener("click", function () {
  reset();
});

// Handle number input:
numbers.forEach(function (number) {
  number.addEventListener("click", function () {
    // Ignore '0' button input in the calculator's default state:
    if (number.textContent === "0" && displayContent.textContent === "0") {
      return;
    } else {
      numberInp(number.textContent);
    }
  });
});

// Handle operator input:
operators.forEach(function (operator) {
  operator.addEventListener("click", function () {
    // Executes for all operators except '=' as it has a separate function:
    if (operator.textContent !== "=") {
      applyOperator(operator.textContent);
    }
  });
});

// Equal to button:
equate.addEventListener("click", function () {
  equateCalc();
});

// Change number sign:
changeSign.addEventListener("click", function () {
  // Check which input has to be updated:
  if (!secondNumber) {
    input1 = -input1;
  } else {
    input2 = -input2;
  }

  // Update display:
  let currentValue = parseFloat(displayContent.textContent);
  displayContent.textContent = -currentValue;
});

percentage.addEventListener("click", function () {
  toPercentage();
});

// VARIABLES
let input1;
let input2;
let inpOperator;
let operatorClicked = false;
let secondNumber = false;

let displayContent = document.getElementById("display-content");
const clearContent = document.getElementById("clear");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equate = document.getElementById("equal");

// FUNCTIONS

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

const roundToThreeDecimalPlaces = function (num) {
  const roundedNum = Math.round(num * 1000) / 1000;
  const decimalPlaces = roundedNum.toString().split(".")[1];
  if (decimalPlaces && decimalPlaces.length < 3) {
    return roundedNum.toFixed(decimalPlaces.length);
  }
  return roundedNum.toFixed(3);
};

// Operate:
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
  if (Number.isInteger(result)) {
    return result;
  } else {
    return roundToThreeDecimalPlaces(result);
  }
};

// EVENT LISTENERS

// Clear display content:
clearContent.addEventListener("click", function () {
  displayContent.innerHTML = "";
  input1 = undefined;
  input2 = undefined;
  inpOperator = "";
  operatorClicked = false;
  secondNumber = false;
});

// Track number input:
numbers.forEach(function (number) {
  number.addEventListener("click", function () {
    if (!operatorClicked) {
      displayContent.textContent += number.textContent;
    } else {
      displayContent.textContent = number.textContent;
      operatorClicked = false;
    }
    if (secondNumber) {
      input2 = displayContent.textContent;
    } else {
      input1 = displayContent.textContent;
    }
  });
});

// Track operator input:
operators.forEach(function (operator) {
  operator.addEventListener("click", function () {
    if (operator.textContent !== "=") {
      if (!secondNumber && displayContent.textContent !== "") {
        operatorClicked = true;
        secondNumber = true;
        inpOperator = operator.textContent;
      } else {
        // If it's a subsequent operator clicked
        if (input1 !== undefined && input2 !== undefined) {
          input1 = operate(input1, input2, inpOperator);
          displayContent.textContent = input1;
          inpOperator = operator.textContent;
          operatorClicked = true;
          secondNumber = true;
          input2 = undefined;
        }
      }
    }
  });
});

// Track equal to button:
equate.addEventListener("click", function () {
  if (input1 !== undefined && input2 !== undefined && inpOperator !== "") {
    input1 = operate(input1, input2, inpOperator);

    displayContent.textContent = input1;

    input2 = undefined;
    inpOperator = "";
    operatorClicked = false;
    secondNumber = false;
  }
});

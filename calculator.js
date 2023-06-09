let firstNum = null;
let secondNum = null;
let operation = null;
let displayNeedsReset = false;

const numberBtns = document.querySelectorAll('.btn.number');
const operatorBtns = document.querySelectorAll('.btn.operator');
const decimalBtn = document.querySelector('.btn.decimal-separator');
const equalsBtn = document.querySelector('.btn.equals');
const clearBtn = document.querySelector('.btn.clear');
const deleteBtn = document.querySelector('.btn.delete');
const outputDisplay = document.querySelector('.display.output');
const outputHistory = document.querySelector('.display.history');

numberBtns.forEach((button) => {
  button.addEventListener('click', (e) => {
    appendNum(e.target.id);
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener('click', (e) => {
    setOperator(e.target.id);
  });
});

decimalBtn.addEventListener('click', (e) => {
  appendNum(e.target.id);
});

equalsBtn.addEventListener('click', evaluate);
clearBtn.addEventListener('click', clearAll);
deleteBtn.addEventListener('click', delOne);
window.addEventListener('keydown', getKeyboardInput);

const add = function(a, b) {
  if (isNaN(a) || isNaN(b)) { 
    throw new Error('Can\'t add these two values together, check your input.');
  } // Check for values that aren't numbers, accepts numbers as strings, but not strings containing non-numbers

  return Number(a) + Number(b); // Make sure the numbers entered are of the 'Number' type
};

const subtract = function(a, b) {
  if (isNaN(a) || isNaN(b)) { 
    throw new Error('Can\'t subtract these two values from each other, check your input.');
  }

  return Number(a) - Number(b);
};

const multiply = function(a, b) {
  if (isNaN(a) || isNaN(b)) { 
    throw new Error('Can\'t calculate the product of these two values, check your input.');
  }

  return Number(a) * Number(b);
};

const divide = function(a, b) {
  if (isNaN(a) || isNaN(b)) { 
    throw new Error('Can\'t divide these two values, check your input.');
  }

  return Number(a) / Number(b);
};

const operate = function(num1, num2, operator) {
  switch (operator) {
    case '+': return add(num1, num2);
    case '-': return subtract(num1, num2);
    case '*': return multiply(num1, num2);
    case 'x': return multiply(num1, num2);
    case '/': return divide(num1, num2);
  }
};

function appendNum(num) {
  if (displayNeedsReset) resetOutput();
  if (num === '.') { // check to enter a decimal point
    if (outputDisplay.textContent === '') {
      outputDisplay.textContent = 0;
    } else if (outputDisplay.textContent.includes('.')) return;
  } else if (outputDisplay.textContent === '0') {
    resetOutput();
  }

  outputDisplay.textContent += num;
}

function setOperator(operator) {
  if (operation !== null) evaluate();
  firstNum = outputDisplay.textContent;
  operation = operator;
  outputHistory.textContent = `${firstNum}${operation}`;
  displayNeedsReset = true;
}

function evaluate() {
  if (operation === null || displayNeedsReset) return;
  secondNum = outputDisplay.textContent;
  outputDisplay.textContent = operate(firstNum, secondNum, operation);
  outputHistory.textContent = `${firstNum}${operation}${secondNum}=`
  operation = null;
}

function clearAll() {
  firstNum = null;
  secondNum = null;
  operation = null;
  outputDisplay.textContent = '';
  outputHistory.textContent = '';
}

function resetOutput() {
  outputDisplay.textContent = '';
  displayNeedsReset = false; 
}

function getKeyboardInput(e) {
  console.log(e.key);
  if (!isNaN(e.key) || e.key === '.') appendNum(e.key);
  if (e.key.match(/[\+\-*/x]/)) setOperator(e.key);
  if (e.key === '=' || e.key === 'Enter') evaluate();
  if (e.key === 'Backspace' || e.key === 'Delete') delOne();
  if (e.key === 'Escape') clearAll();
}

function delOne(e) {
  outputDisplay.textContent = outputDisplay.textContent.slice(0, outputDisplay.textContent.length - 1);
}
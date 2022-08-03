let value1 = '';
let value2 = '';
let operator = '';
let canAppendToValue1 = true;

const plusButton = document.querySelector('#sum');
plusButton.addEventListener('click', () => {
  if (value1 === '') return;
  operate(value1, value2, operator);
  operator = 'plus';
});

const subtractButton = document.querySelector('#subtract');
subtractButton.addEventListener('click', () => {
  if (value1 === '') return;
  operate(value1, value2, operator);
  operator = 'subtract';
});

const divideButton = document.querySelector('#divide');
divideButton.addEventListener('click', () => {
  if (value1 === '') return;
  operate(value1, value2, operator);
  operator = 'divide';
});

const multiplyButton = document.querySelector('#multiply');
multiplyButton.addEventListener('click', () => {
  if (value1 === '') return;
  operate(value1, value2, operator);
  operator = 'multiply';
});

const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', () => {
  if (value1 === '') return;
  operate(value1, value2, operator);
});

// Map keyboard keys to calculator keys
window.addEventListener('keydown', (e) => {
  console.log(e.key);
  if (e.key.match(/[0-9\.]/)) {
    const numButton = document.querySelector(`button[data-key="${e.key}"]`);
    numButton.click();
    numButton.focus();
    numButton.classList.add('clicked');
  }
  if (e.key === '+') {
    plusButton.click();
    plusButton.focus();
  }
  if (e.key === '-') {
    subtractButton.click();
    subtractButton.focus();
  }
  if (e.key === '*' || e.key === 'x') {
    multiplyButton.click();
    multiplyButton.focus();
  }
  if (e.key === '/') {
    divideButton.click();
    divideButton.focus();
  }
  if (e.key === '=' || e.key === 'Enter') {
    e.preventDefault();
    equalsButton.click();
  }
  if (e.key === 'Escape') {
    clearButton.click();
  }
});

const numberButtons = document.querySelectorAll('.number');
// Capture number button clicks & display them
numberButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    assignValue(e.target.textContent);
  });
});

// Apply button outline animation on button click
numberButtons.forEach((button) => {
  button.addEventListener('transitionend', (e) => {
    e.target.classList.remove('clicked');
  });
});

// Determine which value variable to assign the number button click
const assignValue = (input) => {
  // Block when users try to add multiple decimals
  if (
    (input === '.' && hasDecimal(value1) && canAppendToValue1) ||
    (input === '.' && hasDecimal(value2))
  ) {
    return;
  }
  // Don't let people enter a ton of zeros before the number
  if (value1 === '0' || value2 === '0') {
    removeLeadingZero();
  }
  if (canAppendToValue1) {
    value1 += input;
  } else if (operator === '' && !canAppendToValue1) {
    value1 = input;
    canAppendToValue1 = true;
  } else if (operator !== '' && value1 !== '') {
    value2 += input;
  }
  updateDisplay();
};

const hasDecimal = (str) => {
  return str.indexOf('.') > -1;
};

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
  clearButton.classList.add('cleared');
  clear();
});

clearButton.addEventListener('transitionend', (e) => {
  e.target.classList.remove('cleared');
});

const clear = () => {
  value1 = '';
  value2 = '';
  operator = '';
  canAppendToValue1 = true;
  updateDisplay();
};

const removeLeadingZero = () => {
  if (value1.indexOf('0') === 0) value1 = value1.slice(1);
  if (value2.indexOf('0') === 0) value2 = value2.slice(1);
};

// Perform the calculation and return a total as value1
const operate = (v1, v2, op) => {
  // Don't run if second value is empty
  if (v2 === '') {
    canAppendToValue1 = false;
    return;
  }

  let total;
  v1 = Number(v1);
  v2 = Number(v2);

  if (operator == 'divide' && v2 === 0) {
    clear();
    return (document.querySelector(
      '#display > p'
    ).textContent = `!Inconceivable`);
  }
  if (op == 'plus') total = v1 + v2;
  if (op == 'subtract') total = v1 - v2;
  if (op == 'divide') total = v1 / v2;
  if (op == 'multiply') total = v1 * v2;

  clear();
  canAppendToValue1 = false;
  // Round the number to 10 decimal places
  total = Math.round(total * 10 ** 10) / 10 ** 10;
  // Display the total so that it fits on the calc screen
  if (total.toString().length > 15) {
    value1 = total.toExponential(4);
  } else {
    value1 = total.toString();
  }
  updateDisplay();
};

const updateDisplay = () => {
  const calcDisplay = document.querySelector('#display > p');

  if (value2.length > 0) {
    calcDisplay.textContent = value2;
  } else {
    calcDisplay.textContent = value1;
  }
};

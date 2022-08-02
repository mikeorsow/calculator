// on clear
// clear() => v1 = '', v2='', operator = '', canAppend = true

let value1 = '';
let value2 = '';
let operator = '';
let canAppendToValue1 = true;

const plusButton = document.querySelector('#sum');

plusButton.addEventListener('click', () => {
  if (value1 === '') return;
  if (value2.length > 0) {
    value1 = evaluate(value1, value2, operator);
    value2 = '';
  }
  canAppendToValue1 = false;
  operator = 'plus';
  updateDisplay();
});

const subtractButton = document.querySelector('#subtract');

subtractButton.addEventListener('click', () => {
  if (value1 === '') return;
  if (value2.length > 0) {
    value1 = evaluate(value1, value2, operator);
    value2 = '';
  }
  canAppendToValue1 = false;
  operator = 'subtract';
  updateDisplay();
});

const divideButton = document.querySelector('#divide');

divideButton.addEventListener('click', () => {
  if (value1 === '') return;
  if (value2.length > 0) {
    value1 = evaluate(value1, value2, operator);
    value2 = '';
  }
  canAppendToValue1 = false;
  operator = 'divide';
  updateDisplay();
});

const multiplyButton = document.querySelector('#multiply');

multiplyButton.addEventListener('click', () => {
  if (value1 === '') return;
  if (value2.length > 0) {
    value1 = evaluate(value1, value2, operator);
    value2 = '';
  }
  canAppendToValue1 = false;
  operator = 'multiply';
  updateDisplay();
});


const equalsButton = document.querySelector('#equals');

equalsButton.addEventListener('click', () => {
  if (value2 === '') return; // ignore if no second value
  value1 = evaluate(value1, value2, operator);
  value2 = '';
  operator = '';
  canAppendToValue1 = false;
  updateDisplay();
});

const numberButtons = document.querySelectorAll('.number');

numberButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    // Assign button click to the proper value variable
    if (canAppendToValue1) {
      value1 += e.target.textContent;
    } else if (operator === '' && !canAppendToValue1) {
      value1 = e.target.textContent;
      canAppendToValue1 = true;
    } else if (operator !== '') {
      value2 += e.target.textContent;
    }
    updateDisplay();
  });
});

// const removeLeadingZero = () => {
//   if (value1.indexOf(0) === 0) value1 = value1.slice(1);
//   if (value2.indexOf(0) === 0) value2 = value2.slice(1);
// }

const evaluate = (v1, v2, operator) => {
  v1 = Number(v1);
  v2 = Number(v2);
  if (operator == 'plus') return v1 + v2;
  if (operator == 'subtract') return v1 - v2;
  if (operator == 'divide') return v1 / v2;
  if (operator == 'multiply') return v1 * v2;
};

const updateDisplay = () => {
  if (value2.length > 0) {
    console.log(`update display, value 2`);
    document.querySelector('#display > p').textContent = value2;
  } else {
    console.log(`update display, value 1`);
    document.querySelector('#display > p').textContent = value1;
  }
};


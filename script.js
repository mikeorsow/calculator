// details & edge cases to handle
// divide by 0
// DONE - multiply by 0
// only one decimal in a number
// DONE - if first number is a zero, replace it.
// DONE - looooong repeating numbers

// BUG - After refactor, plus is not working after equals

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
  // ignore if no second value
  operate(value1, value2, operator);
});

const numberButtons = document.querySelectorAll('.number');

numberButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const number = e.target.textContent;
    // Assign button click to the proper value variable
    if (canAppendToValue1) {
      removeAnyLeadingZero();
      value1 += number;
    } else if (operator === '' && !canAppendToValue1) {
      value1 = number;
      canAppendToValue1 = true;
    } else if (operator !== '') {
      removeAnyLeadingZero();
      value2 += number;
    }
    updateDisplay();
  });
});

const clearButton = document.querySelector('#clear');

clearButton.addEventListener('click', () => clear());

const removeAnyLeadingZero = () => {
  if (value1.indexOf('0') === 0) value1 = value1.slice(1);
  if (value2.indexOf('0') === 0) value2 = value2.slice(1);
};

const clear = () => {
  value1 = '';
  value2 = '';
  operator = '';
  canAppendToValue1 = true;
  updateDisplay();
  console.log('clear!');
};

const operate = (v1, v2, operator) => {
  console.log(`operate fired`);

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
    ).textContent = `Inconceivable!`);
  }
  if (operator == 'plus') total = v1 + v2;
  if (operator == 'subtract') total = v1 - v2;
  if (operator == 'divide') total = v1 / v2;
  if (operator == 'multiply') total = v1 * v2;
  value2 = '';
  operator = '';
  canAppendToValue1 = false;
  value1 = (Math.round(total * 100000) / 100000).toString();
  updateDisplay();
};

const updateDisplay = () => {
  if (value2.length > 0) {
    document.querySelector('#display > p').textContent = value2;
  } else {
    document.querySelector('#display > p').textContent = value1;
  }
};

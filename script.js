
// on clear
// clear() => v1 = '', v2='', operator = '', canAppend = true

// To-Do: 
// IN PROGRESS - subtract
// divide
// multiply




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
      console.log(`Value 2, baby.`);
    }
    updateDisplay();
  });
});

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


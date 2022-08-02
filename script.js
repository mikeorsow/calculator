// need to think through the if/then for values in the object, then need to work out the 'run equation' piece
// Testing - if operator is empty, write to Value 1.
// scenario: add 2 numbers, hit equals, add 2 numbers hit equals
// O='',v1='',v2='', canAppend: true
// press 5: O='',v1='5',v2='', canAppend: true        | display v1 (5)
// press +: O='plus',v1='5',v2='', canAppend: false   | display v1 (5)
// press 3: O='plus',v1='5',v2='3', canAppend: false  | display v2 (3)
// press =: O='',v1='8',v2='', canAppend: false       | display v1 (8)
// press +: O='plus',v1='8',v2='', canAppend: false   | display v1 (8)
// press 2: O='plus',v1='8',v2='2', canAppend: false   | display v2 (2)
// press +: if v1 & v2, evaluate(v1, v2, 'plus'), sets v1 to 10, v2='', sets o='plus' | display v1 (10)
// press 5: O='plus',v1='8',v2='5', canAppend: false   | display v2 (5)
// press =: evaluate(8,5,+), O='',v1='13',v2='', canAppend: false | display v1 (13)
// press 4: O='',v1='4',v2='', canAppend: true        | display v1 (4)
//

// on plus button
// if v1 === '', return.
// if v2 !== '', evaluate(v1, v2, operator)
// set operator = 'plus'

// on equals
// if v2 === '', return
// v1 = evaluate(v1, v2, operator) {
//  if operator = 'plus' then v1 = sum(v1, v2)
//  if operator = 'subtract' then v1 = subtract(v1, v2)
//  if operator = 'multiply' then v1 = multiply(v1, v2)
//  if operator = 'divide' then v1 = divide(v1, v2)
// v2 = ''
// opeartor = ''
// canAppend = false

// on clear
// clear() => v1 = '', v2='', operator = '', canAppend = true

const numberButtons = document.querySelectorAll('.number');

const equalsButton = document.querySelector('#equals');

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

const evaluate = (v1, v2, operator) => {
  v1 = Number(v1);
  v2 = Number(v2);
  if (operator == 'plus') return v1 + v2;
  if (operator == 'subtract') return v1 - v2;
  if (operator == 'divide') return v1 / v2;
  if (operator == 'multiply') return v1 * v2;
};

equalsButton.addEventListener('click', () => showTotal());

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

const updateDisplay = () => {
  if (value2.length > 0) {
    console.log(`update display, value 2`);
    document.querySelector('#display > p').textContent = value2;
  } else {
    console.log(`update display, value 1`);
    document.querySelector('#display > p').textContent = value1;
  }
};

const sum = () => {
  currentOperator = 'plus';
  // When a user clicks the equals button, then clicks the plus button, we need to use the total as the current number.
  if (currentNumber == '' && subTotal == '') {
    currentNumber = total;
  }
  subTotal = Number(currentNumber) + Number(subTotal);
  // Reset currentNumber after hitting plus key
  currentNumber = '';
  return subTotal;
};

const calculateTotal = (val1, val2, operator) => {
  if (operator == 'plus') {
    return val1 + val2;
  }
};

const showTotal = () => {
  if (currentOperator == '') {
    return;
  }
  if (currentOperator == 'plus') {
    total = sum();
  }
  // Clear everything except total, since it might be used in the next calculation
  subTotal = '';
  currentNumber = '';
  currentOperator = '';
  return displayOnScreen(total);
};

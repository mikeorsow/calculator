const displayed = document.querySelector("#display > p");
const numberButtons = document.querySelectorAll(".number");
const sumButton = document.querySelector("#sum");
const equalsButton = document.querySelector("#equals");

let currentNumber = "";
let subTotal = "";
let total = "";
let currentOperator = "";

const displayOnScreen = (num) => {
  document.querySelector("#display > p").textContent = num;
};

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // start a new number if there is no operator
    if (currentOperator == "") {
      total = "";
    }
    currentNumber += e.target.textContent;
    displayOnScreen(currentNumber);
  });
});

sumButton.addEventListener("click", () => {
  return (displayed.textContent = sum());
});

const sum = () => {
  currentOperator = "plus";
  if (currentNumber == "" && subTotal == "") {
    subTotal = total;
  } else {
    subTotal = Number(currentNumber) + Number(subTotal);
  }
  currentNumber = "";
  return subTotal;
};

equalsButton.addEventListener("click", () => showTotal());

const showTotal = () => {
  if (currentOperator == "") {
    return;
  }
  if (currentOperator == "plus") {
    total = sum();
  }
  //clear everything except Total
  subTotal = "";
  (currentNumber = ""), (currentOperator = "");
  return (displayed.textContent = total);
};

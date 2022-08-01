let currentNumber = "";
let subTotal = "";
let total = "";
let currentOperator = "";

const numberButtons = document.querySelectorAll(".number");
const plusButton = document.querySelector("#sum");
const equalsButton = document.querySelector("#equals");

plusButton.addEventListener("click", () => displayOnScreen(sum()));
equalsButton.addEventListener("click", () => showTotal());
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

const displayOnScreen = (num) => {
    document.querySelector("#display > p").textContent = num;
  };

const sum = () => {
  currentOperator = "plus";
  // When a user clicks the equals button, then clicks the plus button, we need to use the total as the current number.
  if (currentNumber == "" && subTotal == "") {
    currentNumber = total;
  }
  subTotal = Number(currentNumber) + Number(subTotal);
  // Reset currentNumber after hitting plus key
  currentNumber = "";
  return subTotal;
};

const showTotal = () => {
  if (currentOperator == "") {
    return;
  }
  if (currentOperator == "plus") {
    total = sum();
  }
  // Clear everything except total, since it might be used in the next calculation
  subTotal = "";
  currentNumber = "";
  currentOperator = "";
  return displayOnScreen(total);
};

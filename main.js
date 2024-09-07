const numberBtns = document.querySelectorAll(".btn--key");
const operationBtns = document.querySelectorAll(".btn--op");
const sumBtn = document.querySelector(".btn--sum");
let screenCurrent = document.querySelector(".screen-current");
let screenPrevious = document.querySelector(".screen-previous");

numberBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    calculator.makeNumber(e.target.value);
    calculator.display();
  });
});

operationBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    calculator.makeOperation(e.target.value);
    calculator.display();
  });
});

sumBtn.addEventListener("click", (e) => {
  calculator.calculate();
  calculator.display();
});

class Calculator {
  constructor(screenPrevious, screenCurrent) {
    this.screenPrevious = screenPrevious;
    this.screenCurrent = screenCurrent;
    this.clear();
  }

  makeNumber(selectedNumber) {
    if (selectedNumber === "." && this.currentNumber.includes(".")) return;
    this.currentNumber =
      this.currentNumber.toString() + selectedNumber.toString();
    console.log(this.screenPrevious);
  }

  clear() {
    this.currentNumber = "";
    this.previousNumber = "";
    this.operator = "";
  }

  display() {
    screenCurrent.value = this.currentNumber;
    //RESET FOR NULL OPERATOR 
    screenPrevious.value = "";
    //
    if(this.operator !== null) {
        screenPrevious.value = this.previousNumber + this.operator;
  }
};

  makeOperation(operator) {
    if (this.previousNumber) {
      this.calculate();
    }

    this.previousNumber = this.currentNumber;
    this.currentNumber = "";
    this.operator = operator;
  }

  calculate() {
    let result;
    let currentNumberParsed = parseInt(this.currentNumber);
    let previousNumberParsed = parseInt(this.previousNumber);
if(isNaN(currentNumberParsed) || isNaN(previousNumberParsed)) return;
    switch (this.operator) {
      case "+":
        result = previousNumberParsed + currentNumberParsed;
        break;

      case "-":
        result = previousNumberParsed - currentNumberParsed;
        break;

      case "/":
        result = previousNumberParsed / currentNumberParsed;
        break;

        case "*":
            result = previousNumberParsed * currentNumberParsed;

        default:
        break;
    }

    this.currentNumber = result;
    this.previousNumber = "";
    this.operator = null;
  }
}

const calculator = new Calculator(screenPrevious, screenCurrent);

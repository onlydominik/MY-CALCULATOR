const numberBtns = document.querySelectorAll(".btn--key");
const operationBtns = document.querySelectorAll(".btn--op");
const sumBtn = document.querySelector(".btn--sum");
const clearBtn = document.querySelector(".btn--clear");
const deleteBtn = document.querySelector(".btn--delete");
const shiftBtn = document.querySelector(".btn--shift");
let screenCurrent = document.querySelector(".screen--current");
let screenPrevious = document.querySelector(".screen--previous");


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

sumBtn.addEventListener("click", () => {
  calculator.calculate();
  calculator.display();
  calculator.clear();
});

clearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.display();
});

deleteBtn.addEventListener("click", () => {
 calculator.delete();
 calculator.display();
});

shiftBtn.addEventListener("click", () => {
  calculator.shiftCurrentValue();
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

      //divide

      

  }

  clear() {
    this.currentNumber = "";
    this.previousNumber = "";
    this.operator = "";
  }

  display() {
    this.screenCurrent.value = this.currentNumber;
    //RESET FOR NULL OPERATOR
    screenPrevious.value = "";
    //
    if (this.operator !== null) {
      screenPrevious.value = this.previousNumber + this.operator;
    }    

    //SEPARATE WITH COMMA
    this.screenCurrent.value = this.currentNumber.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
  }

  makeOperation(operator) {
    if (this.currentNumber === "") return;
    if (this.previousNumber) {
      this.calculate(false);
    }

    this.previousNumber = this.currentNumber;
    this.currentNumber = "";
    this.operator = operator;
  }

  calculate() {
    let result;
    let currentNumberParsed = parseFloat(this.currentNumber);
    let previousNumberParsed = parseFloat(this.previousNumber);
    if (isNaN(currentNumberParsed) || isNaN(previousNumberParsed)) return;
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

  delete() {
    this.currentNumber = this.currentNumber.slice(0, -1)
  }

  shiftCurrentValue() {
    this.currentNumber = this.currentNumber * -1;
  }
}

const calculator = new Calculator(screenPrevious, screenCurrent);

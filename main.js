const numberBtns = document.querySelectorAll(".btn--key");
const operationBtns = document.querySelectorAll(".btn--op");
const sumBtn = document.querySelector(".btn--sum");
const clearBtn = document.querySelector(".btn--clear");
const deleteBtn = document.querySelector(".btn--delete");
const shiftBtn = document.querySelector(".btn--shift");
let screenCurrent = document.querySelector(".screen--current");
let screenPrevious = document.querySelector(".screen--previous");
let screenHistory = document.querySelector(".screen--history");

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
  constructor(screenPrevious, screenCurrent, screenHistory) {
    this.screenPrevious = screenPrevious;
    this.screenCurrent = screenCurrent;
    this.screenHistory = screenHistory;
    this.clear();
  }

  makeNumber(selectedNumber) {
    if (selectedNumber === "." && this.currentNumber.includes(".")) return;
    //CLEAR AFTER SUM
    if (this.operator === null && this.screenPrevious.value === "")
      this.clear();
    //
    this.currentNumber =
      this.currentNumber.toString() + selectedNumber.toString();
  }

  clear() {
    this.currentNumber = "";
    this.previousNumber = "";
    this.operator = "";
    //this.historyEquation = "";
    //this.screenHistory.value = ""
  }

  display() {
    this.screenCurrent.value = this.currentNumber;
    //RESET FOR NULL OPERATOR
    screenPrevious.value = "";
    //
    //if(this.historyEquation) this.screenHistory.value = this.historyEquation
    if (this.operator !== null) {
      screenPrevious.value = this.previousNumber + " " + this.operator;
    }

    //SEPARATE WITH COMMA
    this.screenCurrent.value = this.currentNumber
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
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

      case "÷":
        result = previousNumberParsed / currentNumberParsed;
        if(previousNumberParsed > 0 && currentNumberParsed === 0) result = "Infinity"
        if(previousNumberParsed < 0 && currentNumberParsed === 0) result = "-Infinity"
        if(isNaN(result)) result = "Error"
        break;

      case "x":
        result = previousNumberParsed * currentNumberParsed;

      default:
        break;
    }
    //this.historyEquation = `${this.currentNumber} ${this.operator} ${this.previousNumber} = ${result}`;

    this.currentNumber = result;
    this.previousNumber = "";
    this.operator = null;
  }

  delete() {
    if (this.currentNumber)
      this.currentNumber = this.currentNumber.toString().slice(0, -1);
  }

  shiftCurrentValue() {
    this.currentNumber = this.currentNumber * -1;
  }
}

const calculator = new Calculator(screenPrevious, screenCurrent, screenHistory);

document.addEventListener("keydown", (e) => {
  if (!isNaN(parseInt(e.key))) {
    calculator.makeNumber(e.key);
    calculator.display();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key == "+" || e.key == "-" || e.key == "/") {
    calculator.makeOperation(e.key);
    calculator.display();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key == "=" || e.key == "Enter") {
    calculator.calculate();
    calculator.display();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key == "Backspace") {
    calculator.delete();
    calculator.display();
  }
});

//THEME
let darkTheme = localStorage.getItem("darkTheme");
const themeBtn = document.querySelector("#theme-switch");
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  localStorage.setItem("darkTheme", "enabled");
}
if (darkTheme === "enabled") document.documentElement.classList.add("dark-theme");
themeBtn.addEventListener("click", () => {
  darkTheme = localStorage.getItem("darkTheme");
  document.documentElement.classList.toggle("dark-theme");
  if (darkTheme === "enabled") {
    localStorage.removeItem("darkTheme");
    return;
  }
  localStorage.setItem("darkTheme", "enabled");
});


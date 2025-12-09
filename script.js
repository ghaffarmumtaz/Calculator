let colorToggle = document.querySelector('.colorToggle');

colorToggle.addEventListener('click', function(){
  let colorIcon = document.querySelector('#colorIcon')
  colorIcon.innerHTML = `<p> <i class="fa-regular fa-sun"></i> </p>`
  let body = document.querySelector('.calcBox');

  body.classList.toggle('active');

  let a = document.querySelectorAll('a');

  a.forEach(function(a){
   a.classList.toggle('aactive')
  })
  
  
})



// Select Displays
const displayPrev = document.querySelector(".perfom");
const displayCurrent = document.querySelector(".excu");

// All Buttons
const numbers = document.querySelectorAll(".num");
const btnPlus = document.querySelector(".plus");
const btnMinus = document.querySelector(".minus");
const btnMulti = document.querySelector(".multi");
const btnDivide = document.querySelector(".divide");
const btnPercent = document.querySelector(".persent");
const btnEqual = document.querySelector(".equal");
const btnClear = document.querySelector(".clear");
const btnAC = document.querySelector(".caculateBox div:first-child");

// Variables
let current = "";
let previous = "";
let operator = "";

// Update Display
function updateDisplay() {
    displayCurrent.textContent = current || "";
    displayPrev.textContent = previous ? `${previous} ${operator}` : "";
}

// Add Number
numbers.forEach(num => {
    num.addEventListener("click", () => {
        const value = num.textContent.trim();

        // Prevent adding + inside numbers (your UI had a mistake)
        if (value === "+") {
            operator = "+";
            chooseOperator("+");
            return;
        }

        // Decimal control
        if (value === "." && current.includes(".")) return;

        current += value;
        updateDisplay();
    });
});

// Choose Operator
function chooseOperator(op) {
    if (current === 0) return;

    if (previous !== "") {
        calculate();
    }

    operator = op;
    previous = current;
    current = "";
    updateDisplay();
}

// Operator Buttons
btnPlus.addEventListener("click", () => chooseOperator("+"));
btnMinus.addEventListener("click", () => chooseOperator("-"));
btnMulti.addEventListener("click", () => chooseOperator("*"));
btnDivide.addEventListener("click", () => chooseOperator("/"));
btnPercent.addEventListener("click", () => chooseOperator("%"));

// Calculate Result
function calculate() {
    if (previous === "" || current === "" || operator === "") return;

    let result;
    let prev = parseFloat(previous);
    let curr = parseFloat(current);

    switch (operator) {
        case "+": result = prev + curr; break;
        case "-": result = prev - curr; break;
        case "*": result = prev * curr; break;
        case "/": 
            if (curr === "") {
                result = "Error";
            } else {
                result = prev / curr;
            }
            break;
        case "%": 
            result = (prev / 100) * curr;
            break;
        default: return;
    }

    current = String(result);
    previous = "";
    operator = "";
    updateDisplay();
}

btnEqual.addEventListener("click", calculate);

// Clear One (Backspace)
btnClear.addEventListener("click", () => {
    current = current.slice(0, -1);
    updateDisplay();
});

// All Clear (AC)
btnAC.addEventListener("click", () => {
    current = "";
    previous = "";
    operator = "";
    updateDisplay();
});

// First Display Update
updateDisplay();

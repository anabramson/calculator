function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Division by 0";
    }
    return a / b;
}

// Variables to store calculator state
let currentInput = '';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;

const display = document.getElementById('display');

// Function to update the display
function updateDisplay(value) {
    display.textContent = value;
}

// Function to handle digit button clicks
document.querySelectorAll('.digit').forEach(button => {
    button.addEventListener('click', () => {
        currentInput += button.textContent;
        updateDisplay(currentInput);
    });
});

// Function to handle operator button clicks
document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
            currentOperator = button.textContent;
            currentInput = '';
        } else if (currentInput) {
            secondOperand = parseFloat(currentInput);
            firstOperand = operate(currentOperator, firstOperand, secondOperand);
            currentOperator = button.textContent;
            updateDisplay(firstOperand);
            currentInput = '';
        }
    });
});

// Function to execute the operation
function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return b;
    }
}

// Function to handle equals button click
document.getElementById('equals').addEventListener('click', () => {
    if (firstOperand !== null && currentInput) {
        secondOperand = parseFloat(currentInput);
        const result = operate(currentOperator, firstOperand, secondOperand);
        updateDisplay(result);
        firstOperand = result;
        currentInput = '';
        currentOperator = null;
    }
});

// Function to handle clear button click
document.getElementById('clear').addEventListener('click', () => {
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    currentInput = '';
    updateDisplay('0');
});
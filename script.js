const text = document.querySelector('#text');
const button = document.querySelectorAll('.button');
button.forEach(x => {
  x.addEventListener('mousedown', () => {
    x.classList.add('pressed');
  });
});
let firstNumber;
let secondNumber;
let operator;
button.forEach(x => {
  x.addEventListener('click', e => {
    if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
      .includes(e.target.textContent) && firstNumber === undefined
    ) {
      x.classList.remove('pressed');
      text.textContent += e.target.textContent;
    } else if (['+', '-', '×', '÷'].includes(e.target.textContent)) {
      operator = e;
      firstNumber = +text.textContent;
    } else if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
      .includes(e.target.textContent) && secondNumber === undefined
    ) {
      if (firstNumber === +text.textContent) {
        text.textContent = '';
      }
      if (operator.target.className === 'button pressed') {
        operator.target.classList.remove('pressed');
      }
      x.classList.remove('pressed');
      text.textContent += e.target.textContent;
    } else if (['='].includes(e.target.textContent)) {
      operator = operator.target.textContent;
      secondNumber = +text.textContent;
      x.classList.remove('pressed');
      text.textContent = '';
      operate(operator, firstNumber, secondNumber);
    }
  });
});
function operate(operator, firstNumber, secondNumber) {
  return operator === '+' ? add(firstNumber, secondNumber)
    : operator === '-' ? subtract(firstNumber, secondNumber)
      : operator === '×' ? multiply(firstNumber, secondNumber)
        : divide(firstNumber, secondNumber);

}
function add(firstNumber, secondNumber) {
  text.textContent = firstNumber + secondNumber;
}
function subtract(firstNumber, secondNumber) {
  text.textContent = firstNumber - secondNumber;
}
function multiply(firstNumber, secondNumber) {
  text.textContent = firstNumber * secondNumber;
}
function divide(firstNumber, secondNumber) {
  text.textContent = firstNumber / secondNumber;
}

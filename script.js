const text = document.querySelector('#text');
const button = document.querySelectorAll('.button');
button.forEach(x => {
  x.addEventListener('mousedown', () => {
    x.classList.add('pressed');
  });
});
button.forEach(x => {
  x.addEventListener('mouseup', () => {
    x.classList.remove('pressed');
  });
});
button.forEach(x => {
  x.addEventListener('click', e => {
    text.textContent += e.target.textContent;
    if (['+', '-', '×', '÷'].includes(e.target.textContent)) {
      const sign = text.textContent.match(/\W/)[0];
      const firstNumber = +text.textContent.match(/\w+/)[0];
      operate(sign, firstNumber);
      console.log(text.textContent)
    }
  });
});
function operate(operator, firstNumber) {
  button.forEach(x => {
    x.addEventListener('click', e => {
      const secondNumber = +text.textContent.match(/(?<=\W)\w+/)[0];
      if (e.target.textContent === '=') {
        return operator === '+' ? add(firstNumber, secondNumber)
          : operator === '-' ? subtract(firstNumber, secondNumber)
            : operator === '×' ? multiply(firstNumber, secondNumber)
              : divide(firstNumber, secondNumber);
      }
    });
  });
}
function add(firstNumber, secondNumber) {
  display.textContent = firstNumber + secondNumber;
}
function subtract(firstNumber, secondNumber) {
  display.textContent = firstNumber - secondNumber;
}
function multiply(firstNumber, secondNumber) {
  display.textContent = firstNumber * secondNumber;
}
function divide(firstNumber, secondNumber) {
  display.textContent = firstNumber / secondNumber;
}

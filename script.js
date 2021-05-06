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
let newOperator;

button.forEach(x => {
  x.addEventListener('click', () => {
    if (/\d/.test(x.textContent) && firstNumber !== 0 && !firstNumber) {
      if (secondNumber === 'new') {
        text.textContent = '';
        secondNumber = undefined;
      }
      x.classList.remove('pressed');
      text.textContent += x.textContent;
      if (/0\d/.test(text.textContent)) {
        text.textContent = x.textContent;
      }
    } else if (['+', '-', '×', '÷'].includes(x.textContent)
      && text.textContent && !operator) {
      operator = x;
      firstNumber = +text.textContent;
    } else if (/\d/.test(x.textContent) && operator) {
      if (firstNumber === +text.textContent) {
        text.textContent = '';
      }
      if (operator.className === 'button operator pressed') {
        operator.classList.remove('pressed');
      }
      x.classList.remove('pressed');
      text.textContent += x.textContent;
    } else if (x.textContent === '=' && operator
      && operator.className !== 'button operator pressed') {
      operator = operator.textContent;
      secondNumber = +text.textContent;
      x.classList.remove('pressed');
      text.textContent = '';
      newOperator = undefined;
      operate();
    } else if (['+', '-', '×', '÷'].includes(x.textContent)
      && firstNumber && operator.className !== 'button operator pressed') {
      operator = operator.textContent;
      secondNumber = +text.textContent;
      text.textContent = '';
      newOperator = x;
      operate();
    } else if (['◄'].includes(x.textContent)) {
      text.textContent = text.textContent.slice(0, text.textContent.length - 1);
      x.classList.remove('pressed');
    } else if (/./.test(x.textContent)) {
      x.classList.remove('pressed');
    }
  });
});
function operate() {
  if (operator === '+') {
    text.textContent = firstNumber + secondNumber;
  } else if (operator === '-') {
    text.textContent = firstNumber - secondNumber;
  } else if (operator === '×') {
    text.textContent = firstNumber * secondNumber;
  } else if (operator === '÷') {
    if (secondNumber === 0) {
      secondNumber = 1;
    }
    text.textContent = (firstNumber / secondNumber).toFixed(2);
  }
  if (['+', '-', '×', '÷'].includes(operator)) {
    firstNumber = +text.textContent;
    operator = newOperator;
  }
  if (!newOperator) {
    firstNumber = undefined;
    secondNumber = 'new';
  }
}

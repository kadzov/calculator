const text = document.querySelector('#text');
const button = document.querySelectorAll('.button');
let firstNumber;
let secondNumber;
let operator;
let newOperator;
button.forEach(x => {
  x.addEventListener('mousedown', () => {
    x.classList.add('pressed');
    calculator(x);
  });
});
document.addEventListener('keydown', e => {
  const keydown = Array.from(button).find(x => x.id === e.key);
  if (keydown) {
    keydown.classList.add('pressed');
    calculator(keydown);
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Backspace') {
    text.textContent = text.textContent.slice(0, text.textContent.length - 1);
  }
});
function calculator(x) {
  if (/\d/.test(x.textContent) && firstNumber !== 0 && !firstNumber) {
    if (secondNumber === 'new') {
      text.textContent = '';
      secondNumber = undefined;
    }
    setTimeout(() => x.classList.remove('pressed'), 100);
    text.textContent += x.textContent;
    if (/0\d/.test(text.textContent)) {
      text.textContent = x.textContent;
    }
  } else if (['+', '-', '*', '/'].includes(x.id)
    && text.textContent && !operator) {
    operator = x;
    firstNumber = +text.textContent;
  } else if (/\d/.test(x.textContent) && operator) {
    if (operator.className === 'button operator pressed') {
      text.textContent = '';
      operator.classList.remove('pressed');
    }
    setTimeout(() => x.classList.remove('pressed'), 100);
    text.textContent += x.textContent;
  } else if (x.textContent === '=' && operator
    && operator.className !== 'button operator pressed') {
    operator = operator.id;
    secondNumber = +text.textContent;
    setTimeout(() => x.classList.remove('pressed'), 100);
    text.textContent = '';
    newOperator = undefined;
    operate();
  } else if (['+', '-', '*', '/'].includes(x.id) && firstNumber
    && operator.className !== 'button operator pressed'
    || operator.id === x.id) {
    operator = operator.id;
    secondNumber = +text.textContent;
    text.textContent = '';
    newOperator = x;
    operate();
  } else if (['.'].includes(x.textContent) && !/\./.test(text.textContent)) {
    text.textContent += '.';
    setTimeout(() => x.classList.remove('pressed'), 100);
  } else {
    setTimeout(() => x.classList.remove('pressed'), 100);
  }
}
function operate() {
  if (operator === '+') {
    text.textContent = firstNumber + secondNumber;
  } else if (operator === '-') {
    text.textContent = firstNumber - secondNumber;
  } else if (operator === '*') {
    text.textContent = firstNumber * secondNumber;
  } else if (operator === '/') {
    if (secondNumber === 0) {
      secondNumber = 1;
    }
    text.textContent = Math.round(firstNumber / secondNumber * 100) / 100;
  }
  firstNumber = +text.textContent;
  operator = newOperator;
  if (!newOperator) {
    firstNumber = undefined;
    secondNumber = 'new';
  }
}

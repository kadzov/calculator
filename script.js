const text = document.querySelector('#text');
const button = document.querySelectorAll('.button');
let firstNumber;
let secondNumber;
let operator;
let newOperator;
let pressed;
let equalsPressed;
button.forEach(e => {
  e.addEventListener('mousedown', () => {
    if (e.id === '=' && equalsPressed === 1) {
      e.classList.remove('pressed');
    } else if ((pressed === 'no' || !pressed || /\d/.test(e.id))) {
      e.classList.add('pressed');
    }
    calculator(e);
  });
});
document.addEventListener('keydown', e => {
  const keydown = Array.from(button).find(x => x.id === e.key);
  if (keydown) {
    keydown.classList.add('pressed');
    calculator(keydown);
  } else if (e.key === 'Backspace' && pressed !== 'yes') {
    text.textContent = text.textContent.slice(0, text.textContent.length - 1);
    if (text.textContent === '') {
      text.textContent = 0;
    }
  }
});
function calculator(e) {
  if (/\d/.test(e.id) && !firstNumber && firstNumber !== 0) {
    if (secondNumber === 'new') {
      text.textContent = '';
      secondNumber = undefined;
    }
    setTimeout(() => e.classList.remove('pressed'), 100);
    text.textContent += e.id;
    if (/0\d/.test(text.textContent)) {
      text.textContent = e.id;
    }
  } else if (['+', '-', '*', '/'].includes(e.id)
    && text.textContent && !operator) {
    pressed = 'yes';
    operator = e;
    firstNumber = +text.textContent;
  } else if (/\d/.test(e.id) && operator) {
    if (pressed === 'yes') {
      text.textContent = '';
      operator.classList.remove('pressed');
      pressed = 'no';
    }
    setTimeout(() => e.classList.remove('pressed'), 100);
    text.textContent += e.id;
    equalsPressed = 0;
    if (/0\d/.test(text.textContent)) {
      text.textContent = e.id;
    }
  } else if (e.id === '=' && operator && pressed === 'no') {
    operator = operator.id;
    secondNumber = +text.textContent;
    setTimeout(() => e.classList.remove('pressed'), 100);
    text.textContent = '';
    newOperator = undefined;
    equalsPressed = 1;
    operate();
  } else if (['+', '-', '*', '/'].includes(e.id)
    && pressed === 'no' && firstNumber) {
    pressed = 'yes';
    operator = operator.id;
    secondNumber = +text.textContent;
    text.textContent = '';
    newOperator = e;
    operate();
  } else if (['.'].includes(e.id) && (pressed === 'no' || !pressed)) {
    if (secondNumber === 'new') {
      text.textContent = '0';
      secondNumber = undefined;
    }
    if (!/\./.test(text.textContent)) {
      text.textContent += '.';
    }
    setTimeout(() => e.classList.remove('pressed'), 100);
  }
}
function operate() {
  if (operator === '+') {
    text.textContent = Math.round((firstNumber + secondNumber) * 100) / 100;
  } else if (operator === '-') {
    text.textContent = Math.round((firstNumber - secondNumber) * 100) / 100;
  } else if (operator === '*') {
    text.textContent = Math.round(firstNumber * secondNumber * 100) / 100;
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

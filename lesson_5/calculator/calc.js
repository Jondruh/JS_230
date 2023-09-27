/*
create a calculator app with four operations: + - / *
use a form with two fields for numbers
a drop down box to select the operator
a submit button that is the equal button
display the result
*/

document.addEventListener('DOMContentLoaded', () => {
  let calcForm = document.querySelector('#calc-buttons');

  calcForm.addEventListener('submit', event => {
    event.preventDefault(); 

    let operand1 = Number(document.querySelector('#operand1').value);
    let operand2 = Number(document.querySelector('#operand2').value);
    let operator = document.querySelector('#operator').value;
    let displayResult = document.querySelector('#result');

    let result;
    switch (operator) {
      case '+':
        result = operand1 + operand2;
        break;
      case '-':
        result = operand1 - operand2;
        break;
      case '*':
        result = operand1 * operand2;
        break;
      case '/':
        result = operand1 / operand2.toFixed();
        break;
    }

    displayResult.innerText = result;
  });
});

document.addEventListener('DOMContentLoaded', () => {
  let answer = Math.floor(Math.random() * 100) + 1;
  let form = document.querySelector('form');
  let input = document.querySelector('#guess');
  let messageElement = document.querySelector('p');
  let guesses = 0;
  let button = form.querySelector('input[type=submit]');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let guess = parseInt(input.value, 10);
    let message;
    let invalidGuess = (guess > 100 || guess < 1)
    guesses += 1;

    if (invalidGuess) {
      message = guess + ' is not a valid number between 1 and 100'
    } else if (guess > answer) {
      message = 'My number is lower than ' + guess; 
    } else if (guess < answer) {
      message = 'My number is higher than ' + guess;
    } else {
      message = guess + ' is my number! It took you ' + guesses + ' guesses';
      button.disabled = true;
      button.style.boxShadow = '0px 0px 0px red';
      button.style.background = '#780E24 100%'
    }

    messageElement.textContent = message;
  });

  let newGame = document.querySelector('a');
  newGame.addEventListener('click', () => {
    answer = Math.floor(Math.random() * 100) + 1;
    guesses = 0;
    form.reset();
    button.disabled = false;
    button.style = null;
    
    messageElement.textContent = 'Please enter a number between 1 and 100';
  });
});
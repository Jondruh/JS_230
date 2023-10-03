
class Game {
  constructor(wordPool) {
    this.wordPool = wordPool;
    this.word;
    this.wordSlots = [];
    this.incorrectGuesses;
    this.lettersGuessed = [];
    this.allowedWrong = 6;

    // this.bindReplayListener();
    // document.body.addEventListener('keyup', this.onKeyup);
    // this.resetGame();
  }

  start() {
    this.#bindReplayListener();
    document.body.addEventListener('keyup', this.#onKeyup);
    this.#resetGame();
  }

  #bindReplayListener() {
    let newGame = document.querySelector('#replay');

    newGame.addEventListener('click', event => {
      event.preventDefault();

      this.#resetGame();
    });
  }

  #createGuessNode(content) {
    let guesses = document.querySelector('#guesses');
    let node = document.createElement('span');
    node.innerText = content;
    return guesses.appendChild(node);
  }

  #createSpaceNode(content) {
    let spaces = document.querySelector('#spaces');
    let node = document.createElement('span');
    node.innerText = content;
    return spaces.appendChild(node);
  }

  #resetGame() {
    this.word = this.#selectWord();
    if (!this.word) {
      this.#message("Sorry, I've run out of words!");
      return;
    }

    document.querySelector('#apples').className = '';
    document.body.className = '';
    document.querySelector('#replay').style.visibility = 'hidden';
    document.body.addEventListener('keyup', this.#onKeyup);
    this.incorrectGuesses = 0;
    this.lettersGuessed = [];
    this.wordSlots.length = this.word.length;
    this.wordSlots.fill(' ');
    this.#updateDisplay();
    this.#message('');
  }

  #onKeyup = event => {
    let key = event.key.toUpperCase();

    if (!key.match(/^[A-Z]$/) ||
        this.lettersGuessed.includes(key) ||
        event.ctrlKey) {
      return;
    }

    this.#updateGameState(key);
    this.#updateDisplay();
    let gameFinish = this.#gameFinished();
    if (gameFinish) {
      document.querySelector('#replay').style.visibility = 'visible';
      document.body.removeEventListener('keyup', this.#onKeyup);

      document.body.classList.add(gameFinish);
    }
  }

  #clearGuessNodes() {
    let guesses = document.querySelector('#guesses').children;
    guesses = Array.prototype.slice.call(guesses);

    guesses.forEach(child => {
      if (child.tagName === 'SPAN') {
        child.remove();
      }
    });
  }

  #clearSpaceNodes() {
    let spaces = document.querySelector('#spaces').children;
    spaces = Array.prototype.slice.call(spaces);

    spaces.forEach(child => {
      if (child.tagName === 'SPAN') {
        child.remove();
      }
    });
  }

  #updateDisplay() {
    this.#clearGuessNodes();
    this.#clearSpaceNodes();
    this.lettersGuessed.forEach(letter => this.#createGuessNode(letter));
    this.wordSlots.forEach(letter => this.#createSpaceNode(letter));

  }

  #gameFinished() {
    if (this.wordSlots.join('') === this.word) {
      this.#message("You've guessed the word!");
      return 'win';
    } else if (this.incorrectGuesses >= this.allowedWrong) {
      this.#message("You've run out of guesses!");
      return 'lose';
    }
    return false;
  }

  #updateGameState(letter) {
    this.#addKeytoGuessList(letter);

    if (this.#letterInWord(letter)) {
      this.#updateWordSlots(letter);
    } else {
      this.incorrectGuesses += 1;
      let apples = document.querySelector('#apples');
      apples.classList.add(`guess_${this.incorrectGuesses}`);
    }
  }

  #updateWordSlots() {
    this.wordSlots = this.wordSlots.map((_letter, index) => {
      if (this.lettersGuessed.includes(this.word[index])) {
        return this.word[index];
      } else {
        return ' ';
      }
    });
  }

  #letterInWord(letter) {
    return !!this.word.match(letter);
  }

  #addKeytoGuessList(key) {
    if (!this.lettersGuessed.includes(key)) {
      this.lettersGuessed.push(key);
      return key;
    }
    return undefined;
  }

  #selectWord() {
    if (this.wordPool.length === 0) {
      return undefined;
    }
    let index = Math.floor(Math.random() * this.wordPool.length);
    return this.wordPool.splice(index, 1)[0].toUpperCase();
  }

  #message(words) {
    document.querySelector('#message').innerHTML = words;
  }
}

let array = ['banana', 'pear', 'apple', 'orange'];

document.addEventListener('DOMContentLoaded', () => {
  let game = new Game(array);
  game.start();
});

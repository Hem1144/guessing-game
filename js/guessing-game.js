/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function shuffle(array) {
  var m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = this.generateWinningNumber();
  }

  generateWinningNumber() {
    return generateWinningNumber();
  }

  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }

  isLower() {
    return this.playersGuess < this.winningNumber;
  }

  playersGuessSubmission(num) {
    if (typeof num !== "number" || num < 1 || num > 100) {
      throw `That is an invalid guess.`;
    }
    this.playersGuess = num;
    return this.checkGuess();
  }

  checkGuess() {
    if (this.playersGuess === this.winningNumber) {
      return "You Win!";
    }
    if (this.pastGuesses.includes(this.playersGuess)) {
      return "You have already guessed that number.";
    }
    this.pastGuesses.push(this.playersGuess);
    if (this.pastGuesses.length === 5) {
      return "You Lose.";
    }
    const difference = this.difference();
    if (difference < 10) {
      return "You're burning up!";
    } else if (difference < 25) {
      return "You're lukewarm.";
    } else if (difference < 50) {
      return "You're a bit chilly.";
    } else {
      return "You're ice cold!";
    }
  }

  provideHint() {
    const hintArray = [this.winningNumber];
    for (let i = 0; i < 2; i++) {
      hintArray.push(generateWinningNumber());
    }
    return shuffle(hintArray);
  }
}
function newGame() {
  return new Game();
}

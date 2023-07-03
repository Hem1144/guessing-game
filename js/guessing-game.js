/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber() {
  return Math.ceil(Math.random() * 100);
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

let game = new Game();

// unique selectors
const titleMsg = document.getElementById("title-msg");
const guessMsg = document.getElementById("guess-msg");
const submitClick = document.getElementById("submit-btn");
const listItem = document.getElementById("guess-list").children;
const resetClick = document.getElementById("btn1");

// Handling Reset.
resetClick.addEventListener("click", resetFun);
function resetFun() {
  for (let i = 0; i < listItem.length; ++i) {
    listItem[i].innerText = "";
  }
  game = newGame();
  document.getElementById("inner-input").value = "";
}

// Handling click
submitClick.addEventListener("click", clickFun);
function clickFun() {
  const guessedNum = Number(document.getElementById("inner-input").value);
  titleMsg.innerHTML = game.playersGuessSubmission(guessedNum);

  document.getElementById("inner-input").value = "";

  for (let i = 0; i < game.pastGuesses.length; ++i) {
    if (game.pastGuesses[i]) {
      listItem[i].innerText = game.pastGuesses[i];
    }
  }

  setTimeout(() => {
    guessMsg.innerHTML =
      guessedNum < game.winningNumber
        ? "Guess Higher!"
        : guessedNum === game.winningNumber
        ? "You Win!"
        : "Guess Lower!";
  }, "1000");

  setTimeout(() => {
    guessMsg.innerHTML = "Guess a number between 1-100";
  }, "2000");
}

// Hint button logic
const hintBtn = document.getElementById("btn2");
hintBtn.addEventListener("click", hintFun);
function hintFun() {
  titleMsg.innerHTML = `The hints for the game is [${game.provideHint()}]`;
}

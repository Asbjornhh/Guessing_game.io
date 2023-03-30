let secretNumber;
let remainingGuesses;
let score;
let difficultySettings;
let maxNumber;
let timer;
let hintCounter;

function setDifficulty() {
  const difficulty = document.getElementById('difficulty').value;
  const gameInfo = document.getElementById('game-info');
  
  if (difficulty === 'easy') {
    difficultySettings = { guesses: 15, maxNumber: 100, hintAfter: 5 };
  } else if (difficulty === 'medium') {
    difficultySettings = { guesses: 10, maxNumber: 200, hintAfter: 4 };
  } else {
    difficultySettings = { guesses: 5, maxNumber: 500, hintAfter: 3 };
  }
  
  gameInfo.textContent = `Guess the number between 1 and ${difficultySettings.maxNumber}!`;
  resetGame();
}

function generateSecretNumber() {
  secretNumber = Math.floor  (Math.random() * difficultySettings.maxNumber) + 1;
}

function resetGame() {
  clearTimeout(timer);
  generateSecretNumber();
  remainingGuesses = difficultySettings.guesses;
  score = 0;
  hintCounter = 0;
  document.getElementById('remaining-guesses').textContent = remainingGuesses;
  document.getElementById('score').textContent = score;
  document.getElementById('message').textContent = '';
  document.getElementById('play-again').style.display = 'none';
  document.getElementById('guess').value = '';
  document.getElementById('progress-bar').style.width = '0%';
}

function checkGuess() {
  const guess = document.getElementById('guess').value;
  const message = document.getElementById('message');
  const remainingGuessesElement = document.getElementById('remaining-guesses');
  const scoreElement = document.getElementById('score');
  const progressBar = document.getElementById('progress-bar');

  if (remainingGuesses <= 0) {
    message.textContent = 'Game over! The correct number was ' + secretNumber + '.';
    displayPlayAgainButton();
    return;
  }

  if (guess == secretNumber) {
    message.textContent = 'Congratulations! You guessed the correct number!';
    score += remainingGuesses * 10;
    scoreElement.textContent = score;
    displayPlayAgainButton();
  } else if (guess > secretNumber) {
    message.textContent = 'Too high! Try again.';
  } else {
    message.textContent = 'Too low! Try again.';
  }

  remainingGuesses--;
  hintCounter++;
  remainingGuessesElement.textContent = remainingGuesses;
  progressBar.style.width = ((difficultySettings.guesses - remainingGuesses) / difficultySettings.guesses) * 100 + '%';
}

function displayPlayAgainButton() {
  document.getElementById('play-again').style.display = 'inline-block';
}

function getHint() {
    if (hintCounter >= difficultySettings.hintAfter && remainingGuesses > 0) {
      const hintRange = Math.floor(difficultySettings.maxNumber * 0.1);
      const lowerBound = Math.max(1, secretNumber - hintRange);
      const upperBound = Math.min(difficultySettings.maxNumber, secretNumber + hintRange);
      document.getElementById('message').textContent = `Hint: The secret number is between ${lowerBound} and ${upperBound}.`;
      hintCounter = 0;
    } else {
      document.getElementById('message').textContent = `You need to guess at least ${difficultySettings.hintAfter - hintCounter} more times before you can get a hint.`;
    }
  }

setDifficulty();
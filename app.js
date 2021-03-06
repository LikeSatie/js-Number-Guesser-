// game values
let min = 1,
  max = 10,
  winningNum = getRandomNumber(min, max),
  guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// listen for guess
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(
      `Пожалуйста, введите цифру в диапазоне от ${min} до ${max}`,
      'red'
    );
  }

  // check if won
  if (guess === winningNum) {
    // guessInput.disabled = true;
    // guessInput.style.borderColor = 'green';
    // setMessage(`${winningNum} Верно! Победа!`, 'green');
    gameOver(true, `${winningNum} Верно! Победа!`, 'green');
  } else {
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // guessInput.disabled = true;
      // guessInput.style.borderColor = 'red';
      // setMessage(
      //   `Игра окончена, вы проиграли. Верный ответ - ${winningNum}`,
      //   'red'
      // );
      gameOver(
        false,
        `Игра окончена, вы проиграли. Верный ответ - ${winningNum}`
      );
    } else {
      guessInput.style.borderColor = 'red';
      guessInput.value = '';
      setMessage(
        `${guess} Попытка не верная, попыток осталось: ${guessesLeft}`,
        'red'
      );
    }
  }
});

// game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color;
  setMessage(msg);

  // play again?
  guessBtn.value = 'Играть снова';
  guessBtn.className += 'play-again';
}

// get winning number
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

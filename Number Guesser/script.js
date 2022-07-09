// Player must guess a number between min and max
// Player gets a certain amount of guesses
// Notify player of guesses remaining
// notify the player of the correct answer if loose
// Let player choose to play again

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;
    
    // UI
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
})

// Listen for guess
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    // Validate input
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red')
    }

    // check if won
    if(guess === winningNum) {
       gameOver(true, `${winningNum} is correct. YOU WIN` )

    } else {
        // Wrong Number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
           gameOver(false, `Game Over, you lost. The correct Number was ${winningNum}`)
        } else {
            // game continues - answer wrong

            // change border style
            guessInput.style.borderColor = 'red';

            // clear input
            guessInput.value = '';

            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
        }
    }

});

// Game Over 
function gameOver (won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
     // Disable input
     guessInput.disabled = true;
     // change border color
     guessInput.style.borderColor = color;
     // set text color
     message.style.color = color;
     // let user know they won
     setMessage(msg);
     // Play Again
     guessBtn.value = 'Play Again';
     guessBtn.className += 'play-again'
}

// Get winning Num
function getRandomNum(min, max) {
    return Math.floor(Math.random()*(max + min) + min);

}

// set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
    
}



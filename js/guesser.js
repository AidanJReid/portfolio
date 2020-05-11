// Game value
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
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
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

// Listen for guess
guessBtn.addEventListener("click", function(){
    let guess = parseInt(guessInput.value);

    // Validate input
    if(isNaN(guess) || guess < min || guess > max){
        return setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    guessesLeft -= 1;
    // Check if it's winning guess
    if(guess === winningNum){
        // Game over - Won
        gameOver(true, `${winningNum} is right! Were you watching me in Coppers?!`);

    } else if (guessesLeft === 0){
        // Game over - Lost
        gameOver(false, `Game over. You lost. The correct number was ${winningNum}`)
        
        } else {
            // Game continues - Answer wrong

            // Change border color
            guessInput.style.borderColor = 'red';
            // Tell user its the wrong number
            setMessage(`Nope. That's piss poor. ${guess} isn't right. ${guessesLeft} guesses left...`, 'red');
            // Clear input
            guessInput.value = ''
        }
    });

// Game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Set text color
    message.style.color = color;
    // Set message
    setMessage(msg);

    //Play again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get random Number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}
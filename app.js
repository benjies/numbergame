/* Game function:
-Player must guess a number between min -max
-Player gets a certain amount of guesses
-Notify player of guesses remaining
-Notify player of the correct answer if loose
-Let Player choose to play again
*/

// Game Values
let min = 1,
    max = 10,
    winningNum = Math.floor(Math.random() *(max-min+1)+min),
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

// Play Again EVENT LIST
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    console.log(guess);
    // Validate Field
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check if won
     else if(guess === winningNum){
        // Game Won
        gameOver(true, `${winningNum} is correct! You win!`);
        
    } else{
        // Wrong number
        guessesLeft -= 1;
        // Check if guesses are left
        if(guessesLeft===0){
        // Game Over - Lost
        gameOver(false, `Game Over! 0 Guesses Left. The correct number was ${winningNum}`, 'red');
        } else{
            // Game Continue - Wrong Guess
            // Chamge border green
            guessInput.style.borderColor = 'red';
            // Clear input
            guessInput.value = '';
            // Wrong guess, keep going
            setMessage(`${guess} was wrong! ${guessesLeft} guesses remaining.`, 'red')

        }
    }
})

// Game Over Function
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';


    // Disable input
    guessInput.disabled = true;
    // Chamge border green
    guessInput.style.borderColor = color;
    // Set Text Color
    message.style.color = color;
    // Set message
    setMessage(msg);

    // Play Again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// setMessage Function
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}
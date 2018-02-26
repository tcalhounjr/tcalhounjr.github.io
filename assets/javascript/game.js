function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}//The maximum is exclusive and the minimum is inclusive

function getCPUGuess (index) {
    return psychicGame[index];
}//Take in a pseudo-randomly generated number as index; find its associated letter in the array; and return the letter.

function goodGuess(newGuess, randomGuess) {
   if (newGuess === randomGuess){
        numWins++;
        writeToScreen(wins,numWins);
        return true;
   }
   else {
        return false;
   }
}//Take in user input; compare it to the computer's guess; return true if it's correct; return false if not.

function playAgain () {
    randomNum = getRandomInt(0,psychicGame.length);
    cpuGuess = getCPUGuess(randomNum);
    //writeToScreen(cpuLetter,cpuGuess);
    console.log("the cpu guessed ",cpuGuess);
    maxGuesses = 5;
    writeToScreen(remaining,maxGuesses);
}//This is basically initializing the game sans resetting the scores and guesses

function initializeGame() {
    userGuess.innerHTML = "NEW GAME";
    wins.innerHTML = 0;
    losses.innerHTML = 0;
    guessHistory.innerHTML = "none";
    guesses = [];
    maxGuesses = 5;
    randomNum = getRandomInt(0,psychicGame.length);
    cpuGuess = getCPUGuess(randomNum);
    //writeToScreen(cpuLetter,cpuGuess);
    console.log("the cpu guessed ",cpuGuess);
}//On the initial page load or any refresh, set/reset the global variables to their initial state and write them to the screen.

function writeToScreen(htmlElement, newValue) {
    htmlElement.innerHTML = newValue;
    console.log("You just printed ", newValue, " to the screen");
}

function documentHistory(newGuess, array) {
    array.push(newGuess);
    writeToScreen(guessHistory,array);
    console.log("Your guess history is ", array);
    return array;
}

function guessesRemaining(limit) {
    limit--;
    console.log("Your new limit is ", limit);
    writeToScreen(remaining,limit);
    return limit;
}

var psychicGame = ["a","b","c","d","e","f","g","h","i","j","k","l","m",
                  "n","o","p","q","r","s","t","u","v","w","x","y","z"];


//console.log (psychicGame);
var userGuess = document.getElementById("user-guess");
var wins = document.getElementById("user-wins");
var losses = document.getElementById("user-losses");
var remaining = document.getElementById("guesses-left");
var guessHistory = document.getElementById("guess-history");
var cpuLetter = document.getElementById("cpu-letter");
var numWins = 0;
var numLosses = 0;
var guesses = [];
var maxGuesses;
var cpuGuess = "";
var randomNum = 0;

//The computer should have to guess first otherwise it's like National Lampoon's Vegas Vacation
initializeGame();
alert("Welcome back to the Psychic Friends Network");
//Only listen for events while the game is ongoing

  
document.onkeyup = function (event) {
    var keyPressed = event.key;

    if (maxGuesses === 0) {
        numLosses++;
        writeToScreen(losses,numLosses);
        alert("Sorry, you took an L this round.")
        confirm("Would you like to play again?");
        writeToScreen(cpuLetter,cpuGuess);
        playAgain();
    }
    else {

        writeToScreen(remaining,maxGuesses);

        //Validate the user's guess based on Unicode values
        if ((keyPressed.charCodeAt(0) < 65) || (keyPressed.charCodeAt(0) > 122)) {
            alert("Please guess an alphabet");
        }
        else {
           keyPressed = keyPressed.toLowerCase();
        }

        //Get on with the business of managing the game
        writeToScreen(userGuess, keyPressed);
        guesses = documentHistory(keyPressed,guesses);

        //Determine if the user guessed correctly
        var bool = goodGuess(keyPressed,cpuGuess);
        if (bool) {
            writeToScreen(cpuLetter,cpuGuess);
            alert("Congratulations! You guessed correctly.");
            confirm("Would you like to play again?");
            playAgain();
        }
        else {
            maxGuesses = guessesRemaining(maxGuesses);
            //alert("You have " + maxGuesses + " remaining");
        }
    }
}
//Once the max number of guesses has been reach, write the computer's guess to the screen, and start over.


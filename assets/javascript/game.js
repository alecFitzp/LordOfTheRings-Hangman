

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
    "u", "v", "w", "x", "y", "z"];
var lotrPhrases = ['you shall not pass', 'a wizard is never late', 'smeagol is freeeee', 'i cant carry it for you but i can carry you',
                   'i think i broke something', 'fool of a took', 'you have my sword', 'one ring to rule them all', 'whats in my pockets',
                   'longbottom leaf the finest pipe weed in all of south farthing'];

var wrongLettersArray = [];
var lives = 10;
var levelIncrementor = 1;

var music = document.getElementById('music');
music.play();

for(var i = 0; i < 10; i++){
//Sets current phrase by checking levelIncrementor value
var phraseArray = stringToArray(lotrPhrases[levelIncrementor-1]);
var level_Blanks = blanksCreator(phraseArray, alphabet);

//This let's the DOM receive the key inputs from an anonymous function
//that gets passed an input, which is the user
document.onkeyup = function (event) {
    //This puts the User's input into the variable UserGuess
    //This allows us to manipulate the blanks, the level, hp, and dialogue
    var gameResult = document.getElementById("blanks");
    var level = document.getElementById("level");
    var hp = document.getElementById("hp");
    var frodoDialogue = document.getElementById("frodoDialogue");
    var smeagolDialogue = document.getElementById("smeagolDialogue");
    var wrongLetters = document.getElementById("wrongLetters");
    var frodoPic = document.getElementById('frodo-pic');
    var gameTitle = document.getElementById('gameTitle');
    var wrongLettersLine = document.querySelector("#wrongLettersP");

    //If you lose all hp
    if (lives < 1) {
        gameTitle.textContent = "Game Over";
        wrongLettersLine.textContent = ""
        frodoPic.classList.add('deadFrodo');
        smeagolDialogue.textContent = "Precious is ours now!!";
        frodoDialogue.textContent = "...";
        gameResult.textContent = "Frodo has been slain...Sauron returned, and Middle Earth has been destroyed..";
        music.pause();
        var losingMusic = document.getElementById('losingMusic');
        losingMusic.play();
        //losingMusic.volume = 0.5;
    } else {
        //gameTitle.textContent = 'Can you beat all 10 levels?';
            var userGuess = event.key;

            if (alphabet.indexOf(userGuess) !== -1) {
                gameTitle.textContent = 'Guess Letters!';

                //Call the addLetter Function to add inputs
                var userGuessMatches = addLetter(userGuess, phraseArray, level_Blanks);

                //Dialogues
                dialogueAndConsequences(userGuess, userGuessMatches);

                var currentLevelBlanksMain = level_Blanks;
                //Prints result to the screen
                var currentGameResult = currentLevelBlanksMain.toString().replace(/,/g, '')

                //This prints out the gameresult to the DOM
                gameResult.textContent = currentGameResult;
            }
            if (currentGameResult === lotrPhrases[0]) {
                level.textContent = "2";
                levelIncrementor = 2;
                gameTitle.textContent = 'You leveled up! Press a letter to continue!';
            } else if (currentGameResult === lotrPhrases[1]) {
                level.textContent = "3";
                levelIncrementor = 3;
                gameTitle.textContent = 'You leveled up! Press a letter to continue!';
            } else if (currentGameResult === lotrPhrases[2]) {
                level.textContent = "4";
                levelIncrementor = 4;
                gameTitle.textContent = 'You leveled up! Press a letter to continue!';
            } else if (currentGameResult === lotrPhrases[3]) {
                level.textContent = "5";
                levelIncrementor = 5;
                gameTitle.textContent = 'You leveled up! Press a letter to continue!';
            } else if (currentGameResult === lotrPhrases[4]) {
                level.textContent = "6";
                levelIncrementor = 6;
                gameTitle.textContent = 'You leveled up! Press a letter to continue!';
            } else if (currentGameResult === lotrPhrases[5]) {
                level.textContent = "7";
                levelIncrementor = 7;
                gameTitle.textContent = 'You leveled up! Press a letter to continue!';
            } else if (currentGameResult === lotrPhrases[6]) {
                level.textContent = "8";
                levelIncrementor = 8;
                gameTitle.textContent = 'You leveled up! Press a letter to continue!';
            } else if (currentGameResult === lotrPhrases[7]) {
                level.textContent = "9";
                levelIncrementor = 9;
                gameTitle.textContent = 'You leveled up! Press a letter to continue!';
            } else if (currentGameResult === lotrPhrases[8]) {
                level.textContent = "10";
                levelIncrementor = 10;
                gameTitle.textContent = 'You leveled up! Press a letter to continue!';
            } else if (currentGameResult === lotrPhrases[9]) {
                gameTitle.textContent = 'You win!';
                gameResult.textContent = 'Frodo follows Smeagol with Sam and they destroy the ring!'
                smeagolDialogue.textContent = "fine..i'll lead you to mount doom";
                frodoDialogue.textContent = "okie";
                wrongLettersLine = "";
                music.pause();
                var winningMusic = document.getElementById('winningMusic');
                winningMusic.play();
                //winningMusic.volume = 0.5;
            }
        }
    }

        //************************************************//
        //************     FUNCTIONS   *****************||/
        //***********************************************//
        //FUNCTION 1: This array adds the letter to the gameresult if
        //you guess right. Returns value if the guess is right
        function addLetter(userGuess, level, level_blanks) {
            var userGuessMatches = false;
            //checks to see if userGuess is in the array
            for (var i = 0; i < level.length; i++) {
                frodoDialogue.textContent = userGuess + "?";
                if (userGuess === level[i]) {
                    level_blanks[i] = level[i];
                    userGuessMatches = true;
                }
            }
            return userGuessMatches;
        }
        //FUNCTION 2: dialogue. The function changes the dialogue based on whether or not you're right or wrong
        function dialogueAndConsequences(userGuess, userGuessMatches) {
            //Smeagol's response to your input
            if (userGuessMatches === true) {
                smeagolDialogue.textContent = "that's correct..hehe";
            } else {
                //the first time you get something wrong, Frodo reacts to Smeagol hitting him with a rock
                if ((wrongLettersArray === undefined || wrongLettersArray.length === 0) && lives > 0) {
                    //frodoPic.classList.toggle('hitFrodo');
                    frodoPic.classList.add('hitFrodo');
                    window.setTimeout(function () { frodoPic.classList.remove('hitFrodo'); }, 2000);
                    window.setTimeout(function () {
                        frodoDialogue.textContent = "ow, did you just throw a rock at me?";
                    }, 2000);
                    window.setTimeout(function () {
                        smeagolDialogue.textContent = "hehe..stupid hobbitses, i throw a rocksy everytime you guess wrong hehe";
                    }, 2500);
                } else {
                    smeagolDialogue.textContent = "stupid hobbitses";
                }
                // if the user's guess is not inside of the array, you lose 5 health
                if (wrongLettersArray.indexOf(userGuess) === -1) {
                    wrongLettersArray.push(userGuess);
                    hp.textContent -= 10;
                    lives--;
                    frodoPic.classList.add('hitFrodo');
                    window.setTimeout(function () { frodoPic.classList.remove('hitFrodo'); }, 1000);
                } else { //if you already guessed it, smeagol will tell you
                    frodoDialogue.textContent = userGuess + "?";
                    smeagolDialogue.textContent = "ekhh...why does hobbitses guess that wrong again?";
                }
                wrongLetters.textContent = wrongLettersArray.join(' ');
            }


        }
};

function stringToArray(string) {
    var array = [];
    for (var i = 0; i < string.length; i++) {
        array.push(string[i]);
    }
    return array;
}

function blanksCreator(currentLevel, alphabet) {
    var currentLevelBlanks = [];
    for (var i = 0; i < currentLevel.length; i++) {
        if (alphabet.indexOf(currentLevel[i]) !== -1) {
            currentLevelBlanks.push("_")
        } else {
            currentLevelBlanks.push(" ")
        }
    }
    return currentLevelBlanks;
}

//declaring all the variables
var gamePattern = [];
var userInpCount = 0;
var level = 0;
var patternDelay = 0;
var animDelay = 0;
var nextPatternDelay = 0;
var patternCount = 0;
var buttonColors = [];

//intializing the variables with values
init();

//obtaining button colors from HTML buttons ids
$(".btn").each(function() {
    buttonColors.push($(this).attr("id"))
});

//event listener for key press
$(document).keypress(function(event) {
    //starting the game
    //console.log(event.key, level);
    if (level == 0) {
        nextLevel();
    }
})

//event listener for mouse clicks
$(".btn").click(function() {
    //obtaining color of the button user presses
    var buttonColor = $(this).attr("id");    
    animateButton(buttonColor);
    //console.log(buttonColor, userInpCount);
    checkUserInput(buttonColor);
})


//intializing the variables with values
function init() {
    gamePattern = [];
    userInpCount = 0;
    level = 0;
    patternDelay = 400;
    animDelay = 100;
    nextPatternDelay = 400;
    patternCount = 0;
}

function nextLevel() {
    level++;
    updateTitle("");

    //change patternDelay, nextPatternDelay and animDelay here

    userInpCount = 0;
    gamePattern.push(nextSequence());
    patternCount = 0;
    console.log(gamePattern);
    animatePattern();
}

function updateTitle(message) {
    //if we pass some message, level-title element take this message as text
    if (message) {
        $("#level-title").text(message);
    }
    //otherwise level-title element displays game level
    else {
        $("#level-title").text(`Level ${level}`);
    }
}

function nextSequence() {
    //returns random color from buttonColors array
    return buttonColors[Math.floor(Math.random() * 4)]
}

function animatePattern() {
    //animating flashing of a button in the pattern
    setTimeout(function() {
        //basically it is a cycle through all the buttons in the pattern
        var buttonColor = gamePattern[patternCount];
        playSound(buttonColor);
        $(`#${buttonColor}`).fadeIn(animDelay).fadeOut(animDelay).fadeIn(animDelay);
        patternCount++;
        if (patternCount < gamePattern.length) {
            animatePattern();
        }
    }, patternDelay)
}

function animateButton(buttonColor) {
    //animating the pressed button
    playSound(buttonColor);
    $(`#${buttonColor}`).addClass("pressed");
    setTimeout(function() {
        $(`#${buttonColor}`).removeClass("pressed");
    }, animDelay)
}

function playSound(name) {
    //playing defined sound file
    var sound = new Audio(`sounds/${name}.mp3`);
    sound.play();
}

function checkUserInput(buttonColor) {
    //checking if current button pressed by user corresponds to the pattern
    //if it does not...
    if (buttonColor != gamePattern[userInpCount]) {
        //letting user now that, resetting all the variables and proposing to start again
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, patternDelay)
        updateTitle("Game Over! Press any key to start again");
        init();
        //$(".btn").off("click");
    }
    //if it does and it is the last button in the sequence
    else if (userInpCount == gamePattern.length - 1) {
        setTimeout(function() {
            //going to the next level
            nextLevel();
        }, nextPatternDelay);
    }
    //if it does - continue the sequence
    else {
        userInpCount++;
    }
}

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var firstKeyboardPress = false;
var Level = 0;

var wrong = new Audio("./sounds/wrong.mp3");

function nextSequence() {
    userClickedPattern = [];

    Level += 1;
    $("h1").text("Level " + Level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    gamePattern.forEach((colour, index) => {
        setTimeout(function() {
            $("#" + colour).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(colour);
        }, index * 650);
    })
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animationPress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {   
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        gameOver();
        startOver();
    }
}

function gameOver() {
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart.");
}

function startOver() {
    Level = 0;
    gamePattern = [];
    firstKeyboardPress = false;
}

$(document).on('click', '.btn', function() {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animationPress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

$(document).keypress(function(event) {
    if (!firstKeyboardPress) {
        firstKeyboardPress = true;
        $("h1").text("Level " + Level);
        nextSequence();
    }
});
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = []
let level = 0;
let isFirst = true;

$('.btn').click(function () {
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    console.log(userClickedPattern);
    animatePress(userChosenColor);
    checkSequence(userClickedPattern.length-1);

})

function checkSequence(level) {
    if (userClickedPattern[level] == gamePattern[level]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence();
                userClickedPattern = [];
            }, 1000)
        }
    } else {
        console.log('false');
        new Audio(`sounds/wrong.mp3`).play();
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass("game-over");
        }, 200)
        $('h1').text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

function nextSequence() {
    level++;
    $('h1').text(`Level ${level}`);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    console.log(gamePattern);
}

function startOver(){
 level = 0;
 gamePattern = [];
 userClickedPattern = [];
 isFirst = true;
}

function playSound(color) {
    new Audio(`sounds/${color}.mp3`).play();
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");

    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100)
}

$(document).on('keypress', function () {
    if (isFirst) {
        $('h1').text(`Level ${level}`);
        nextSequence();
        isFirst = false;
    }
});
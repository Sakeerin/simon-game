var buttonColours = ["red","blue","green","yellow"]; // sequence color => blue -> red -> yellow -> green
console.log(buttonColours);
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence(){

    userClickedPattern = [];

    level++;

    $('#level-title').text('Level '+level);

    var randomNumber = Math.trunc(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    
    console.log(gamePattern);
   
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}


$('.btn').click(function(){

    if(started){
        var userChosenColour = $(this).attr("id");

        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);

        animatePress(userChosenColour);

        console.log(userClickedPattern.length-1);

        checkAnswer(userClickedPattern.length-1);
    }
});


$(document).keypress(function(){
   
    if(!started){
        $('#level-title').text('Level '+level);
        nextSequence();
        started = true;
    }
    
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $('#'+currentColour).addClass('pressed');
    setTimeout(() => { $('#'+currentColour).removeClass('pressed'); }, 100);
}

function checkAnswer(currentLevel){
    console.log('currectLevel = '+currentLevel);
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log('success');

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log('wrong');
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(() => { $('body').removeClass('game-over'); }, 200);
        $('#level-title').text('Game Over, Press Any Key to Restart');
        startOver();
    }
    console.log(userClickedPattern[currentLevel] +'==='+ gamePattern[currentLevel]);
    console.log(userClickedPattern);
    console.log(gamePattern);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
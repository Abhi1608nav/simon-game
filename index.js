var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
})

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour); //play sound when user click on any botton
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
 if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
 {
     
     if(gamePattern.length===userClickedPattern.length)
     {
         setTimeout(function(){
          nextSequence();
         },1010)

     }
 }
 //when pressing the wrong button
 else{
     
     var audio=new Audio("sounds/wrong.mp3")
     audio.play();
     $("body").addClass("game-over ");
     setTimeout(function(){
        $("body").removeClass("game-over ");
     },200)
     $("h1").text("Game Over, Press Any Key to Restart");
     startOver();
 }

}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber]; 
    gamePattern.push(randomChosenColor); 
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
}

//function for playing the sound
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
        setTimeout(function(){                          // for removing the class at a certain delay of time 
            $("#"+currentColour).removeClass("pressed");
        },100)

}

//restart the game , resetting the value
function startOver(){
    level = 0;
  gamePattern = [];
  started = false;
}
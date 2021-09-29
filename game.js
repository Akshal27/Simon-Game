var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).on("keydown",function(){
  if(!started){
    $("h1").text("Level "+level);
    nextSequence();
    started = true;
  }
});


$(".btn").on('click',function(event){
  userChosenColour = event.currentTarget.attributes.id.value;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern [currentLevel]){
    console.log("success");


      if (gamePattern.length === userClickedPattern.length){
        setTimeout(function () { nextSequence();}, 1000 );

      }
  }



  else{
    console.log("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();

  }


}



function nextSequence(){
  userClickedPattern=[];
  level+=1;
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio('sounds/'+name+".mp3");
  audio.play();
}
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
       $("#"+currentColour).removeClass("pressed");
   }, 100);
}
function startOver(){
  level = 0;
  gamePattern=[];
  started = false;
}

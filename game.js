var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started = false; // set a flag
//random number link random color link the name of sound will play, then use to select the button by id color
function nextSequence(){
  level ++;
  $("#level-title").text("Level" +" "+ level);
  userClickPattern = []   //reset
  var randomNumber = Math.ceil(Math.random() *3);
  var randomChosenColor = buttonColors[randomNumber];
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  console.log(gamePattern);

}

//button click
$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);
  // console.log(userClickPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  console.log(userClickPattern);
  checkAnswer(userClickPattern.length - 1)
})

//create new function so not repeat
function playSound(name) {
  const audio = new Audio("sounds/"+name+".mp3")
  audio.play();
}
//add animated click
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed")
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100)
}

//starting the game. press any key. ater pressed can't pressed again
$(document).on("keydown", function() {
  if (!started) {
    nextSequence();
    $("#level-title").text("Level" +" "+ level);
    started = true
  }
})
//checkanswer
function checkAnswer(currentlevel) {
  if (gamePattern[currentlevel] === userClickPattern [currentlevel]) {
    if (gamePattern.length === userClickPattern.length) {
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    }, 500)
    $("h1").text("Game Over, Press Any Key to restart")
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}

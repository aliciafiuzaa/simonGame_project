const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

const numberOfButtons = document.querySelectorAll(".btn").length;
let level = 0;
var started = false;

document.addEventListener("keydown", function() {
  if (!started) {
    document.getElementById("level-title").innerHTML = "Level " + level;
    nextSequence();
    started = true;
  }
});

for (let i = 0; i < numberOfButtons; i++) {
  document.getElementsByClassName("btn")[i].addEventListener("click", function() {
    let userChosenColour = this.classList[1];

    userClickedPattern.push(userChosenColour)
    buttonAnimation(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)
  })
}

const nextSequence = () => {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").innerHTML = "Level " + level;

  const randomNumber = Math.floor(Math.random() * buttonColours.length);
  const randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  buttonAnimation(randomChosenColour);
  playSound(randomChosenColour);
};

const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    const audio = new Audio("sounds/wrong.mp3");
    audio.play();

    document.querySelector("body").classList.add("game-over")

    setTimeout(function () {
      document.querySelector("body").classList.remove("game-over")
    }, 1000);

    document.getElementById("level-title").innerHTML = "Game Over, Press Any Key to Restart";

    startOver();
  }
}

const startOver = () => {
  level = [];
  gamePattern = [];
  started = false;
}

const buttonAnimation = (color) => {
  let activeButton = document.getElementById(color);

  activeButton.classList.add("pressed");

  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 200);
};

const playSound = (name) => {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

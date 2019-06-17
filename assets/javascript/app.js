//Javascript for the Trivia game
//array of objects to provide questions and responses
var questions = [
  {
    "question": "Polar Bears are only found near the North Pole and Penguins only near the South Pole.",
    "options": ["True", "False"],
    "answer": 0,
    "url": "assets/images/question1.png"
  },
  {
    "question": "What is the tallest mountain outside of a mountain range?",
    "options": ["Fujiyama", "Kilimanjaro", "Everest", "Denali"],
    "answer": 1,
    "url": "assets/images/question2.png"
  },
  {
    "question": " What U.S. state has the tallest trees?",
    "options": ["California", "Alaska", "Oregon", "Washington"],
    "answer": 0,
    "url": "assets/images/question3.png"
  },
  {
    "question": "What is the deepest ocean?",
    "options": ["Atlantic", "Pacific", "Indian", "Arctic"],
    "answer": 1,
    "url": "assets/images/question4.png"
  },
  {
    "question": "What is the most populated city in the world?",
    "options": ["Shanghai", "Tokyo", "New York", "New Delhi"],
    "answer": 0,
    "url": "assets/images/question5.png"
  },
  {
    "question": "Which is closer to the South Pole?",
    "options": ["Africa", "Australia", "South America", "Canada"],
    "answer": 2,
    "url": "assets/images/question6.png"
  },
  {
    "question": "Of all the water on the planet, only this much is fresh water?",
    "options": ["3 percent", "5 percent", "7 percent", "9 percent"],
    "answer": 0,
    "url": "assets/images/question7.png"
  },
  {
    "question": "What is the longest river in the U.S.?",
    "options": ["Mississippi", "Rio Grande", "Missouri", "The James"],
    "answer": 2,
    "url": "assets/images/question8.png"
  },
  {
    "question": "The U.S. has more coastline than any other country.",
    "options": ["True", "False"],
    "answer": 1,
    "url": "assets/images/question9.png"
  },
  {
    "question": "What is the smallest country in the world?",
    "options": ["Saint Kitts", "Monaco", "Liechtenstein", "Vatican City"],
    "answer": 3,
    "url": "assets/images/question10.png"
  }
];

var correct = 0,
  wrong = 0,
  unanswered = 0,
  currentQuestion = 0;

var firstGame = true;

//timer variables
var timelimit = 20,
  questiontime = 20,
  pausetime = 8000;

var intervalId;


//Set the timer
function startTimer(seconds) {
  timelimit = seconds;
  clearInterval(intervalId);
  intervalId = setInterval(decrement, 1000);
  $("#timer").html("<h2>" + "Time Remaining: " + timelimit + "</h2>");
}

//  The decrement function.
function decrement() {
  //  Decrease number by one.
  timelimit--;
  // Show the time remaining
  $("#timer").html("<h2>" + "Time Remaining: " + timelimit + "</h2>");
  // didn't answer in time if it hits 0
  if (timelimit === 0) {
    // stop the timer
    stopTimer();
    //Alert the user that time is up.
    $("#timer").html("<h2>" + "Times Up!" + "</h2>");
    //display the answer info.
    checkAnswer(-1);
  }
}

//  The stop function
function stopTimer() {
  //  Clears our intervalId
  clearInterval(intervalId);
}

// display the start button and reset variables for a new game
function initializeGame() {
  var startBtn = $("<button>");
  startBtn.addClass("start-button");
  //the button will have a different label depending upon whether it's the first time or not.
  if (firstGame) {
    startBtn.text("Start");
  }
  else {
    startBtn.text("Start Over?");
  }
  $("#displayarea").append(startBtn);

  currentQuestion = 0;
  wrong = 0;
  correct = 0;
  unanswered = 0;
  firstGame = false;
}

function showQuestion() {
  $("#displayarea").empty();
  //display question
  createElement("<div>", "question", questions[currentQuestion].question, "#displayarea");

  //display options for answers
  for (var i = 0; i < questions[currentQuestion].options.length; i++) {
    $("#displayarea").append("<div>");
    var optionBtn = $("<button>");
    optionBtn.addClass("option");
    optionBtn.attr("optionnum", i);
    optionBtn.text(questions[currentQuestion].options[i]);
    $("#displayarea").append(optionBtn);
    $("#displayarea").append("</div>");

    //start the timer
    startTimer(questiontime);
  }
}


//determine if the answer is correct.
function checkAnswer(selected) {
  stopTimer()

  if (questions[currentQuestion].answer === selected) {
    displayResponse("yes");
  }
  else if (selected === -1)   //timed out
  {
    displayResponse("timed out", questions[currentQuestion].options[questions[currentQuestion].answer]);
  }
  else {
    displayResponse("no", questions[currentQuestion].options[questions[currentQuestion].answer]);
  }

  currentQuestion++;

  //was that the last question?  Display game info and pause or paus and show the next question
  if (currentQuestion >= questions.length) {
    setTimeout(function () {
      gameOver();
    }, pausetime);

  }
  else {
    setTimeout(function () {
      showQuestion();
    }, pausetime);

  }
}

//show whether they got it right, and the image
function displayResponse(correctAnswer, actualAnswer) {
  var response = "";
  if (correctAnswer === "yes") {
    response = "Correct - way to go!";
    correct++;
  }
  else if (correctAnswer === "no") {
    response = "Wrong answer, keep trying!  Correct answer was: " + actualAnswer;
    wrong++;
  }
  //then they didn't answer in time
  else {
    response = "Need to be faster, dude!  Correct answer was: " + actualAnswer;
    unanswered++;
  }

  //clear the question and display the result
  $("#displayarea").empty();
  createElement("<div>", "response", response, "#displayarea");

  var imgURL = questions[currentQuestion].url;
  var image = $("<img>").attr("src", imgURL);
  $("#displayarea").append(image);

}

function gameOver() {
  //first clear out the shown data then show the game stats
  $("#displayarea").empty();

  //show game stats
  createElement("<div>", "gameoverhead", "Game Over", "#displayarea");
  createElement("<div>", "gameover", "Correct Answers: " + correct, "#displayarea");
  createElement("<div>", "gameover", "Wrong Answers: " + wrong, "#displayarea");
  createElement("<div>", "gameover", "Not Answered: " + unanswered, "#displayarea");

  //display start button and reset variables.
  initializeGame();
}

//function will create an element based on parameters passed
function createElement(type, addclass, text, location) {
  var addOne = $(type);

  if (addclass !== "") {
    addOne.addClass(addclass);
  }
  if (text !== "") {
    addOne.text(text);
  }
  $(location).append(addOne);
}


//waiting on button clicks
$(document).ready(function () {

  //initialize screen and variables
  initializeGame();


  $("#displayarea").on('click', '.start-button', function () {
    showQuestion();
  });

  //when answer selected, see if it is correct and display picture/message
  $("#displayarea").on('click', '.option', function () {
    checkAnswer(parseInt($(this).attr("optionnum")));
  });

});

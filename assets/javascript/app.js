//Javascript for the Trivia game
var questions = [
  {
    "question": "Polar Bears are only found near the North Pole and Penguins only near the South Pole?",
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
    "options": ["Mississippi", "Rio Grande", "Missouri", "James"],
    "answer": 2,
    "url": "assets/images/question8.png"
  },
  {
    "question": "The U.S. has more coastline than any other country?",
    "options": ["True", "False"],
    "answer": 1,
    "url": "assets/images/question9.png"
  },
  {
    "question": "What is the smallest country in the world??",
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
var timelimit = 10,
  questiontime = 10,
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
  //  Show the number in the #show-number tag.
  $("#timer").html("<h2>" + "Time Remaining: " + timelimit + "</h2>");
  // $("#timer").text("Time Remaining: " + timelimit);
  //  Once number hits zero...
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

//  display the start button and reset variable

function initializeGame() {
  var startBtn = $("<button>");
  startBtn.addClass("start-button");
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
//console.log(questions[currentQuestion].question);
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
    //console.log("answernum "  answerNm + " selected " + selected);
    stopTimer()

    var response = $("<img>");
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

    //was that the last question?  Display game info and pause
    if (currentQuestion >= questions.length) {
      setTimeout(function () {
        gameOver();
      }, 5000);

    }
    else {
      setTimeout(function () {
        showQuestion();
      }, 5000);

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
    $("#displayarea").empty();
    createElement("<div>", "response", response, "#displayarea");

    var imgURL = questions[currentQuestion].url;
    var image = $("<img>").attr("src", imgURL);
    $("#displayarea").append(image);

  }

  function gameOver() {
    //first clear out the shown data
    $("#displayarea").empty();

    createElement("<div>", "gameoverhead", "Game Over", "#displayarea");
    createElement("<div>", "gameover", "Correct Answers: " + correct, "#displayarea");
    createElement("<div>", "gameover", "Wrong Answers: " + wrong, "#displayarea");
    createElement("<div>", "gameover", "Not Answered: " + unanswered, "#displayarea");

    initializeGame();
  }

  function createElement(type, addclass, text, location) {
    // console.log(tpe + " class " + addclass + " text " + text + " location " + location)
    var addOne = $(type);

    if (addclass !== "") {
      addOne.addClass(addclass);
    }
    if (text !== "") {
      addOne.text(text);
    }
    $(location).append(addOne);
  }

  //start of the game
  initializeGame();

  //processing code
  $(document).ready(function () {

    //   $(".start-button").on("click", function () {
    $("#displayarea").on('click', '.start-button', function () {
      showQuestion();
    });

    //when answer selected, see if it is correct and display picture/message
    $("#displayarea").on('click', '.option', function () {
      //console.log("option-click " + currentQuestion + " optionnum " + parseInt($(this).attr("optionnum")));
      checkAnswer(parseInt($(this).attr("optionnum")));
    });

  });

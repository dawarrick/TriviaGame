//Javascript for the Trivia game
    var questions = [
      {
        "question": "What day is it?",
        "options": ["Monday", "Tuesday", "Wednesday", "Thursday"],
        "answer": 3,
        "url": "assets/images/question1.png"
      },
      {
        "question": "What day was yesterday?",
        "options": ["Monday", "Tuesday", "Wednesday", "Thursday"],
        "answer": 2,
        "url": "assets/images/question2.png"
      }
    ];
    var correct = 0,
      wrong = 0,
      unanswered = 0,
      currentQuestion = 0;

    /*console.log(questions[0].question);
    console.log(questions[0].options[questions[0].answer]);
    console.log(questions[0].url);

    console.log(questions[1].question);
    console.log(questions[1].options[questions[1].answer]);
    console.log(questions[1].url);*/

    //  Set our timer variable.
    var timelimit = 10;
    var questiontime = 10;
    var pausetime = 8000;
    firstGame = true;
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
      createElement("<div>", "question", questions[currentQuestion].question, "","#displayarea");
/*      var question = $("<div>");
      question.addClass("question");
      question.text(questions[currentQuestion].question);
      $("#displayarea").append(question);*/
      /*     $("#optionsBtn").empty();
           $("#response").empty();
           $("#responseImg").empty();
           */
      for (var i = 0; i < questions[currentQuestion].options.length; i++) {
        //create html programmatically
        /*createElement("<div>","","","#displayarea")*/
        $( "#displayarea" ).append( "<div>" );
          createElement("<button>", "option", questions[currentQuestion].options[i], "optionnum,"+ i,"#displayarea");
 /*       var optionBtn = $("<button>");
        optionBtn.addClass("option");
        optionBtn.attr("optionnum", i);
        optionBtn.text(questions[currentQuestion].options[i]);
        $("#displayarea").append(optionBtn);*/
        $( "#displayarea" ).append( "</div>" );
      }
      startTimer(questiontime);
    }

    //determine if the answer is correct.
    function checkAnswer(selected) {
      //console.log("answernum " + answerNum + " selected " + selected);
      stopTimer()
      /* $("#response").empty();
       $("#responseImg").empty();*/
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
      //go to next question
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

        //startTimer(questiontime);
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
      createElement("<div>", "response", response, "","#displayarea");
      /*$("#response").text(response);*/
      //console.log(questions[currentQuestion].url);
      var imgURL = questions[currentQuestion].url;
      var image = $("<img>").attr("src", imgURL);
      $("#displayarea").append(image);

    }

    function gameOver() {
      //first clear out the shown data
      $("#displayarea").empty();
      /*     $("#question").text("");
            $("#response").text("");
            $("#responseImg").empty();
            $("#optionsBtn").empty();*/
      createElement("<div>", "gameoverhead", "Game Over", "","#displayarea");
      createElement("<div>", "gameover", "Correct Answers: " + correct, "","#displayarea");
      createElement("<div>", "gameover", "Wrong Answers: " + wrong, "","#displayarea");
      createElement("<div>", "gameover", "Not Answered: " + unanswered, "","#displayarea");
      /*      $("#correct-text").text("Correct Answers: " + correct);
            $("#wrong-text").text("Wrong Answers: " + wrong);
            $("#unanswered-text").text("Not Answered: " + unanswered);*/
      initializeGame();
    }

    function createElement(type, addclass, text, attribute, location) {
      console.log(type + " class " + addclass + " text " + text + " location " + location)
      var addOne = $(type);
      console.log(type + " " + addclass + " " + text + " " + location)
      if (addclass !== "") {
        addOne.addClass(addclass);
      }
      if (text !== "") {
        addOne.text(text);
      }
      if (attribute !== "") {
        addOne.attr(attribute);
      }
      $(location).append(addOne);
    }

    initializeGame();

    //processing code
    $(document).ready(function () {

      //    $(".start-button").on("click", function () {
      $("#displayarea").on('click', '.start-button', function () {
        showQuestion();
      });

      //when answer selected, see if it is correct and display picture/message
      $("#displayarea").on('click', '.option', function () {
        console.log("option-click " + currentQuestion + " optionnum " + parseInt($(this).attr("optionnum")));
        checkAnswer(parseInt($(this).attr("optionnum")));
      });



    });
  
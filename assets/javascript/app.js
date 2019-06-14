var questions = [
    {
        "question": "What day is it?",
        "options": ["Monday", "Tuesday", "Wednesday", "Thursday"],
        "answer": 3,
        "url": "https://www.nytimes.com/2019/06/13/health/sleep-tracker-insomnia-orthosomnia.html",
    },
    {
        "question": "What day was yesterday?",
        "options": ["Monday", "Tuesday", "Wednesday", "Thursday"],
        "answer": 3,
        "url": "https://www.nytimes.com/2019/06/13/health/sleep-tracker-insomnia-orthosomnia.html",
    }
];

console.log(questions[0].question);
console.log(questions[0].options[0]);
console.log(questions[0].options[1]);
console.log(questions[0].options[2]);
console.log(questions[0].options[3]);
console.log(questions[0].options[0]);



// 1. Create a for-loop to iterate through.
/*for (var i = 0; i < array.length; i++) {

    //create html programmatically

    // 2. Create a variable named "letterBtn" equal to $("<button>");
    var letterBtn = $("<button>");

    // 3. Then give each "letterBtn" the following classes: "letter-button" "letter" "letter-button-color".
    letterBtn.addClass("letter-button letter letter-button-color");

    // 4. Then give each "letterBtn" a data-attribute called "data-letter".
    letterBtn.attr("data-letter", letters[i]);

    // 5. Then give each "letterBtns" a text equal to "letters[i]".
    letterBtn.text(letters[i]);

    // 6. Finally, append each "letterBtn" to the "#buttons" div (provided).
    $("#buttons").append(letterBtn);

    // 7. Create an "on-click" event attached to the ".letter-button" class.
    $(".letter-button").on("click", function () {

        // Inside the on-click event...

        // 8. Create a variable called "fridgeMagnet" and set the variable equal to a new div.
        var fridgeMagnet = $("<div>");

        // 9. Give each "fridgeMagnet" the following classes: "letter fridge-color".
        fridgeMagnet.addClass("letter fridge-color");

        // 10. Then chain the following code onto the "fridgeMagnet" variable: .text($(this).attr("data-letter"))
        // attr acts as both a setter and a getter for attributes depending on whether we supply one argument or two
        // NOTE: There IS a $(data) jQuery method, but it doesn't do what you'd expect. So just use attr.
        fridgeMagnet.text($(this).attr("data-letter"));

        // 11. Lastly append the fridgeMagnet variable to the "#display" div (provided);
        // Again you can see we use that find, and once its found we append the item
        $("#display").append(fridgeMagnet);

    });*/
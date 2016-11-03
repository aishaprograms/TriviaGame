//global variables
var gameIndex = 0;
var numCorrect = 0;
var numWrong = 0;
var numUnanswered = 0;
var totalTime;
var questionInterval;

//object prototype for Question
function Question(question, answers, correctAnswer, image) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
    this.image = image;
}

//questions are from 'http://www.triviacountry.com/M6-Food-Trivia.htm'
var q1 = new Question('Which of the following vegetables is not one of the ingredients of V-8 juice?', ['Beet', 'Carrot', 'Spinach', 'Cabbage'], 'Cabbage', '<img src="assets/images/cabbage.gif">');
var q2 = new Question('What country produces the most potatoes?', ['China', 'USA', 'Ireland', 'Russia'], 'China', '<img src="assets/images/potato.gif">');
var q3 = new Question('What soft-drink company introduced the brand Slice?', ['Dr. Pepper', 'Coca Cola', 'Seven Up', 'Pepsico'], 'Coca Cola', '<img src="assets/images/slice.gif">');
var q4 = new Question('Simplesse is the fat substitute of NutraSweet.  What is it made of?', ['a blend of proteins from egg white and milk ', 'fat molecules altered to be too large to digest', 'molecules that are the mirror-image of normal fat molecules', 'yummy stuff'], 'a blend of proteins from egg white and milk ', '<img src="assets/images/nutrasweet.gif">');
var q5 = new Question('Which grade of olive oil is considered the best?', ['extra virgin', 'pure virgin', 'superfine virgin', 'clean olive'], 'extra virgin', '<img src="assets/images/olive.gif">');

//array of all questions
var gameQuestions = [q1, q2, q3, q4, q5];

//display all elements associated with a start display
function toggleStart() {
    $('.start').show();
    $('.qa').hide();
    $('.ans').hide();
    $('.end').hide();
}

//display all elements associated with a question display
function toggleQA() {
    $('.start').hide();
    $('.qa').show();
    $('.ans').hide();
    $('.end').hide();
}

//display all elements associated with when an answer is selected or time runs out
function toggleAns() {
    $('.start').hide();
    $('.qa').hide();
    $('.ans').show();
    $('.end').hide();
}

//display all elements associated with an end display
function toggleEnd() {
    $('.start').hide();
    $('.qa').hide();
    $('.ans').hide();
    $('.end').show();
}

//shows a Question from the gameQuestions array depending on the gameIndex
function showQA() {
    var q = gameQuestions[gameIndex];
    $('#question').text(q.question);
    for (var i = 0; i < q.answers.length; i++) {
        $('#a' + i).text(q.answers[i]);
    }
}

//shows the result of the whole game
function showResults() {
    $('#results').html('');
    $('#results').append('Number of correctly answered: ' + numCorrect + '</br>');
    $('#results').append('Number of incorrectly answered: ' + numWrong + '</br>');
    $('#results').append('Number of unanswered: ' + numUnanswered + '</br>');
    if (numCorrect >= (numWrong + numUnanswered)) {
        $('#results').append('You win!');
    } else {
        $('#results').append('You lose...');

    }
}

//triggers next question depending on whether an answer was selected or time ran out
function showNextQues() {
    $('#correct-answer').text('The correct answer is: ' + gameQuestions[gameIndex].correctAnswer);
    $('#image').html(gameQuestions[gameIndex].image);
    gameIndex++;
    if (gameIndex !== gameQuestions.length) {
        setTimeout(function() {
            toggleQA();
            questionTimer();
            showQA();
        }, 3000);
    } else {
        setTimeout(function() {
            toggleEnd();
            $('#start-button').show();
            showResults();
            reset();
        }, 3000);
    }
}

//runs the time and displays the next question if time ran out for a question
function questionTimer() {
    totalTime = 15;
    $('#time-remaining').text('Time remaining: ' + totalTime);
    questionInterval = setInterval(function() {
        totalTime--;
        $('#time-remaining').text('Time remaining: ' + totalTime);
        if (totalTime === 0) {
            clearInterval(questionInterval);
            toggleAns();
            $('#ans-update').text("You ran out of time!");
            numUnanswered++;
            showNextQues();
        }
    }, 1000);
}

//resets all the global variables to play a new game
function reset() {
    gameIndex = 0;
    numCorrect = 0;
    numWrong = 0;
    numUnanswered = 0;
}

//game starts when start button is clicked and a question is displayed
//the next question is displayed when an answer is selected
$(document).ready(function() {
    toggleStart();
    $('#start-button').on('click', function() {
        toggleQA();
        questionTimer();
        showQA();
    });
    $('#answers-list').css('cursor', 'pointer');
    $('#answers-list').on('click', 'li', function() {
        toggleAns();
        clearInterval(questionInterval);
        var clicked = $(this).text();
        if (clicked === gameQuestions[gameIndex].correctAnswer) {
            $('#ans-update').text('That\'s right!');
            numCorrect++;
        } else {
            $('#ans-update').text("Wrong answer!");
            numWrong++;
        }
        showNextQues();
    });
});

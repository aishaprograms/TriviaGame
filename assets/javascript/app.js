var startInstructions = 'Click on the button to start the game. Remember you have only 15 seconds to answer each question!';
var gameStarted = false;
var gameEnded = false;
//object prototype for Question
function Question(question, answers, correctAnswer, image) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
    this.image = image;
}
//questions are from 'http://www.triviacountry.com/M6-Food-Trivia.htm'
var q1 = new Question('Which of the following vegetables is not one of the ingredients of V-8 juice?', ['Beet', 'Carrot', 'Spinach', 'Cabbage'], 'Cabbage', '');
var q2 = new Question('What country produces the most potatoes?', ['China', 'USA', 'Ireland', 'Russia'], 'China', '');
var q3 = new Question('What soft-drink company introduced the brand Slice?', ['Dr. Pepper', 'Coca Cola', 'Seven Up', 'Pepsico'], 'Coca Cola', '');
var q4 = new Question('Simplesse is the fat substitute of NutraSweet.  What is it made of?', ['a blend of proteins from egg white and milk ', 'fat molecules altered to be too large to digest', 'molecules that are the mirror-image of normal fat molecules'], 'a blend of proteins from egg white and milk ', '');
var q5 = new Question('Which grade of olive oil is considered the best?', ['extra virgin', 'pure virgin', 'superfine virgin'], 'extra virgin', '');
//array of all questions
var gameQuestions = [q1, q2, q3, q4, q5];


function makeStartButton() {
    var startButton = '<button class="btn btn-success" id="start-button">Start</button>';
    $('#button-section').html(startButton);
    $('#game-update').text(startInstructions);
    $('#start-button').on('click', startGame);
}

function startGame() {
    gameStarted = true;
    showQA();
    $('#button-section').html('');
    $('#game-update').text('');
    return;
}

var i = 0;

function showQA() {
    setTimeout(function() {
        var q = gameQuestions[i];
        $('#question').text(q.question);
        $('#answers').html('<ul id="answers-list"></ul>');
        for (var j = 0; j < q.answers.length; j++) {
            var a = '<li>' + q.answers[j] + '</li>';
            $('#answers-list').append(a);
        }
        i++;
        if (i < gameQuestions.length) {
            showQA();
        }
    }, 2 * 1000);
}

function clickAns() {
    $('#answers-list').on('click', 'li', function() {});
}

$(document).ready(function() {
    if (!gameStarted && !gameEnded) {
        makeStartButton();
    }
});

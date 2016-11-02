var gameIndex = 0;
var numCorrect = 0;
var numWrong = 0;
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
var q1 = new Question('Which of the following vegetables is not one of the ingredients of V-8 juice?', ['Beet', 'Carrot', 'Spinach', 'Cabbage'], 'Cabbage', '');
var q2 = new Question('What country produces the most potatoes?', ['China', 'USA', 'Ireland', 'Russia'], 'China', '');
var q3 = new Question('What soft-drink company introduced the brand Slice?', ['Dr. Pepper', 'Coca Cola', 'Seven Up', 'Pepsico'], 'Coca Cola', '');
var q4 = new Question('Simplesse is the fat substitute of NutraSweet.  What is it made of?', ['a blend of proteins from egg white and milk ', 'fat molecules altered to be too large to digest', 'molecules that are the mirror-image of normal fat molecules'], 'a blend of proteins from egg white and milk ', '');
var q5 = new Question('Which grade of olive oil is considered the best?', ['extra virgin', 'pure virgin', 'superfine virgin'], 'extra virgin', '');
//array of all questions
var gameQuestions = [q1, q2, q3, q4, q5];

function clearView() {
    $('#time-remaining').text('');
    $('#question').text('');
    $('#answers').html('');
    $('#game-update').text('');
    $('#correct-answer').text('');
    $('#image').html('');
    $('#results').html('');
    $('#button-section').html('');
}

function makeStartButton() {
    var startButton = '<button class="btn btn-success" id="start-button">Start</button>';
    var startInstructions = 'Click on the button to start the game. Remember you have only 15 seconds to answer each question!';
    $('#button-section').html(startButton);
    $('#game-update').text(startInstructions);
}

function showQA(i) {
    clearView();
    var q = gameQuestions[i];
    $('#question').text(q.question);
    $('#answers').html('<ul id="answers-list"></ul>');
    for (var j = 0; j < q.answers.length; j++) {
        var a = '<li>' + q.answers[j] + '</li>';
        $('#answers-list').append(a);
    }
}

function clickAns(i) {
    $('#answers-list').on('click', 'li', function() {
        clearInterval(questionInterval);
        var clicked = $(this).text();
        clearView();
        if (clicked === gameQuestions[i].correctAnswer) {
            $('#game-update').text('You are correct!');

        } else {
            $('#game-update').text("Wrong answer!");
        }
        $('#time-remaining').text('Time remaining: ' + totalTime);
        $('#correct-answer').text('The correct answer is: ' + gameQuestions[i].correctAnswer);
    });
}

function showResults() {
    clearView();
    $('#results').append('Number of correctly answered: ' + numCorrect + '</br>');
    $('#results').append('Number of incorrectly answered: ' + numWrong + '</br>');
    if (numCorrect >= numWrong) {
        $('#results').append('You win!');
    } else {
        $('#results').append('You lose...');

    }
}

function questionTimer() {
    totalTime = 15;
    questionInterval = setInterval(function() {
        $('#time-remaining').text('Time remaining: ' + totalTime);
        totalTime--;
        if (totalTime === -1) {
            clearInterval(questionInterval);
        }
    }, 1000);

}

$(document).ready(function() {
    makeStartButton();
    $('#start-button').on('click', function() {
        var gameInterval = setInterval(function() {
            showQA(gameIndex);
            questionTimer();
            clickAns(gameIndex);
            gameIndex++;
            if (gameIndex === gameQuestions.length) {
                clearInterval(gameInterval);
            }
        }, 5000);
    });
    if (gameIndex === gameQuestions.length) {
        showResults();
    }
});

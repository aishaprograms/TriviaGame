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
var q4 = new Question('Simplesse is the fat substitute of NutraSweet.  What is it made of?', ['a blend of proteins from egg white and milk ', 'fat molecules altered to be too large to digest', 'molecules that are the mirror-image of normal fat molecules', 'yummy stuff'], 'a blend of proteins from egg white and milk ', '');
var q5 = new Question('Which grade of olive oil is considered the best?', ['extra virgin', 'pure virgin', 'superfine virgin', 'clean olive'], 'extra virgin', '');
//array of all questions
var gameQuestions = [q1, q2, q3, q4, q5];

function toggleStart() {
    $('.start').show();
    $('.qa').hide();
    $('.ans').hide();
    $('.end').hide();
}

function toggleQA() {
    $('.start').hide();
    $('.qa').show();
    $('.ans').hide();
    $('.end').hide();
}

function toggleAns() {
    $('.start').hide();
    $('.qa').hide();
    $('.ans').show();
    $('.end').hide();
}

function toggleEnd() {
    $('.start').hide();
    $('.qa').hide();
    $('.ans').hide();
    $('.end').show();
}

function showQA() {
    var q = gameQuestions[gameIndex];
    $('#question').text(q.question);
    for (var i = 0; i < q.answers.length; i++) {
        $('#a' + i).text(q.answers[i]);
    }
}

function showResults() {
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
    $('#start-button').on('click', function() {
        toggleQA();
        questionTimer();
        showQA();
    });
    $('#answers-list').on('click', 'li', function() {
        toggleAns();
        clearInterval(questionInterval);
        var clicked = $(this).text();
        if (clicked === gameQuestions[gameIndex].correctAnswer) {
            $('#ans-update').text('You are correct!');
            numCorrect++;
        } else {
            $('#ans-update').text("Wrong answer!");
            numWrong++;
        }
        $('#correct-answer').text('The correct answer is: ' + gameQuestions[gameIndex].correctAnswer);
        gameIndex++;
        if (gameIndex !== gameQuestions.length) {
            setTimeout(function() {
                toggleQA();
                questionTimer();
                showQA();
            }, 3000);
        } else {
            toggleEnd();
            gameIndex = 0;
            showResults();
        }
    });
});

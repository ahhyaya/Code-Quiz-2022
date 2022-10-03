var startBtn = document.getElementById("start-btn");
var startContainerEl = document.getElementById("start-container");
var questionContainerEl =document.getElementById("question-container");
var secondLeft = 5;
var timeEl = document.getElementById("timer");
var intlContainerEl = document.getElementById("intl-container");
var scoreEl = document.getElementById("final-score");
var questions = document.getElementById("questions");
const choice1 = document.getElementById("1");
const choice2 = document.getElementById("2");
const choice3 = document.getElementById("3");
const choice4 = document.getElementById("4");
var result = document.querySelector(".result");
var nextBtn = document.getElementById("choice-btn");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit-btn");
var rankingEl = document.getElementById("ranking-container");
var viewRankingEl = document.getElementById("view-score");
var goBackBtn = document.getElementById("restart-btn");
var clearBtn = document.getElementById("clear-btn");
var finalScore = JSON.parse(localStorage.getItem("final-score")) || [];

startBtn.addEventListener("click",startQuiz);
// timer
function setTimer() {
    var timerInterval = setInterval(function() {
        secondLeft--;
        timeEl.textContent = "Time: " + secondLeft;
        if (secondLeft <= 0) {
            clearInterval(timerInterval);
            saveScore();
        }
    }, 1000);
}


//startQuiz
function startQuiz() {
    startContainerEl.classList.add("hidden");
    questionContainerEl.classList.remove("hidden");
    setTimer();
    generateQuestion();
    checkAnswer();
    // nextQuestion();
}


//generate question
function generateQuestion(){
    if (runningQuestion <= 10) {
        var q = question[runningQuestion];
    
        questions.innerHTML = "<p>"+ q.question +"</p>";
    
        choice1.innerHTML = q.choice1;
        if (q.choice1 == q.correct) {
            choice1.dataset.answer = "correct";
        } else {
            choice1.dataset.answer = "wrong";
        }
        choice2.innerHTML = q.choice2;
        if (q.choice2 == q.correct) {
            choice2.dataset.answer = "correct";
        } else {
            choice2.dataset.answer = "wrong";
        }
        choice3.innerHTML = q.choice3;
        if (q.choice3 == q.correct) {
            choice3.dataset.answer = "correct";
        } else {
            choice3.dataset.answer = "wrong";
        }
        choice4.innerHTML = q.choice4;
        if (q.choice4 == q.correct) {
            choice4.dataset.answer = "correct";
        } else {
            choice4.dataset.answer = "wrong";
        }
        } else {
            saveScore();
}
}

let runningQuestion = 0;
let q = question[runningQuestion];


choice1.addEventListener("click", checkAnswer);
choice2.addEventListener("click", checkAnswer);
choice3.addEventListener("click", checkAnswer);
choice4.addEventListener("click", checkAnswer);

function checkAnswer(event) {
    
    var choiceValue = event.target.dataset.answer;
    if (choiceValue == "correct") {
        result.textContent = "Correct!"
    } else {
        secondLeft -= 10;
        q++;
        result.textContent = "Wrong!"
    }
    runningQuestion++;
    nextQuestion();
    }
    
//go to next question
choice1.addEventListener("click", nextQuestion);
choice2.addEventListener("click", nextQuestion);
choice3.addEventListener("click", nextQuestion);
choice4.addEventListener("click", nextQuestion);

function nextQuestion(){
    generateQuestion(question[runningQuestion + 1]);
}

//save current user score
function saveScore(){
    questionContainerEl.classList.add("hidden");
    intlContainerEl.classList.remove("hidden");
    if (scoreEl >= 0){
    scoreEl.textContent = "You final score is: " + secondLeft;
    } else {
        scoreEl.textContent = "You final score is: 0 !";
    }
    timeEl.textContent = "Time: 0";
}


//load final scores to view high score list
function loadScores() {
    if (!finalScore){
        return false;
    }

    var initial = document.querySelector("intl").value;
    finalScore = JSON.parse(finalScore) || {};
    if (finalScore[initial] >= 0) {
    var newScore = {
        score: secondLeft,
        initial: initial
    }
}else {
    finalScore[initial] = 0;
}
    finalScore.push(newScore);
    finalScore.forEach(score => {
        initialField.innerText = score.initial;
        scoreField.innerText = score.score;
    })
   localStorage.setItem('highscores', JSON.stringify(highscores));
 }


//display players intl with score ranking
function ranking(initials) {
    rankingEl.classList.remove("hidden");
    intlContainerEl.classList.add("hidden");
    startContainerEl.classList.add("hidden");
    questionContainerEl.classList.add("hidden");
    if (typeof initials == "string") {
        var score = {
            initials,secondLeft
        }
        finalScore.push(score);
    }
    localStorage.setItem("finalScore", JSON.stringify(finalScore));
}




// view high score
viewRankingEl.addEventListener("click", ranking);

//submit to save to local storage
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var initials = document.querySelector("input").value;
    ranking(initials); 
});

goBackBtn.addEventListener("click", function(){
    window.location.reload();
});

clearBtn.addEventListener("click", function(){
    localStorage.clear();
});



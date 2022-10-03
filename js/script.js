var startBtn = document.getElementById("start-btn");
var startContainerEl = document.getElementById("start-container");
var questionContainerEl =document.getElementById("question-container");
var secondLeft = 75;
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
    scoreEl.textContent = "You final score is: " + secondLeft;
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
        scores.push(score);
    }
    localStorage.setItem("scores", JSON.stringify(scores));
}

// view high score
    viewRankingEl.addEventListener("click", ranking);

//submit to save to local storage
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var initials = document.querySelector("intl"),value;
    ranking();
})


//load final scores to view high score list
function loadScores() {
    var savedScore = JSON.parse(saveScore);
    var initial = document.querySelector("intl").value;
    var newScore = {
        score: secondLeft,
        initial: initial
    }
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


goBackBtn.addEventListener("click", function(){
    window.location.reload();
})

startBtn.addEventListener("click",startQuiz);
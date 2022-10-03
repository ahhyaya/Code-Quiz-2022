var startBtn = document.getElementById("start-btn");
var startContainerEl = document.getElementById("start-container");
var runningQuestion = 0;
var questionContainerEl =document.getElementById("question-container");
var secondLeft = 10;
var timeEl = document.getElementById("timer");
var intlContainerEl = document.getElementById("intl-container");
var scoreEl = document.getElementById("final-score");



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

//generate question
function generateQuestion(){

}

//go to next question
function nextQuestion(){

}

//save current user score
function saveScore(){
    questionContainerEl.classList.add("hidden");
    intlContainerEl.classList.remove("hidden");
    scoreEl.textContent = "You final score is: " + secondLeft;
}


//startQuiz
function startQuiz() {
    startContainerEl.classList.add("hidden");
    setTimer();
    generateQuestion();
    questionContainerEl.classList.add("hidden");
    nextQuestion();
}
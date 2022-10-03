var startBtn = document.getElementById("start-btn");
var startContainerEl = document.getElementById("start-container");
var runningQuestion = 0;
var questionContainerEl =document.getElementById("question-container");






startBtn.addEventListener("click",startQuiz);



// timer
function setTimer() {

}

//generate question
function generateQuestion(){

}

//go to next question
function nextQuestion(){

}


//startQuiz
function startQuiz() {
    startContainerEl.classList.add("hidden");
    setTimer();
    generateQuestion();
    questionContainerEl.classList.add("hidden");
    nextQuestion();
}
var startBtn = document.getElementById("start-btn");
var startContainerEl = document.getElementById("start-container");








startBtn.addEventListener("click",startQuiz);

function startQuiz() {
    startContainerEl.classList.add("hidden");
}
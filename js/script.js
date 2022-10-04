var startBtn = document.getElementById("start-btn");
var startContainerEl = document.getElementById("start-container");
var questionContainerEl = document.getElementById("question-container");
var secondLeft = 60;
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
var finalScore = JSON.parse(localStorage.getItem("finalScore")) || [];
var intlField = document.getElementById(".userIntls");
var scoreField = document.getElementById(".userScores");

startBtn.addEventListener("click", startQuiz);
// timer
function setTimer() {
    var timerInterval = setInterval(function () {
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
}


//generate question
function generateQuestion() {
    if (runningQuestion <= 10) {
        var q = question[runningQuestion];

        questions.innerHTML = "<p>" + q.question + "</p>";

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
    console.log(choiceValue)
    if (runningQuestion < 9) {
        if (choiceValue == "correct") {
            result.textContent = "Correct!"
        } else {
            secondLeft -= 10;
            result.textContent = "Wrong!"
        }
        runningQuestion++;
        nextQuestion();
    } else if (runningQuestion === 9 && secondLeft > 0) {
        if (choiceValue == "correct") {
            result.textContent = "Correct!"
        } else {
            result.textContent = "Wrong!"
        }
        saveScore();
    }
}


//go to next question
choice1.addEventListener("click", nextQuestion);
choice2.addEventListener("click", nextQuestion);
choice3.addEventListener("click", nextQuestion);
choice4.addEventListener("click", nextQuestion);

function nextQuestion() {
    generateQuestion(question[runningQuestion + 1]);
}

//save current user score
function saveScore() {
    clearInterval();
    questionContainerEl.classList.add("hidden");
    intlContainerEl.classList.remove("hidden");
    if (scoreEl >= 0) {
        // clearInterval();
        scoreEl.textContent = "You final score is: " + secondLeft;
    } else {
        scoreEl.textContent = "You final score is: 0 !";
        // clearInterval();
        if (secondLeft < 0) {
            secondLeft = 0;
        }
        else {
            secondLeft = secondLeft;
        }
        questionContainerEl.classList.add("hidden");
        intlContainerEl.classList.remove("hidden");
    }
    timeEl.textContent = "Time: 0";

    setTimeout(function () {
        questionContainerEl.classList.add("hidden");
        document.getElementById("final-score").textContent = "You final score is: " + secondLeft;
    }, 2000)

}


//load final scores to view high score list
function loadScores() {
    if (!finalScore) {
        return false;
    }

    finalScore = JSON.parse(finalScore);
    var initial = document.querySelector("#intl").value;
    console.log(initial)
    var newScore = {
        initial: initial,
        score: secondLeft
    }
    finalScore.push(newScore);
}


// display players intl with score ranking
function ranking(initial) {
    rankingEl.classList.remove("hidden");
    intlContainerEl.classList.add("hidden");
    startContainerEl.classList.add("hidden");
    questionContainerEl.classList.add("hidden");
    if (typeof initial == "string") {
        var score = {
            initial, secondLeft
        }
        finalScore.push(score);
    }

    var highscoreEl = document.getElementById("highscore");
    highscoreEl.innerHTML = "";
    for (i = 0; i < finalScore.length; i++) {
        var intl = document.createElement("div");
        intl.setAttribute("class", "intl-div");
        intl.innerText = finalScore[i].initial;
        var sco = document.createElement("div");
        sco.setAttribute("class", "score-div");
        if (secondLeft >= 0) {
            sco.innerText = finalScore[i].secondLeft;
        } else {
            sco.innerText = "0";
        }
        highscoreEl.appendChild(intl);
        highscoreEl.appendChild(sco);
    }
    localStorage.setItem("finalScore", JSON.stringify(finalScore));

}




// view high score
viewRankingEl.addEventListener("click", ranking);

//submit to save to local storage
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var initial = document.querySelector("#intl").value;

    ranking(initial);
});

goBackBtn.addEventListener("click", function () {
    window.location.reload();
});

clearBtn.addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("highscore").innerHTML = "";
});



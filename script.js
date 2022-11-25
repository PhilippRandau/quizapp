let currentQuestion = 0;
let questionPoints = 0;

let questionsTopic = '';



function init() {

    createContent();


    resetChoosedAnswer();
    showCurrentQuestion();
}


function chooseQuestionTopic(topic) {
    questionsTopic = topic;
    showCurrentQuestion();

    resetReplay();


}


function showCurrentQuestion() {

    questionStatus();
    let questionTopic = questionsTopic[currentQuestion];
    let questionText = document.getElementById('question-text');
    let answer1 = document.getElementById('answer_1');
    let answer2 = document.getElementById('answer_2');
    let answer3 = document.getElementById('answer_3');
    let answer4 = document.getElementById('answer_4');

    questionText.innerHTML = questionTopic['question'];
    answer1.innerHTML = questionTopic['answer_1'];
    answer2.innerHTML = questionTopic['answer_2'];
    answer3.innerHTML = questionTopic['answer_3'];
    answer4.innerHTML = questionTopic['answer_4'];
    progressBar();
}

function questionStatus() {
    let lengthQuestions = document.getElementById('length-questions');
    let currentQuestionOnCard = document.getElementById('current-question');
    lengthQuestions.innerHTML = '';
    lengthQuestions.innerHTML = questionsTopic.length;
    currentQuestionOnCard.innerHTML = '';
    currentQuestionOnCard.innerHTML = currentQuestion + 1;
}


function answer(Answer_X) {
    let rightAnswer = questionsTopic[currentQuestion]["right_answer"];
    let NumberFromString = extractNumberFromString(Answer_X);
    let rightAnswerString = `answer_${rightAnswer}`;
    console.log(rightAnswerString);
    if (NumberFromString == rightAnswer) {
        document.getElementById(Answer_X).classList.add('bg-success');
        questionPoints++;

    } else {
        document.getElementById(Answer_X).classList.add('bg-danger');
        document.getElementById(rightAnswerString).classList.add('bg-success');
    }
    document.getElementById('next-question').disabled = false;
    lockAnswerButtons();
}

function extractNumberFromString(Answer_X) {

    return Answer_X[Answer_X.length - 1];
}

function nextQuestion() {
    if (currentQuestion < questionsTopic.length - 1) {
        currentQuestion++;
        init();
        resetChoosedAnswer();
    } else {
        showFinalPoints();
    }




    progressBar();


}

function resetChoosedAnswer() {

    document.getElementById('next-question').disabled = true;
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answer_${i}`).classList.remove('bg-success');
        document.getElementById(`answer_${i}`).classList.remove('bg-danger');
        document.getElementById(`answer_${i}`).disabled = false;
    }





} function lockAnswerButtons() {
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answer_${i}`).disabled = true;
    }
}

function showFinalPoints() {
    let cardBody = document.getElementById('card-body');
    cardBody.innerHTML = ''
    cardBody.innerHTML = /*html*/`
    <div class="result">
        <img class="mt-5" src="img/brain result.png" alt="">
        
    
        <h5 class="card-title mt-2 mb-2" id="question-text"> <b> Star Wars Quiz Erledigt </b></h5>
        <div class="result-points">
            <span class="result-points-text" > Deine Punktzahl ist </span> <span> <b> ${questionPoints}/${questionsTopic.length} </b></span>
        </div>
        <button type="button" class="mt-4 btn btn-primary btn-width">Share</button>
        <button onclick="resetReplay()" type="button" class="mt-2 btn btn-outline-primary btn-width">Replay</button>
    </div>
    `;
    document.getElementById('tropy').classList.remove('d-none');
}

function resetReplay() {
    hideTropyIMG();
    resetPoints();
    resetCurrentQuestion();
}

function hideTropyIMG() {
    document.getElementById('tropy').classList.add('d-none');
}

function resetPoints() {
    questionPoints = 0;

}
function resetCurrentQuestion() {
    currentQuestion = 0;
}

function progressBar() {
    let progress = 100 / questionsTopic.length * (currentQuestion + 1)

    document.getElementById('progress-bar').style.width = `${progress}%`;

}

function createContent() {
    let content = document.getElementById('content');
    content.innerHTML = /*html*/`
    <div class="card-body" id="card-body">

    <h5 class="card-title mt-2" id="question-text">Frage</h5>
    <div>
        <div class="mt-4 mb-3 answer-buttons-body">
            <button class="answer-buttons " id="answer_1" onclick="answer('answer_1')">
                Antwort 1
            </button>
        </div>

        <div class="mb-3 answer-buttons-body">
            <button class="answer-buttons " id="answer_2" onclick="answer('answer_2')">
                Antwort 2
            </button>
        </div>

        <div class="mb-3 answer-buttons-body">
            <button class="answer-buttons " id="answer_3" onclick="answer('answer_3')">
                Antwort 3
            </button>
        </div>

        <div class="mb-3 answer-buttons-body">
            <button class="answer-buttons " id="answer_4" onclick="answer('answer_4')">
                Antwort 4
            </button>
        </div>
    </div>



    <div class="card-navigation">
            <button id="previous-question" class="pl-16 btn btn-primary previous-question"
                onclick="nextQuestion(), resetChoosedAnswer()" href="#" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                    <path
                        d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                </svg>
            </button>
            <span> <b id="current-question">1</b> von <b id="length-questions">5</b> Fragen</span>
            <button id="next-question" class="btn btn-primary next-question" onclick="nextQuestion()"
                href="#" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                    <path
                        d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
            </button>
        </div>
    </div>
                `;
}
let currentQuestion = 0;
let questionPoints = 0;

let questionsTopic = '';

let muted = true;
let audio_success = new Audio('audio/correct.mp3');
let audio_fail = new Audio('audio/wrong.mp3');

function init() {
    startScreen();
}

function startScreen() {
    let cardBody = document.getElementById('card-body')
    cardBody.innerHTML = '';
    cardBody.innerHTML = startScreenCardBody();
}

function startScreenCardBody() {
    return /*html*/`
    <div class="start-screen">
        <h1 class="text-center">Willkommen zur großartigen Quizapp</h1>
        <h2 class="mt-3">Bereit für eine Herrausforderung?</h2>
        <h3>Dann zeig was du kannst!</h3>
        <div class="start-quiz">
            <button onclick="createCardBody(questionsSW)" type="button" class="btn btn-primary start-button">Quiz Starten <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                        <path
                            d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                    </svg>
            </button>
        </div>
    </div>
    `;
}

function createCardBody(topic) {
    let cardBody = document.getElementById('card-body');
    cardBody.innerHTML = createCardBodyAnswersHTML();
    cardBody.innerHTML += createCardBodyNavigationHTML();

    chooseQuestionTopic(topic);
    highlightSelectedTopic();
}

function createCardBodyAnswersHTML() {
    return /*html*/`
        <h5 class="card-title mt-2 text-center" id="question-text">Frage</h5>
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
                `;
}

function createCardBodyNavigationHTML() {
    return /*html*/`
        <div class="card-navigation">
            <button id="previous-question" class="pl-16 btn btn-primary previous-question"
                onclick="previousQuestion()" href="#" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                    <path
                        d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                </svg>
            </button>
            <span class="text-center"> <b id="current-question">1</b> von <b id="length-questions">5</b> Fragen</span>
            <button id="next-question" class="btn btn-primary next-question" onclick="nextQuestion()"
                href="#" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                    <path
                        d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
            </button>
        </div>
                `;
}

function chooseQuestionTopic(topic) {
    saveTopicGlobal(topic);
    showCurrentQuestion();
}

function saveTopicGlobal(topic) {
    return questionsTopic = topic;
}

function resetChoosedAnswerButtons() {
    disableNextQuestionButton();
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answer_${i}`).classList.remove('bg-success');
        document.getElementById(`answer_${i}`).classList.remove('bg-danger');
        document.getElementById(`answer_${i}`).disabled = false;
    }
}

function disableNextQuestionButton() {
    return document.getElementById('next-question').disabled = true;
    
}

function showCurrentQuestion() {
    questionStatus();
    let questionTopic = questionsTopic[currentQuestion];
    showQuestionText(questionTopic);
    declareAnswers();
    outputAnswers(questionTopic);
    updateProgressBar();

}

function questionStatus() {
    showMaxLengthOfQuestionsNumber();
    showCurrentQuestionNumber();
}

function showQuestionText(questionTopic) {
    let questionText = document.getElementById('question-text');
    questionText.innerHTML = questionTopic['question'];
}

function declareAnswers() {
    let answer1 = document.getElementById('answer_1');
    let answer2 = document.getElementById('answer_2');
    let answer3 = document.getElementById('answer_3');
    let answer4 = document.getElementById('answer_4');
    return { answer1, answer2, answer3, answer4 };
}

function outputAnswers(questionTopic) {
    let answers = declareAnswers();
    answers.answer1.innerHTML = questionTopic['answer_1'];
    answers.answer2.innerHTML = questionTopic['answer_2'];
    answers.answer3.innerHTML = questionTopic['answer_3'];
    answers.answer4.innerHTML = questionTopic['answer_4'];
}

function showMaxLengthOfQuestionsNumber() {
    let lengthQuestions = document.getElementById('length-questions');
    lengthQuestions.innerHTML = '';
    lengthQuestions.innerHTML = questionsTopic.length;
}

function showCurrentQuestionNumber() {
    let currentQuestionNumber = document.getElementById('current-question');
    currentQuestionNumber.innerHTML = '';
    currentQuestionNumber.innerHTML = currentQuestion + 1;
}

function answer(Answer_X) {
    let rightAnswer = questionsTopic[currentQuestion]["right_answer"];
    let NumberFromString = extractNumberFromString(Answer_X);
    let rightAnswerString = `answer_${rightAnswer}`;

    if (compareChoosedQuestionToRightAnswer(NumberFromString,rightAnswer)) {
        ifRightAnswer(Answer_X);
    } else {
        ifWrongAnswer(Answer_X, rightAnswerString);
    }

    if (answerNotAlreadyTaken()) {
        saveAnswers(Answer_X);
    }
    enableNextQuestionButton();
    lockAnswerButtons();
}

function compareChoosedQuestionToRightAnswer(NumberFromString,rightAnswer) {
    return NumberFromString == rightAnswer;
}

function ifRightAnswer(Answer_X){
    addButtonSuccess(Answer_X);
    if (answerNotAlreadyTaken()) {
        questionPoints++;
        if (soundOn()) {
            audio_success.play();
        }
    }
}

function ifWrongAnswer(Answer_X, rightAnswerString){
    addButtonWrong(Answer_X);
        addButtonSuccess(rightAnswerString);
        if (soundOn() && answerNotAlreadyTaken()) {
            audio_fail.play();
        }
}

function addButtonSuccess(ID){
    document.getElementById(ID).classList.add('bg-success');
}

function addButtonWrong(ID){
    document.getElementById(ID).classList.add('bg-danger');
}

function answerNotAlreadyTaken(){
    return questionsTopic[currentQuestion]["choosed_answer"].length == 0;
}

function soundOn(){
   return muted == false;
}

function enableNextQuestionButton(){
    document.getElementById('next-question').disabled = false;
}

function saveAnswers(Answer_X) {
    let choosedAnswer = `${Answer_X}`;
    questionsTopic[currentQuestion]["choosed_answer"] = choosedAnswer;

}

function extractNumberFromString(Answer_X) {
    return Answer_X[Answer_X.length - 1];
}

function nextQuestion() {
    if (nextQuestionNotAlreadyAnswered()) {
        currentQuestion++;
        resetChoosedAnswerButtons();
        showCurrentQuestion();
        if (choosedAnswerNotEmpty()) {
            answer(questionsTopic[currentQuestion]["choosed_answer"]);
        }
        enablePreviousQuestionButton();
    } else {
        showFinalPoints();
    }

    updateProgressBar();
}

function nextQuestionNotAlreadyAnswered(){
    return currentQuestion < questionsTopic.length - 1;
}

function choosedAnswerNotEmpty(){
    return questionsTopic[currentQuestion]["choosed_answer"].length != 0;
}

function enablePreviousQuestionButton(){
    document.getElementById('previous-question').disabled = false;
}

function lockAnswerButtons() {
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answer_${i}`).disabled = true;
    }
}

function previousQuestion() {
    resetChoosedAnswerButtons();
    lockAnswerButtons();
    currentQuestion--;
    showCurrentQuestion();
    if ((currentQuestion) == 0) {
        disablePreviousQuestionButton();
    }
    answer(questionsTopic[currentQuestion]["choosed_answer"]);
}

function disablePreviousQuestionButton(){
    document.getElementById('previous-question').disabled = true;
}

function showFinalPoints() {
    let cardBody = document.getElementById('card-body');
    cardBody.innerHTML = ''
    cardBody.innerHTML = showFinalPointsHTML();
    document.getElementById('tropy').classList.remove('d-none');
}

function showFinalPointsHTML() {
    return /*html*/`
    <div class="result">
        <img class="mt-5" src="img/brain result.png" alt="">
        <h5 class="card-title mt-2 mb-2 text-center" id="question-text"> <b> Star Wars Quiz Erledigt </b></h5>
        <div class="result-points">
            <span class="result-points-text" > Deine Punktzahl ist </span> <span> <b> ${questionPoints}/${questionsTopic.length} </b></span>
        </div>
        <button type="button" class="mt-4 btn btn-primary btn-width">Share</button>
        <button onclick="resetReplay()" type="button" class="mt-2 btn btn-outline-primary btn-width">Replay</button>
    </div>
    `;
}

function resetReplay() {
    resetpreviousAnswers();
    resetCurrentQuestion();
    hideTropyIMG();
    resetPoints();
    createCardBody(questionsTopic);
}

function resetChangeTopic() {
    resetpreviousAnswers();
    resetCurrentQuestion();
    hideTropyIMG();
    resetPoints();
}

function resetpreviousAnswers() {
    for (let i = 0; i < questionsTopic.length; i++) {
        questionsTopic[i]["choosed_answer"] = '';

    }
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

function updateProgressBar() {
    let progress = 100 / questionsTopic.length * (currentQuestion + 1)

    document.getElementById('progress-bar').style.width = `${progress}%`;

}

function highlightSelectedTopic() {
    if (questionsTopic == questionsSW) {
        document.getElementById('button-StarWars').classList.add('highlight-topic');
        document.getElementById('button-Planets').classList.remove('highlight-topic');
        document.getElementById('button-JavaScript').classList.remove('highlight-topic');
    } else if (questionsTopic == questionsPl) {
        document.getElementById('button-StarWars').classList.remove('highlight-topic');
        document.getElementById('button-JavaScript').classList.remove('highlight-topic');
        document.getElementById('button-Planets').classList.add('highlight-topic');
    } else if (questionsTopic == questionsJS) {
        document.getElementById('button-StarWars').classList.remove('highlight-topic');
        document.getElementById('button-Planets').classList.remove('highlight-topic');
        document.getElementById('button-JavaScript').classList.add('highlight-topic');
    }
}

function toggleSound() {
    muted = !muted;
    toggleSoundSymbol();
}

function toggleSoundSymbol() {
    if (muted) {
        document.getElementById('sound-on').classList.add('d-none');
        document.getElementById('sound-off').classList.remove('d-none');
    } else {
        document.getElementById('sound-off').classList.add('d-none');
        document.getElementById('sound-on').classList.remove('d-none');
    }
}
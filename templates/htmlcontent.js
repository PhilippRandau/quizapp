
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

function showFinalPointsHTML(topicName) {
    return /*html*/`
    <div class="result">
        <img class="mt-5" src="img/brain result.png" alt="">
        <h5 class="card-title mt-2 mb-2 text-center" id="question-text"> <b> ${topicName} Quiz Erledigt </b></h5>
        <div class="result-points">
            <span class="result-points-text" > Deine Punktzahl ist </span> <span> <b> ${questionPoints}/${questionsTopic.length} </b></span>
        </div>
        <button type="button" class="mt-4 btn btn-primary btn-width">Share</button>
        <button onclick="resetReplay()" type="button" class="mt-2 btn btn-outline-primary btn-width">Replay</button>
    </div>
    `;
}
let questions = [
    {
        "question": "Wie heißt 'Star Wars' auf Deutsch?",
        "answer_1": "Sternen Krieg",
        "answer_2": "Krieg der Sterne",
        "answer_3": "Krieg gegen die Sterne",
        "answer_4": "Es gab nie einen offiziellen deutschen Namen",
        "right_answer": 2
    },
    {
        "question": "Wann ist Star Wars erschienen?",
        "answer_1": "1977",
        "answer_2": "1999",
        "answer_3": "2005",
        "answer_4": "1957",
        "right_answer": 1
    },
    {
        "question": "Wer ist der Erfinder?",
        "answer_1": "Sebastian Schweinsteiger",
        "answer_2": "George W. Bush",
        "answer_3": "Keanu Reeves",
        "answer_4": "George Lucas",
        "right_answer": 4
    },
    {
        "question": "An welches große Medienunternehmen wurden die Rechte 2012 verkauft?",
        "answer_1": "Sony",
        "answer_2": "Netflix",
        "answer_3": "Disney",
        "answer_4": "Amazon",
        "right_answer": 3
    },
    {
        "question": "Wie viele Triologien gibt es aktuell?(2022)",
        "answer_1": "5",
        "answer_2": "3",
        "answer_3": "1",
        "answer_4": "2",
        "right_answer": 2
    },



];

let currentQuestion = 0;

function init() {
    let lengthQuestions = document.getElementById('length-questions');
    let currentQuestionOnCard = document.getElementById('current-question');
    lengthQuestions.innerHTML = '';
    lengthQuestions.innerHTML = questions.length;
    currentQuestionOnCard.innerHTML = '';
    currentQuestionOnCard.innerHTML = currentQuestion + 1;


    showCurrentQuestion();

}


function showCurrentQuestion() {
    let question = questions[currentQuestion];
    let questionText = document.getElementById('question-text');
    let answer1 = document.getElementById('answer_1');
    let answer2 = document.getElementById('answer_2');
    let answer3 = document.getElementById('answer_3');
    let answer4 = document.getElementById('answer_4');

    questionText.innerHTML = question['question'];
    answer1.innerHTML = question['answer_1'];
    answer2.innerHTML = question['answer_2'];
    answer3.innerHTML = question['answer_3'];
    answer4.innerHTML = question['answer_4'];
}


function answer(Answer_X) {
    let rightAnswer = questions[currentQuestion]["right_answer"];
    let NumberFromString = Answer_X[Answer_X.length - 1];
    console.log(NumberFromString);
    if (NumberFromString == rightAnswer) {
        document.getElementById(Answer_X).parentNode.classList.add('bg-success');
        
    } else {
        document.getElementById(Answer_X).parentNode.classList.add('bg-danger');
    }
    // document.querySelector('#answer_1').disabled = true;
}

// function extractNumberFromString(Answer_X) {
    
//     return NumberFromString;
// }
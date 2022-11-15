// declare variables:
let timerElement = document.getElementById('countdown');
let quizElement = document.getElementById('quiz');
let quizElementDisplaySetting = quizElement.style.display;
let quizQuestionElement = document.getElementById('quiz-questions');
let finalResults = document.getElementsByClassName("final");
let intro = document.getElementById('intro');
let submitButton = document.getElementById('submit-question');
let startButton = document.getElementById('start-btn');
let answers = document.getElementsByName("answer");

let timeLeft = 60;

let totalCorrectAnswers = 0;
let questionNumber = 0; 
let shuffledQuestionsArray = [];

// keep here? Not sure
let currentQuestion = {}
let currentQuestionAnswer;


function countdown() {
    let timeInterval = setInterval(function () {
        if (timeLeft >= 1) {
            // set the 'textContent' of the timer to show the remaining seconds
            timerElement.textContent = timeLeft;
            timeLeft--;
        } else {
            // once timeLeft reaches 0, set timerElement to an empty string
            timerElement.textContent = "Time's Up!";
            // stop the timer
            clearInterval(timeInterval);
            
            
            /***
             * TODO: 10 second penalty
             * TODO: when time runs out, move to final page
             */
        }
    }, 1000);
}

const questions = [
    {
        question: 'How do you declare a variable in JS?',
        optionA: "var",
        optionB: "let",
        optionC: "const",
        optionD: "all of the above",
        answer: "optionD"
    },
    {
        question: 'What is the OR operator in JS?',
        optionA: "||",
        optionB: "&&",
        optionC: "or",
        optionD: ">=",
        answer: "optionA"
    },
    {
        question: 'What is a dynamically typed language??',
        optionA: "the interpreter assigns variables at runtime",
        optionB: "the interpreter assigns variables at compile time",
        optionC: "the programmer must specify what type each variable is",
        optionD: "A language that allows for dynamic variables",
        answer: "optionA"
    },
    {
        question: 'How do you initiate a multi-line comment in JS?',
        optionA: "--",
        optionB: "<#",
        optionC: "/**",
        optionD: '"""',
        answer: "optionC"
    },
    {
        question: 'What is an example of high-level programming language?',
        optionA: "Python",
        optionB: "C",
        optionC: "Javascript",
        optionD: "Option 1 & Option 3",
        answer: "optionD"
    },
    {
        question: 'What does HTML stand for?',
        optionA: "Home Tool Markup Language",
        optionB: "Hyper Text Markup Language",
        optionC: "Hyperlinks and Text Markup Language",
        optionD: "Option 1 & Option 3",
        answer: "optionB"
    },
    {
        question: 'How many tags are in a regular element in HTML?',
        optionA: "1",
        optionB: "2",
        optionC: "3",
        optionD: "4",
        answer: "optionB"
    },
    {
        question: 'What is an array?',
        optionA: "A list",
        optionB: "An ordered list",
        optionC: "A dictionary",
        optionD: "A string",
        answer: "optionA"
    },
    {
        question: 'What does JSON stand for?',
        optionA: "Java Source Open Network",
        optionB: "Javascript Stringify On Note",
        optionC: "Javascript Object Notation",
        optionD: "Java Standard Output Network",
        answer: "optionC"
    },
    {
        question: 'How do you remove the last item in an array in JS?',
        optionA: ".remove(item)",
        optionB: ".splice",
        optionC: "array[-1]",
        optionD: ".pop",
        answer: "optionD"
    }
]

function shuffleQuestions() {
    while (shuffledQuestionsArray.length <= 9) {
        let random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestionsArray.includes(random)) {
            shuffledQuestionsArray.push(random)
            let questionIndex = questions.indexOf(random)
            if (questionIndex > -1) {
                questions.splice(questionIndex,1)
            }
        }
    }
}


function nextQuestion() {
    // set question and answer
    shuffleQuestions();
    let currentQuestion = shuffledQuestionsArray[questionNumber];
    document.getElementById("question-title").textContent = currentQuestion.question;
    document.getElementById("optionA").textContent = currentQuestion.optionA;
    document.getElementById("optionB").textContent = currentQuestion.optionB;
    document.getElementById("optionC").textContent = currentQuestion.optionC;
    document.getElementById("optionD").textContent = currentQuestion.optionD;
    currentQuestionAnswer = currentQuestion.answer;

    // clears preselected options from questions
    let options = document.querySelector('input[name="answer"]:checked')

    if (options) {
        options.checked = false;
    }

    questionNumber++;
}

function submitQuestion() {
    // check answer & display if correct or not
    let answerChoices = document.getElementsByName("answer"); 
    let selectedAnswer;

    for (let i = 0; i < answerChoices.length; i++) {
        if (answerChoices[i].checked) {
            selectedAnswer = answerChoices[i].value;
            if (selectedAnswer == currentQuestionAnswer) {
                console.log("correct answer")
                totalCorrectAnswers++;
                if(questionNumber <= 10){
                    nextQuestion(questionNumber);
                } else {
                    // hide questions and display final score
                    quizQuestionElement.style.display = 'none';
                    finalResults.style.display = 'block';
                }
            } else {
                console.log("incorrect answer")
                timeLeft = timeLeft - 10;
                if (questionNumber < 9) {
                    nextQuestion(questionNumber);
                } else {
                    // hide questions and display final score
                    quizQuestionElement.style.display = 'none';
                    finalResults[0].style.display = 'block';
                }
            }
        }
    }
}

// add function to check if a question is correct and tally results

// add function to display quiz results

// add function to display high scores


function startQuiz() {
    if (quizElementDisplaySetting == 'block') {
        // show intro & hide quiz
        quizElement.style.display = 'none';
    }
    else {
        // show quiz & hide intro 
        quizElement.style.display = 'block';
        intro.style.display = 'none'
    }

    countdown();
    nextQuestion(questionNumber);

    // call questions function

}

startButton.addEventListener("click", startQuiz)
submitButton.addEventListener("click", submitQuestion)
// countdown();


/**
 * ToDOs:
 * Scores
 * Subtract time
 * After 10 questions, move to final page
 */
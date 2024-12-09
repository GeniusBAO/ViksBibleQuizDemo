const questions = [
    {
        question: "Who created the world?",
        options: ["God", "Jesus", "The Holy Spirit"],
        answer: 0
    },
    {
        question: "What is the name of the first book in the Bible?",
        options: ["Genesis", "Exodus", "Leviticus"],
        answer: 0
    },
    {
        question: "What is the name of the first book in the Bible?",
        options: ["Genesis", "Exodus", "Leviticus"],
        answer: 0
    },
    // Add more questions here...
];

// Define sounds for good and bad responses
const goodResponseSound = new Audio("https://github.com/GeniusBAO/ViksBibleQuizDemo/blob/main/goodResponse.wav");
const badResponseSound = new Audio("https://github.com/GeniusBAO/ViksBibleQuizDemo/blob/main/badResponse.wav");

// Initialize score and player name
let score = 0;
let playerName = "";
let currentQuestionIndex = 0;
let selectedOption = null;

// Function to display question and options
function displayQuestion(questionIndex) {
    const currentQuestion = questions[questionIndex];
    questionContainer.innerHTML = `<p id="question">${currentQuestion.question}</p>`;
    optionsList.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        optionsList.innerHTML += `<li data-index="${index}" class="option">${option}</li>`;
    });
    const options = document.querySelectorAll("#options li");
    options.forEach((option) => {
        option.addEventListener("click", handleOptionSelection);
    });
}

// Function to handle option selection
function handleOptionSelection(event) {
    if (selectedOption === null) {
        const selectedOptionIndex = event.target.dataset.index;
        const currentQuestion = questions[currentQuestionIndex];
        selectedOption = event.target;
        selectedOption.classList.add("selected");
        if (selectedOptionIndex == currentQuestion.answer) {
            // Good response
            goodResponseSound.play();
            resultText.innerHTML = "Correct!";
            score++;
        } else {
            // Bad response
            badResponseSound.play();
            resultText.innerHTML = `Sorry, the correct answer is ${currentQuestion.options[currentQuestion.answer]}.`;
        }
        scoreText.innerHTML = `Score: ${score}`;
        resultContainer.style.display = "block";
        setTimeout(() => {
            resultContainer.style.display = "none";
            currentQuestionIndex++;
            selectedOption = null;
            if (currentQuestionIndex < questions.length) {
                displayQuestion(currentQuestionIndex);
            } else {
                // Game over
                questionContainer.innerHTML = `<p>Game is over, ${playerName}! You scored ${score} out of ${questions.length}.</p>`;
                if (score >= questions.length / 2) {
                    questionContainer.innerHTML += `<p>Well done! You must be a Bible whiz!</p>`;
                } else {
                    questionContainer.innerHTML += `<p>Don't worry, you can try again and improve your score!</p>`;
                }
            }
        }, 2000);
    }
}

// Function to start the game
function startGame() {
    playerName = playerNameInput.value.trim();
    if (playerName !== "") {
        startButton.style.display = "none";
        playerNameInput.style.display = "none";
        displayQuestion(currentQuestionIndex);
    } else {
        alert("Please enter your name to start the game.");
    }
}

// Get HTML elements
const questionContainer = document.getElementById("question-container");
const optionsList = document.getElementById("options");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result");
const scoreText = document.getElementById("score");
const playerNameInput = document.getElementById("player-name");
const startButton = document.getElementById("start-button");

// Add event listener to start button
startButton.addEventListener("click", startGame);

// Add event listener to player name input
playerNameInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        startGame();
    }
});
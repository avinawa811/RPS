const playerChoiceBtns = document.querySelector(".player-choice");
const computerChoiceDiv = document.querySelector(".computer-choice");
const winnerInfoDiv = document.querySelector(".winner-info");
const playerScoreText = document.querySelector(".score-player-text");
const compScoreText = document.querySelector(".score-computer-text");
const resetButton = document.querySelector(".reset-btn");


const state = {
    winner: null,
    choice: ["rock", "paper", "scissors"],
    win: ["paper", "scissors", "rock"],
    lose: ["rock", "paper", "scissors"],
    winText: ["Draw", "You Win", "Computer Wins"],
    scores: [0, 0],
};

//Generate computer choice
function generateCompChoice() {
    const index = Math.floor(Math.random() * 3);
    return state.choice[index];
}

//Render computer choice
function renderCompChoice(choice) {
    const el = `
        <i class="far fa-hand-${choice}"></i>
    `;
    const prevEl = document.querySelector(".computer-choice .far");
    if (prevEl) {
        prevEl.parentElement.removeChild(prevEl);
    }
    computerChoiceDiv.insertAdjacentHTML("afterbegin", el);
}

//Render thw winner modal
function renderWinnerModal(winner, playerChoice, compChoice) {
    winnerInfoDiv.textContent = "";
    const el = `
        <p class="winner-name">${state.winText[winner]}</p>
        <p>Your Choice: <i class="far fa-hand-${playerChoice}"></i></p>
        <p>Computer Choice: <i class="far fa-hand-${compChoice}"></i></p>
    `;
    winnerInfoDiv.insertAdjacentHTML("afterbegin", el);
}

//Update the score
function updateScore() {
    state.scores[state.winner - 1] += 1;
    playerScoreText.textContent = state.scores[0];
    compScoreText.textContent = state.scores[1];
}

//Check for winner
function getWinner(userChoice, compChoice) {
    const playerChoiceIndex = state.win.findIndex((el) => el === userChoice);
    if (userChoice === compChoice) {
        //draw
        state.winner = 0;
    } else if (playerChoiceIndex !== -1 && state.lose[playerChoiceIndex] === compChoice) {
        //player wins
        state.winner = 1;
    } else {
        //computer wins
        state.winner = 2;
    }
}

//Function for resetting game
function resetGame() {
    state.scores = [0, 0];
    winner = null;
    playerScoreText.textContent = 0;
    compScoreText.textContent = 0;
    winnerInfoDiv.textContent = "";
    const prevEl = document.querySelector(".computer-choice .far");
    if (prevEl) {
        prevEl.parentElement.removeChild(prevEl);
    }
}

//EVENT LISTENER FOR PLAYER CHOICE
playerChoiceBtns.addEventListener("click", (e) => {
    if (e.target.matches(".far")) {
        //1. Get user choice
        const userChoice = e.target.dataset.val;
        //2.Get computer choice
        const compChoice = generateCompChoice();
        //3. Render computer choice
        renderCompChoice(compChoice);
        //3. Get the winner
        getWinner(userChoice, compChoice);
        //4. Show the winner modal
        renderWinnerModal(state.winner, userChoice, compChoice);
        //5. Update the scores
        updateScore();
    }
});

//EVENT LISTENER FOR RESETTING THE GAME
resetButton.addEventListener("click", () => {
    resetGame();
});



// Variables
const getEl = el => document.querySelector(el);

const statusPlayerX = getEl('.game__status .player-x');
const statusPlayerO = getEl('.game__status .player-o');
const gameMessage = getEl('.game__message');
let playerXCounter = 0;
let playerOCounter = 0;
const gameContainer = getEl('.game__container');

let gameActive = true;
let currentPlayer = 'x';

let gameState = ["", "", "", "", "", "", "", "", ""];
const winnningCoditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const drawMessage = 'Round ended in a draw';


const cells = document.querySelectorAll('.game__cell');
const restartBtn = getEl('.game__restart');
const continueBtn = getEl('.game__continue');


// EventListeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', resetGame);
continueBtn.addEventListener('click', nextRound);

// Functions

// Validates cell click
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    // Check if game is active and cell is clear
    if (!gameActive || clickedCell.classList.contains('played')) {
        return;
    } else {
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
        handleCellPlayed(clickedCell, clickedCellIndex);
    }
}


// Changes currrent player
function updateCurrentPlayer() {
    gameContainer.classList.remove(`playing-${currentPlayer}`);
    if (currentPlayer === 'x') {
        currentPlayer = 'o';
        statusPlayerX.classList.remove('active');
        statusPlayerO.classList.add('active');
    } else {
        currentPlayer = 'x';
        statusPlayerX.classList.add('active');
        statusPlayerO.classList.remove('active');
    }
    gameContainer.classList.add(`playing-${currentPlayer}`);
}


// Modifies gameState and puts x or o on grid
function handleCellPlayed(cell, cellIndex) {
    gameState[cellIndex] = currentPlayer;
    cell.classList.add('played',`played-${currentPlayer}`);
    handleResultValidation();
    updateCurrentPlayer();
}

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.classList.remove('played', 'played-x', 'played-o');
    });
    gameContainer.classList.remove(`playing-${currentPlayer}`);
    currentPlayer = 'x';
    statusPlayerX.classList.add('active');
    statusPlayerO.classList.remove('active');
    gameContainer.classList.add(`playing-${currentPlayer}`);
    gameActive = true;
    playerXCounter = 0;
    playerOCounter = 0;
    updatePlayerStatus();
    gameMessage.innerText = '';
}

function nextRound() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.classList.remove('played', 'played-x', 'played-o');
    });
    gameContainer.classList.remove(`playing-${currentPlayer}`);
    currentPlayer = 'x';
    statusPlayerX.classList.add('active');
    statusPlayerO.classList.remove('active');
    gameContainer.classList.add(`playing-${currentPlayer}`);
    gameActive = true;
    gameMessage.innerText = '';
}

function updatePlayerStatus() {
    statusPlayerX.innerText = playerXCounter;
    statusPlayerO.innerText = playerOCounter;
}

function handleResultValidation() {
    let roundWon = false;

    for (let i = 0; i < gameState.length-1; i++) {
        const winCodition = winnningCoditions[i];
        let a = gameState[winCodition[0]];
        let b = gameState[winCodition[1]];
        let c = gameState[winCodition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        if (currentPlayer === 'x') playerXCounter++;
        if(currentPlayer === 'o') playerOCounter++;
        updatePlayerStatus();
        const winningMessage = `Player ${currentPlayer.toUpperCase()} has won!`;
        gameMessage.innerText = winningMessage;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        gameMessage.innerText = drawMessage;
    }
}
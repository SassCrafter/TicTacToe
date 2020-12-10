// Variables
const getEl = el => document.querySelector(el);

const statusPlayerX = getEl('.game__status .player-x');
const statusPlayerO = getEl('.game__status .player-o');
const gameContainer = getEl('.game__container');

let gameActive = true;
let currentPlayer = 'x';

let gameState = ["", "", "", "", "", "", "", "", ""];
const winnningCoditions = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,5,9],
    [3,5,7],
    [1,4,7],
    [2,5,8],
    [3,6,9]
]

const winningMessage = `Player ${currentPlayer} has won!`;
const drawMessage = 'Game ended in a draw';


const cells = document.querySelectorAll('.game__cell');
const restartBtn = getEl('.game__restart');


// EventListeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', resetGame);

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
    updateCurrentPlayer();
    handleResultValidation();

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
}

function handleResultValidation() {
    let roundWon = false;
    

    if (roundWon) {
        console.log(winningMessage);
    }
}

//console.log(statusPlayerX, statusPlayerO);
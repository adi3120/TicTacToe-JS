let statusDisplay = document.querySelector('.game--status');
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let winningMessage = `Player ${currentPlayer} has won`;
let drawMessage = "Game over, its a draw!";
let currentPlayerTurn = `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    handlePlayerChange();
}

function handlePlayerChange() {
    if (currentPlayer == "X") {
        currentPlayer = "O";
    } else if (currentPlayer == "O") {
        currentPlayer = "X";
    }
    currentPlayerTurn = `It's ${currentPlayer}'s turn`;
    statusDisplay.innerHTML = currentPlayerTurn;
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a == '' || b == '' || c == '') {
            continue;
        }
        if (a == b && b == c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        handlePlayerChange();
        winningMessage = `Player ${currentPlayer} has won`;
        statusDisplay.innerHTML = winningMessage;
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage;
        gameActive = false;
        return;
    }


}

function handleCellClick(clickedCellEvent) {
    let clickedCell = clickedCellEvent.currentTarget;
    console.log(clickedCell);
    let clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn;
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
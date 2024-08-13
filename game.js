const columns = 25;  // Number of columns
const rows = 20;     // Number of rows
const winningLength = 5;
const board = document.getElementById('game-board');
const messageDiv = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');
let currentPlayer = 'X';
let gameActive = true;
const cells = [];

// Create the grid
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener('click', handleClick);
        board.appendChild(cell);
        cells.push(cell);
    }
}

// Handle cell click
function handleClick(event) {
    if (!gameActive) return; // Ignore clicks if game is over

    const cell = event.target;
    if (cell.textContent !== '') return; // Ignore if cell already filled

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWin(cell.dataset.row, cell.dataset.col)) {
        gameActive = false;
        messageDiv.textContent = `Player ${currentPlayer} wins!`;
        resetBtn.style.display = 'block';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Check for win
function checkWin(row, col) {
    const directions = [
        { r: 1, c: 0 }, // Vertical
        { r: 0, c: 1 }, // Horizontal
        { r: 1, c: 1 }, // Diagonal (down-right)
        { r: 1, c: -1 } // Diagonal (down-left)
    ];

    for (const { r: dr, c: dc } of directions) {
        let count = 1;

        // Check in both directions
        for (let d = 1; d < winningLength; d++) {
            const rowCheck = parseInt(row) + dr * d;
            const colCheck = parseInt(col) + dc * d;
            if (isValidPosition(rowCheck, colCheck) && getCell(rowCheck, colCheck) === currentPlayer) {
                count++;
            } else {
                break;
            }
        }
        for (let d = 1; d < winningLength; d++) {
            const rowCheck = parseInt(row) - dr * d;
            const colCheck = parseInt(col) - dc * d;
            if (isValidPosition(rowCheck, colCheck) && getCell(rowCheck, colCheck) === currentPlayer) {
                count++;
            } else {
                break;
            }
        }
        if (count >= winningLength) {
            return true;
        }
    }
    return false;
}

// Get cell value
function getCell(row, col) {
    return cells.find(cell => cell.dataset.row == row && cell.dataset.col == col)?.textContent;
}

// Validate cell position
function isValidPosition(row, col) {
    return row >= 0 && row < rows && col >= 0 && col < columns;
}

// Reset board
function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    currentPlayer = 'X';
    gameActive = true;
    messageDiv.textContent = '';
    resetBtn.style.display = 'none';
}
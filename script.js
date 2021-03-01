const boxes = document.querySelectorAll('.box');
let gameObj = {
    1: 'empty',
    2: 'empty',
    3: 'empty',
    4: 'empty',
    5: 'empty',
    6: 'empty',
    7: 'empty',
    8: 'empty',
    9: 'empty'
};
let computerThreat = {
    threatExists: false,
    threat: 'empty'
};
let playerContainer = {
    rowContainer: [0, 0, 0],
    colContainer: [0, 0, 0],
    diagContainer: [0, 0]
};
let compContainer = {
    rowContainer: [0, 0, 0],
    colContainer: [0, 0, 0],
    diagContainer: [0, 0]
};
let possibleWins = {
    row: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    col: [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    diag: [[1, 5, 9], [3, 5, 7]]
};
let winner;

function addClasses() {
    for (let i = 1; i <= 9; i++) {
        boxes[i-1].classList.add(`${i}`);
    }
}

function identify(str) {
    if (str == 'X') {
        return 'You';
    } else {
        return 'The computer';
    }
}

function findEmptyAndPlay() {
    let emptyBoxes = [];
    for (key in gameObj) {
        if (gameObj[key] == 'empty') {
            emptyBoxes.push(key);
        } else {
            continue;
        }
    }
    if (emptyBoxes.length == 0) {
        alert('Game is over and it is a draw! Reload this page to play again!');
        return;
    }
    const randomElement = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    boxes[randomElement-1].textContent = 'O';
    gameObj[randomElement] = 'O'
}

function findLocation(serialNum) {
    let row, col;
    if (serialNum < 4) {
        row = 1;
    } else if (serialNum < 7) {
        row = 2;
    } else {
        row = 3;
    }
    if (serialNum == 1 || serialNum == 4 || serialNum == 7) {
        col = 1;
    } else if (serialNum == 2 || serialNum == 5 || serialNum == 8) {
        col = 2;
    } else {
        col = 3;
    }
    return {
        row,
        col
    };
}

function checkWin() {
    let rowWin = checkRow;
    let colWin = checkCol;
    let diagWin = checkDiag;
    if (!rowWin) {
        if (!colWin) {
            if (!diagWin) {
                return false;
            } else {
                return {winner: `${identify(diagWin[0])}`, combination: diagWin[1]};
            }
        } else {
            return {winner: `${identify(colWin[0])}`, combination: colWin[1]};
        }
    } else {
        return {winner: `${identify(rowWin[0])}`, combination: rowWin[1]};
    }
}

function checkRow() {
    let possibleRowWins = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    for (let i = 0; i <= 3; i++) {
        if (possibleRowWins[i][0] == 'X' && possibleRowWins[i][1] == 'X' && possibleRowWins[i][2] == 'X') {
            return ['X', possibleRowWins[i]];
        } else if (possibleRowWins[i][0] == 'O' && possibleRowWins[i][1] == 'O' && possibleRowWins[i][2] == 'O') {
            return ['O', possibleRowWins[i]];
        } else {
            continue;
        }
    }
    return false;
}

function checkCol() {
    let possibleColWins = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];
    for (let i = 0; i <= 3; i++) {
        if (possibleColWins[i][0] == 'X' && possibleColWins[i][1] == 'X' && possibleColWins[i][2] == 'X') {
            return ['X', possibleColWins[i]];
        } else if (possibleColWins[i][0] == 'O' && possibleColWins[i][1] == 'O' && possibleColWins[i][2] == 'O') {
            return ['O', possibleColWins[i]];
        } else {
            continue;
        }
    }
    return false;
}

function checkDiag() {
    let possibleDiagWins = [[1, 5, 9], [3, 5, 7]];
    for (let i = 0; i <= 3; i++) {
        if (possibleDiagWins[i][0] == 'X' && possibleDiagWins[i][1] == 'X' && possibleDiagWins[i][2] == 'X') {
            return ['X', possibleDiagWins[i]];
        } else if (possibleDiagWins[i][0] == 'O' && possibleDiagWins[i][1] == 'O') {
            return ['O', possibleDiagWins[i]];
        } else {
            continue;
        }
    }
    return false;
}

function highlightCombination(squares) {
    for (square in squares) {
        boxes[square-1].style.backgroundColor = 'white';
    }
}

function onBoxClick(e) {
    let index = parseInt(e.target.classList[1]);
    if (gameObj[index] !== 'empty') {
        alert('Sorry, that box is occupied');
        return;
    }
    let checkWinRes = checkWin();
    if (checkWinRes == true) {
        highlightCombination(checkWinRes['combination']);
        alert(`${checkWinRes['winner']} has won by the combination highlighted on the board with white background color.`)
    }
    gameObj[index] = 'X';
    e.target.textContent = 'X';
    findEmptyAndPlay();
}

function makeMove(e) {
    let index =  parseInt(e.target.classList[1]);
    if (gameObj[index] !== 'empty') {
        alert('Sorry, that box is occupied');
        return;
    }
    gameObj[index] = 'X';
    e.target.textContent = 'X';
    let location = findLocation(index);
    playerContainer[rowContainer[location[row]-1]]++;
    playerContainer[colContainer[location[col]-1]]++;
    if (location[row] === location[col]) {
        playerContainer[diagContainer[0]]++;
    }
    if (location[row] + location[col] === 3) {
        playerContainer[diagContainer[1]]++;
    }
}

function newCheckWin(row, col, person) {
    if (playerContainer[rowContainer[row-1]] === 3) {
        alert(`You have won by the combination ${possibleWins[row[row-1]]}`)
    }
    if (gameCon)
}

function game() {
    addClasses();
    // alert("Please note that standard tic-tac-toe rules apply");
    // alert("You will be playing against AI and you have the first move. Let the game commence!");
}

boxes.forEach(box => {
    box.addEventListener('click', onBoxClick);
});

window.addEventListener('load', game);
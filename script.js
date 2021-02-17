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
}
let winner;

function addClasses() {
    for (let i = 1; i <= 9; i++) {
        boxes[i-1].classList.add(`${i}`);
    }
}

function identify(str) {
    if (str == 'O') {
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
    const randomElement = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    boxes[randomElement-1].textContent = 'O';
    gameObj[randomElement] = 'O'
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

function game() {
    addClasses();
    // alert("Please note that standard tic-tac-toe rules apply");
    // alert("You will be playing against AI and you have the first move. Let the game commence!");
}

boxes.forEach(box => {
    box.addEventListener('click', onBoxClick);
});

window.addEventListener('load', game);
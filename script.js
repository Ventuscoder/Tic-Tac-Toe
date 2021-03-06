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

function reloadPage() {
    location.reload();
}

function makeComputerMove() {
    let emptyBoxes = [];
    for (let i = 1; i < 10; i++) {
        if (gameObj[i] === 'empty') {
            emptyBoxes.push(i);
        }
    }
    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    boxes[randomBox-1].textContent = 'O';
    gameObj[randomBox] = 'O';
    let location = findLocation(randomBox);
    compContainer['rowContainer'][location['row']-1]++;
    compContainer['colContainer'][location['col']-1]++;
    if (location['row'] === location['col']) {
        compContainer['diagContainer'][0]++;
    }
    if (location['row'] + location['col'] === 3) {
        compContainer['diagContainer'][1]++;
    }
    if (checkWin(location['row'], location['col']) == true) {
        reloadPage();
    }
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
    playerContainer['rowContainer'][location['row']-1]++;
    playerContainer['colContainer'][location['col']-1]++;
    if (location['row'] === location['col']) {
        playerContainer['diagContainer'][0]++;
    }
    if (location['row'] + location['col'] === 3) {
        playerContainer['diagContainer'][1]++;
    }
    if (checkWin(location['row'], location['col']) == true) {
        reloadPage();
    }
    makeComputerMove();
}

function checkWin(row, col) {
    if (playerContainer['rowContainer'][row-1] === 3) {
        alert(`You have won by the combination ${possibleWins['row'][row-1]}`);
        return true;
    }
    if (playerContainer['colContainer'][col-1] === 3) {
        alert(`You have won by the combination ${possibleWins['col'][col-1]}`);
        return true;
    }
    for (let i = 0; i < 2; i++) {
        if (playerContainer['diagContainer'][i] === 3) {
            alert(`You have won by the combination ${possibleWins['diag'][i]}`);
            return true;
        }
    }
    if (compContainer['rowContainer'][row-1] === 3) {
        alert(`The computer has won by the combination ${possibleWins['row'][row-1]}`);
        return true;
    }
    if (compContainer['colContainer'][col-1] === 3) {
        alert(`The computer has won by the combination ${possibleWins['col'][col-1]}`);
        return true;
    }
    for (let i = 0; i < 2; i++) {
        if (compContainer['diagContainer'][i] === 3) {
            alert(`The computer has won by the combination ${possibleWins['diag'][i]}`);
            return true;
        }
    }
    return false;
}

function game() {
    addClasses();
    alert("Please note that standard tic-tac-toe rules apply");
    alert("You will be playing against AI and you have the first move. Let the game commence!");
}

boxes.forEach(box => {
    box.addEventListener('click', makeMove);
});

window.addEventListener('load', game);
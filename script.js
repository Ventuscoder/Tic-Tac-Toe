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
let winner;

function addClasses() {
    for (let i = 1; i <= 9; i++) {
        boxes[i-1].classList.add(`${i}`);
    }
}

function findEmptyAndPlay() {
    for (key in gameObj) {
        if (gameObj[key] == 'empty') {
            gameObj[key] = 'O';
            boxes[key - 1].textContent = 'O';
            return;
        } else {
            continue;
        }
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
}

function onBoxClick(e) {
    let index = parseInt(e.target.classList[1]);
    if (gameObj[index] !== 'empty') {
        console.log('Sorry, that box is occupied');
        return;
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
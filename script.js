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

function onBoxClick(e) {
    let index = parseInt(e.target.classList[1]);
    if (gameObj[index] !== 'empty') {
        console.log('Sorry, that box is occupied');
        return;
    }
    gameObj[index] = 'X';
    e.target.textContent = 'X';
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
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

function parseIndex(classList) {
    console.log(classList[1]);
}

function game() {
    addClasses();
    // alert("Please note that standard tic-tac-toe rules apply");
    // alert("You will be playing against AI and you have the first move. Let the game commence!");
}

boxes.forEach(box => {
    box.addEventListener('click', function(e) {
        parseIndex(e.target.classList);
    });
});

window.addEventListener('load', game);
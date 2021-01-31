const boxes = document.querySelectorAll('.box');

function addClasses() {
    for (let i = 1; i <= 9; i++) {
        boxes[i-1].classList.add(`${i}`);
    }
}

function game() {
    addClasses();
    // alert("Please note that standard tic-tac-toe rules apply");
    // alert("You will be playing against AI and you have the first move. Let the game commence!");
}
window.addEventListener('load', game);
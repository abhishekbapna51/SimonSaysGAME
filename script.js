const colors = ['red', 'blue', 'green', 'yellow'];
let sequence = [];
let userSequence = [];
let level = 0;
let started = false;

const startButton = document.getElementById('start-btn');
const statusDisplay = document.getElementById('status');

startButton.addEventListener('click', startGame);

function startGame() {
    sequence = [];
    userSequence = [];
    level = 0;
    started = true;
    statusDisplay.textContent = 'Level 0';
    nextSequence();
}

function nextSequence() {
    userSequence = [];
    level++;
    statusDisplay.textContent = `Level ${level}`;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
    playSequence();
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        if (i < sequence.length) {
            flashColor(sequence[i]);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 1000);
}

function flashColor(color) {
    const box = document.querySelector(`.${color}`);
    box.classList.add('active');
    setTimeout(() => {
        box.classList.remove('active');
    }, 500);
}

document.querySelectorAll('.color-box').forEach(box => {
    box.addEventListener('click', handleUserClick);
});

function handleUserClick(event) {
    if (!started) return;
    const color = event.target.dataset.color;
    userSequence.push(color);
    flashColor(color);
    checkUserSequence(userSequence.length - 1);
}

function checkUserSequence(currentLevel) {
    if (userSequence[currentLevel] === sequence[currentLevel]) {
        if (userSequence.length === sequence.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        statusDisplay.textContent = 'Game Over! Click Start to play again.';
        started = false;
    }
}

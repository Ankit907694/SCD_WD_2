// Variables declare kar rahe hain
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let lapCounter = 1;

// HTML elements ko JavaScript mein la rahe hain
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

// Time ko 00:00:00.00 format mein dikhane ka function
function formatTime(time) {
    let date = new Date(time);
    let h = String(date.getUTCHours()).padStart(2, '0');
    let m = String(date.getUTCMinutes()).padStart(2, '0');
    let s = String(date.getUTCSeconds()).padStart(2, '0');
    let ms = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
    
    if (h === "00") {
        return `${m}:${s}.${ms}`;
    }
    return `${h}:${m}:${s}.${ms}`;
}

// Display update karne ka function
function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

// START Button Logic
startBtn.addEventListener('click', () => {
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10); // Har 10ms mein update hoga
    }
});

// PAUSE Button Logic
pauseBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

// RESET Button Logic
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    lapCounter = 1;
    display.textContent = "00:00:00.00";
    lapsList.innerHTML = ""; // Saare laps hata do
});

// LAP Button Logic
lapBtn.addEventListener('click', () => {
    if (timerInterval) { // Lap tabhi record hoga jab timer chal raha ho
        const li = document.createElement('li');
        li.innerHTML = `<span>Lap ${lapCounter}</span> <span>${formatTime(elapsedTime)}</span>`;
        lapsList.prepend(li); // Naya lap list mein sabse upar dikhega
        lapCounter++;
    }
});

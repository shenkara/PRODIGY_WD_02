// app.js
let tensEl = document.getElementById('tens');
let secondsEl = document.getElementById('seconds');
let minEl = document.getElementById('min');
let buttonDiv = document.getElementById('btn-div');
let lapList = document.getElementById('lapList');

let startBtn = document.getElementById('start');
let resetBtn = document.getElementById('reset');

let minute = 0;
let seconds = 0;
let tens = 0;
let timer = false;
let lapTimes = [];
let interval;

function buttonOp() {
    createStopBtn();
}

function createStopBtn() {
    startBtn.remove();
    let stop = document.createElement('button');
    stop.textContent = 'STOP';
    buttonDiv.prepend(stop);
    stop.onclick = function () {
        stopTimer();
        stop.remove();
        createStartBtn();
    };
}

function createStartBtn() {
    let start = document.createElement('button');
    start.textContent = 'START';
    buttonDiv.prepend(start);
    start.onclick = function () {
        start.remove();
        createStopBtn();
        startTimer();
    };
}

function startTimer() {
    timer = true;
    stopWatch();
}

function stopTimer() {
    timer = false;
    clearInterval(interval);
}

function resetTimer() {
    timer = false;
    tens = 0;
    minute = 0;
    seconds = 0;
    tensEl.textContent = '0' + tens;
    minEl.textContent = '0' + minute;
    secondsEl.textContent = '0' + seconds;
    lapTimes = [];
    updateLapList();
    clearInterval(interval);
}

function recordLap() {
    lapTimes.push(`${minEl.textContent}:${secondsEl.textContent}.${tensEl.textContent}`);
    updateLapList();
}

function updateLapList() {
    lapList.innerHTML = '';
    lapTimes.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapList.appendChild(li);
    });
}

function stopWatch() {
    if (timer === true) {
        tens++;
        if (tens <= 9) {
            tensEl.textContent = '0' + tens;
        }
        if (tens >= 10) {
            tensEl.textContent = tens;
        }
        if (tens === 99) {
            tens = 0;
            seconds++;
            if (seconds <= 9) {
                secondsEl.textContent = '0' + seconds;
            }
            if (seconds >= 10) {
                secondsEl.textContent = seconds;
            }
            if (seconds === 59) {
                seconds = 0;
                minute++;
                if (minute <= 9) {
                    minEl.textContent = '0' + minute;
                }
                if (minute >= 10) {
                    minEl.textContent = minute;
                }
            }
        }
        interval = setTimeout(startTimer, 10);
    }
}
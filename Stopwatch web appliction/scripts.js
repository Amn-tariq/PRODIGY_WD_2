const timeDisplay = document.getElementById("time-display");
const lapList = document.getElementById("lap-list");

let timerInterval = null;
let elapsedTime = 0;
let isRunning = false;

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000)/10);

    const paddedHours = String(hours).padStart(2, "0");
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");
    const paddedMilliseconds = String(milliseconds).padStart(2, "0");

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}.${paddedMilliseconds}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    const startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      timeDisplay.textContent = formatTime(elapsedTime);
    }, 10);
}

function pauseTimer() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(timerInterval);
}

function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    timeDisplay.textContent = "00:00:00.000";
    lapList.innerHTML = "";
}

const hideLap = new Event("recordLap");

document.addEventListener("recordLap", () => {
    console.log("Custom lap event triggered!");
});

const laps = document.getElementById("laps");
laps.style.display = "none";
document.dispatchEvent(hideLap);

function recordLap() {
    if (elapsedTime === 0) return;
    laps.style.display = "block";
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = ` ${lapList.childElementCount + 1}: ${lapTime}`;
    lapList.appendChild(lapItem);
}

document.getElementById("start-btn").addEventListener("click", startTimer);
document.getElementById("pause-btn").addEventListener("click", pauseTimer);
document.getElementById("reset-btn").addEventListener("click", resetTimer);
document.getElementById("lap-btn").addEventListener("click", recordLap);

let startTime, updatedTime, difference, timerInterval;
let isRunning = false;
let lapCounter = 1;

function startTimer() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 1000);
        isRunning = true;
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    difference = 0;
    lapCounter = 1;
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("laps").innerHTML = "";
}

function recordLap() {
    if (isRunning) {
        const lapTime = document.getElementById("display").textContent;
        const lapContainer = document.getElementById("laps");
        const lapItem = document.createElement("div");
        lapItem.classList.add("lap-item");
        lapItem.textContent = `Lap ${lapCounter++}: ${lapTime}`;
        lapContainer.prepend(lapItem); // Add the latest lap at the top
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById("display").textContent = 
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("startBtn").addEventListener("click", startTimer);
    document.getElementById("stopBtn").addEventListener("click", stopTimer);
    document.getElementById("resetBtn").addEventListener("click", resetTimer);
    document.getElementById("lapBtn").addEventListener("click", recordLap);
});

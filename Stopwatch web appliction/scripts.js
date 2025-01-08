// Path: scripts.js

// Select DOM elements
const timeDisplay = document.getElementById("time-display");
const lapList = document.getElementById("lap-list");

let timerInterval = null; // To store the interval ID
let elapsedTime = 0; // Total time in milliseconds
let isRunning = false; // To check if the timer is running

// Function to format time with milliseconds
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = ms % 1000; // Remainder of division by 1000
  
    const paddedHours = String(hours).padStart(2, "0");
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");
    const paddedMilliseconds = String(milliseconds).padStart(3, "0");
  
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}.${paddedMilliseconds}`;
  }
  
  // Start the timer
  function startTimer() {
    if (isRunning) return; // Prevent multiple intervals
    isRunning = true;
    const startTime = Date.now() - elapsedTime;
  
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      timeDisplay.textContent = formatTime(elapsedTime);
    }, 10); // Update every 10ms for better precision
  }
  
  // Pause the timer
  function pauseTimer() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(timerInterval);
  }
  
  // Reset the timer
  function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    timeDisplay.textContent = "00:00:00.000";
    lapList.innerHTML = ""; // Clear laps
  }
  
  // Record a lap
  function recordLap() {
    if (elapsedTime === 0) return; // No lap if timer hasn't started
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapList.childElementCount + 1}: ${lapTime}`;
    lapList.appendChild(lapItem);
  }
  

// Attach event listeners
document.getElementById("start-btn").addEventListener("click", startTimer);
document.getElementById("pause-btn").addEventListener("click", pauseTimer);
document.getElementById("reset-btn").addEventListener("click", resetTimer);
document.getElementById("lap-btn").addEventListener("click", recordLap);


// Explanation of Code
// formatTime Function:

// Converts elapsed time in milliseconds into HH:MM:SS format.
// Uses String.prototype.padStart to ensure two-digit formatting.
// Start Timer:

// Uses Date.now() to get the current timestamp.
// Updates elapsedTime continuously based on the difference between the current time and the starting point.
// Pause Timer:

// Stops the setInterval loop using clearInterval.
// Reset Timer:

// Stops the timer, clears the elapsedTime, and resets the display.
// Record Lap:

// Creates a new <li> element for each lap and appends it to the lap list.
// Next Steps
// Test each button to ensure the logic works as expected.
// Tweak the update interval (currently 100ms) for better precision if needed.
// Let me know if you encounter any issues or need additional features!
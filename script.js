// Digital Clock Application
// This script creates a real-time digital clock synchronized with the system time

// DOM Elements
const clockElement = document.getElementById('clock');
const dateElement = document.getElementById('date');
const greetingElement = document.getElementById('greeting');

/**
 * Main function to update the clock display
 * Called every second to keep time synchronized
 */
function updateClock() {
    const now = new Date();

    // Get individual time components
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Format time components to always show 2 digits
    const formattedHours = formatTimeComponent(hours);
    const formattedMinutes = formatTimeComponent(minutes);
    const formattedSeconds = formatTimeComponent(seconds);

    // Create the time string with blinking colon effect
    const timeString = `${formattedHours}:${formattedMinutes}<span class="seconds-dot">:</span>${formattedSeconds}`;

    // Update the clock display in the DOM
    clockElement.innerHTML = timeString;

    // Update additional displays
    updateDateDisplay(now);
    updateGreeting(hours);
}

/**
 * Formats time components to always show 2 digits
 * @param {number} component - Time component (hours, minutes, seconds)
 * @returns {string} Formatted 2-digit string
 */
function formatTimeComponent(component) {
    return component.toString().padStart(2, '0');
}

/**
 * Updates the date display with formatted date string
 * @param {Date} date - Current date object
 */
function updateDateDisplay(date) {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const dateString = date.toLocaleDateString('en-US', options);
    dateElement.textContent = dateString;
}

/**
 * Updates the greeting based on time of day
 * @param {number} hours - Current hour (0-23)
 */
function updateGreeting(hours) {
    let greeting;

    if (hours >= 5 && hours < 12) {
        greeting = "Good morning!";
    } else if (hours >= 12 && hours < 18) {
        greeting = "Good afternoon!";
    } else if (hours >= 18 && hours < 22) {
        greeting = "Good evening!";
    } else {
        greeting = "Good night!";
    }

    greetingElement.textContent = greeting;
}

/**
 * Adds click interaction to the clock element
 */
function setupClockInteraction() {
    clockElement.addEventListener('click', function () {
        // Add visual feedback when clock is clicked
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

/**
 * Initializes the clock application
 * Called when the page loads
 */
function initClock() {
    // Update clock immediately to avoid initial delay
    updateClock();

    // Set up interval to update clock every second
    setInterval(updateClock, 1000);

    // Set up interactive features
    setupClockInteraction();

    console.log('Digital Clock initialized successfully!');
}

// Initialize the clock when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initClock);

// Alternative initialization for older browsers
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initClock);
} else {
    initClock();
}
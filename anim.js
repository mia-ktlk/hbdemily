// Initial message to display
const messageText = "Happy Birthday to the most beautiful and amazing, visionary, team leader, protector, fashionista, farm girl, producer, dealmaker, badass, negotiator, innovator, mentor, strategist, motivator, trailblazer, mother, and friend. We are so grateful to have you in our lives. Love, Mia & Ethan";

// Split the message into individual words
const words = messageText.split(' ');

// Reference to the HTML elements
const messageElement = document.getElementById('message');
const instructionsElement = document.getElementById('instructions');

// Variables to keep track of the word display
let wordIndex = 0;
let interactionStarted = false;
let movementThreshold = 200; // Adjust this value to require more/less movement
let totalMovement = 0;
let lastMouseX = null;
let lastMouseY = null;

// Colors for changing text
const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'cyan', 'magenta'];
let colorIndex = 0;
let colorChangeCount = 0;

// Function to display the next word
function displayNextWord() {
    if (wordIndex < words.length) {
        const wordSpan = document.createElement('span');
        wordSpan.textContent = words[wordIndex] + ' ';
        wordSpan.style.opacity = 0;
        messageElement.appendChild(wordSpan);

        // Fade in the word
        setTimeout(() => {
            wordSpan.style.transition = 'opacity 1s';
            wordSpan.style.opacity = 1;
        }, 100);

        wordIndex++;
    } else {
        // Change text color after all words are displayed
        changeTextColor();
    }
}

// Function to change the text color
function changeTextColor() {
    const spans = messageElement.getElementsByTagName('span');
    for (let i = 0; i < spans.length; i++) {
        spans[i].style.color = colors[colorIndex % colors.length];
    }
    colorIndex++;
    colorChangeCount++;
    if (colorChangeCount >= 4) {
        instructionsElement.textContent = '❤️';
    }
}

// Event handler for mouse movement
function handleMouseMove(event) {
    if (lastMouseX !== null && lastMouseY !== null) {
        const deltaX = event.clientX - lastMouseX;
        const deltaY = event.clientY - lastMouseY;
        totalMovement += Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;

    if (totalMovement >= movementThreshold) {
        displayNextWord();
        totalMovement = 0; // Reset movement counter
    }
}

// Event handler for touch events
function handleTouchMove(event) {
    totalMovement += 1; // Increment movement counter for each touch move

    if (totalMovement >= movementThreshold) {
        displayNextWord();
        totalMovement = 0; // Reset movement counter
    }
}

// Event handler for mouse and touch interactions
function handleInteraction() {
    if (!interactionStarted) {
        instructionsElement.textContent = 'Keep going';
        interactionStarted = true;
    }
}

// Event listeners for mouse movement and touch events
document.addEventListener('mousemove', (event) => {
    handleInteraction();
    handleMouseMove(event);
});

document.addEventListener('touchmove', (event) => {
    handleInteraction();
    handleTouchMove(event);
});

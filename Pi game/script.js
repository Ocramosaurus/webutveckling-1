const PI_DIGITS = "1415926535897932384626433832795028841971693993751058209749"; // Extend as needed
const inputField = document.getElementById("pi-input");
const correctDigitsSpan = document.getElementById("correct-digits");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restart-btn");

let correctDigits = "";
let gameOver = false;

inputField.addEventListener("input", () => {
    if (gameOver) return;

    const userInput = inputField.value;
    if (userInput === PI_DIGITS.slice(0, userInput.length)) {
        correctDigits = userInput;
        correctDigitsSpan.textContent = correctDigits;
    } else {
        gameOver = true;
        message.textContent = `You lost! The next digit was ${PI_DIGITS[userInput.length - 1]}`;
        inputField.disabled = true;
    }
});

restartBtn.addEventListener("click", () => {
    correctDigits = "";
    gameOver = false;
    correctDigitsSpan.textContent = "";
    message.textContent = "";
    inputField.value = "";
    inputField.disabled = false;
    inputField.focus();
});

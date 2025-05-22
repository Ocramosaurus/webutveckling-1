let dictionary = new Set();
let validWordsFound = [];
let startTime = null;

function formatTime(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

// Load word list and start
fetch("five_letter_words.txt")
  .then((response) => response.text())
  .then((text) => {
    const words = text.split("\n").map(word => word.trim().toLowerCase());
    dictionary = new Set(words);
    startGenerating();
  })
  .catch((err) => console.error("Error loading word list:", err));

// Generate random 5-letter word
function getRandomWord() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  return Array.from({ length: 5 }, () => letters[Math.floor(Math.random() * letters.length)]).join("");
}

// Generate and display 5 words
function generateWords() {
  const wordsContainer = document.getElementById("words");
  const resultContainer = document.getElementById("result");
  const listContainer = document.getElementById("foundList");

  wordsContainer.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const word = getRandomWord();
    const wordElem = document.createElement("div");
    wordElem.className = "word";
    wordElem.textContent = word;

    if (dictionary.has(word) && !validWordsFound.includes(word)) {
      wordElem.classList.add("match");
      validWordsFound.push(word);

      const listItem = document.createElement("li");
      listItem.textContent = word;
      listContainer.appendChild(listItem);
    }

    wordsContainer.appendChild(wordElem);
  }

  resultContainer.textContent = `✅ Valid words found: ${validWordsFound.length}`;
}

// Start generation and timer
function startGenerating() {
  startTime = Date.now();

  setInterval(() => {
    generateWords();

    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("timer").textContent = `⏱️ Time: ${formatTime(elapsedSeconds)}`;
  }, 500); // Every 0.5 seconds
}

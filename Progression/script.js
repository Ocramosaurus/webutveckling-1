document.getElementById("addButton").addEventListener("click", addText);
document.getElementById("textbox").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addText();
    }
});

// Funktion för att hämta sparade data från localStorage
function loadData() {
    const savedData = JSON.parse(localStorage.getItem("textData"));
    if (savedData) {
        savedData.forEach((item) => {
            addTextToList(item.text, item.checked, item.klaradText);
        });
    }
}

// Funktion för att lägga till text och checkbox i listan
function addText() {
    const textbox = document.getElementById("textbox");

    if (textbox.value.trim() !== "") {
        // Lägg till texten i listan
        addTextToList(textbox.value, false, "");

        // Spara texten i localStorage
        saveData();

        // Rensa textboxen efter att texten lagts till
        textbox.value = "";
    }
}

// Funktion för att lägga till texten i listan och skapa element
function addTextToList(text, checked, klaradText) {
    const textBoxContainer = document.createElement("div");
    textBoxContainer.classList.add("text-box");

    // Texten som användaren skriver
    const textNode = document.createElement("span");
    textNode.textContent = text;

    // Checkbox
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = checked;

    // Klarad text som ska visas när checkbox är markerad
    const klaradLabel = document.createElement("span");
    klaradLabel.classList.add("klarad-text");
    klaradLabel.textContent = klaradText;

    // När checkbox är markerad
    checkBox.addEventListener("change", function () {
        if (checkBox.checked) {
            // Lägg till "Klarad: datum" bredvid texten
            const today = new Date();
            const date =
                today.getFullYear() +
                "/" +
                (today.getMonth() + 1).toString().padStart(2, "0") +
                "/" +
                today.getDate().toString().padStart(2, "0");
            klaradLabel.textContent = `Klarad: ${date}`;
            textNode.classList.add("striked");
        } else {
            klaradLabel.textContent = "";
            textNode.classList.remove("striked");
        }

        // Spara data efter varje ändring
        saveData();
    });

    // Lägg till text och checkbox i div:en
    textBoxContainer.appendChild(textNode);
    textBoxContainer.appendChild(checkBox);
    textBoxContainer.appendChild(klaradLabel);

    // Lägg till den nya boxen i textlistan
    const textList = document.getElementById("textList");
    textList.appendChild(textBoxContainer);

    // Om texten var överstruken från sparad data, applicera den
    if (checked) {
        textNode.classList.add("striked");
    }
}

// Funktion för att spara data till localStorage
function saveData() {
    const textList = document.getElementById("textList");
    const textData = [];

    // Hämta alla texter och checkboxstatusar
    const textBoxes = textList.getElementsByClassName("text-box");
    for (let box of textBoxes) {
        const text = box.querySelector("span").textContent;
        const checked = box.querySelector("input").checked;
        const klaradText = box.querySelector(".klarad-text").textContent;
        textData.push({ text, checked, klaradText });
    }

    // Spara datan i localStorage
    localStorage.setItem("textData", JSON.stringify(textData));
}

// Ladda data när sidan laddas om
window.addEventListener("load", loadData);

function toggleCellColor(element) {
    element.classList.toggle('markedCell');
}

function isWordComplete(wordDiv) {
    let cells = wordDiv.querySelectorAll(".cell");
    for (let cell of cells) {
        if (cell.value.trim() === "") {
            return false;
        }
    }
    return true;
}

function getCompletedWord(wordDiv) {
    let completedWord = "";
    let cells = wordDiv.querySelectorAll(".cell");
    cells.forEach(cell => completedWord += cell.value);
    return completedWord;
}

function makeWordDiv(data, number) {
    let wordDiv = document.createElement("div");
    wordDiv.classList.add("wordDiv");
    
    let wordNumber = document.createElement("div");
    wordNumber.textContent = `${number+1}`;
    wordDiv.appendChild(wordNumber);
    for (let j = 0; j < data; j++) {
        let letterCell = makeLetterCell(wordDiv);
        wordDiv.appendChild(letterCell);
    }
    return wordDiv;
}

function addAnswerCheck(cell, wordDiv) {
    cell.addEventListener("input", function() {
        if (isWordComplete(wordDiv)) {
            let completedWord = getCompletedWord(wordDiv);
            // request
            console.log("Completed word:", completedWord);
        }
    });
}

function makeLetterCell(wordDiv) {
    let letterCell = document.createElement("input");
    letterCell.classList.add("cell");
    letterCell.type = "text";
    letterCell.style.width = "20px";
    letterCell.style.height = "20px";
    letterCell.maxLength = 1;
    addAnswerCheck(letterCell, wordDiv);
    return letterCell;
}

function makeSyllableCell(data, number) {
    let syllableCell = document.createElement("div");
    syllableCell.classList.add("cell");
    syllableCell.classList.add("markableCell");
    syllableCell.onclick
    syllableCell.textContent = `${data}`;
    syllableCell.style.cursor = "pointer";
    syllableCell.style.width = "30px";
    syllableCell.style.height = "30px";
    return syllableCell;
}

function makeDefCell(data, number) {
    let definitionCell = document.createElement("div");
    definitionCell.classList.add("cell");
    definitionCell.textContent = `${number+1}. ${data}`;
    definitionCell.style.justifyContent = "left";
    return definitionCell;
}

function initializeDiv(id, data, func) {
    let idVar = document.getElementById(id);
    for (let i = 0; i < data.length; i++) {
        let cell = func(data[i], i);
        idVar.appendChild(cell);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/get_game')
    .then(response => response.json())
    .then(data => {
        initializeDiv("crossword", data.words, makeWordDiv);
        initializeDiv("syllables", data.syllables, makeSyllableCell);
        initializeDiv("definitions", data.definitions, makeDefCell);
    })
    .then(() => {
        const cells = document.querySelectorAll('.markableCell');
        cells.forEach(cell => {
            cell.addEventListener('click', function() {
                this.classList.toggle('markedCell');
            });
        });})
});
    
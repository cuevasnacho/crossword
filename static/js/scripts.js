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

document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/get_game')
    .then(response => response.json())
    .then(data => {
        let crossword = document.getElementById("crossword");
        for (let i = 0; i < data.words.length; i++) {
            let wordDiv = document.createElement("div");
            wordDiv.classList.add("wordDiv");
            crossword.appendChild(wordDiv);
            
            let wordNumber = document.createElement("div");
            wordNumber.textContent = `${i+1}`;
            wordDiv.appendChild(wordNumber);
            for (let j = 0; j < data.words[i]; j++) {
                let letterCell = document.createElement("input");
                letterCell.classList.add("cell");
                letterCell.type = "text";
                letterCell.style.width = "20px";
                letterCell.style.height = "20px";
                letterCell.maxLength = 1;
                wordDiv.appendChild(letterCell);
                
                letterCell.addEventListener("input", function() {
                    if (isWordComplete(wordDiv)) {
                        let completedWord = getCompletedWord(wordDiv);
                        // request
                        console.log("Completed word:", completedWord);
                    }
                });
            }

        }

        let syllables = document.getElementById("syllables");
        for (let i = 0; i < data.syllables.length; i++) {
            let syllableCell = document.createElement("div");
            syllableCell.classList.add("cell");
            syllableCell.classList.add("markableCell");
            syllableCell.onclick
            syllableCell.textContent = `${data.syllables[i]}`;
            syllableCell.style.cursor = "pointer";
            syllableCell.style.width = "30px";
            syllableCell.style.height = "30px";
            syllables.appendChild(syllableCell);
        }

        let definitions = document.getElementById("definitions");
        for (let i = 0; i < data.definitions.length; i++) {
            let definitionCell = document.createElement("div");
            definitionCell.classList.add("cell");
            definitionCell.textContent = `${i+1}. ${data.definitions[i]}`;
            definitionCell.style.justifyContent = "left";
            definitions.appendChild(definitionCell);
        }
    })
    .then(() => {
        const cells = document.querySelectorAll('.markableCell');
        cells.forEach(cell => {
            cell.addEventListener('click', function() {
                this.classList.toggle('markedCell');
            });
        });})
});
    
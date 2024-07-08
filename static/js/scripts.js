document.addEventListener('DOMContentLoaded', function() {
    // Your JavaScript code here
});

fetch('/api/get_game')
    .then(response => response.json())
    .then(data => {
        let crossword = document.getElementById("crossword");
        for (let i = 0; i < data.words.length; i++) {
            let wordDiv = document.createElement("div");
            wordDiv.classList.add("wordDiv");
            crossword.appendChild(wordDiv);
            for (let j = 0; j < data.words[i]; j++) {
                let letterCell = document.createElement("div");
                letterCell.classList.add("cell");
                letterCell.textContent = "a";
                letterCell.style.width = "20px";
                letterCell.style.height = "20px";
                wordDiv.appendChild(letterCell);
            }
        }

        let syllables = document.getElementById("syllables");
        for (let i = 0; i < data.syllables.length; i++) {
            let syllableCell = document.createElement("div");
            syllableCell.classList.add("cell");
            syllableCell.textContent = `${data.syllables[i]}`;
            syllableCell.style.width = "30px";
            syllableCell.style.height = "30px";
            syllables.appendChild(syllableCell);
        }
    });
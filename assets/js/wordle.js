const gameField = document.querySelector('.WorldeGame');
const body = document.querySelector('body');
var currentRow = 1;
var currentModus = 5;
let currentCol = 1;
var isListening = false;
let inputFields;
let gameStatusOnline = true;

window.onload = function() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < currentModus; j++) {
            document.querySelector('.gridBody').innerHTML += `<input type="text" readonly name="input" datatagrow="${i+1}" datatagcol="${j+1}" maxlength="1">`;
        }
    }
    inputFields = document.querySelectorAll('.gridBody>input[type="text"]');
};

body.addEventListener('click', function() {
    stopGameListening();
});

gameField.addEventListener('click', function(event) {
    event.stopPropagation();
    if (!isListening) startGameListening();
});

function stopGameListening() {
    isListening = false;
    console.log('Game Listening stopped');
    window.removeEventListener('keydown', gameLoop);
}

function startGameListening() {
    if (!isListening) {
        window.addEventListener('keydown', gameLoop);
        isListening = true;
    }
}

function endGame(wordToGuess, state) {

    const bord = document.querySelector(".WorldeGame");
    bord.querySelector('.gridBody').classList.add("fadeOut");

    setTimeout(function() {

        bord.querySelector('.gridBody').style.height = '1px';

    }, 1000)


    let divContainer = createHTMLforEndingPage(wordToGuess, state);


    setTimeout(function() {

        bord.appendChild(divContainer);

    }, 1000);

    console.log(wordToGuess);

}

function createHTMLforEndingPage(wordToGuess, state) {

    let div = document.createElement("div");
    div.classList.add('resultBody');
    let html;
    if (state) {

        let nameOfWord = (currentRow > 1) ? "pogingen" : "poging";

        html =
            `
                <header>
                    <p class="specialWorlde">
                        ${wordToGuess}
                    </p>
                    Je hebt het woord geraden
                </header>
                <p>In ${currentRow} ${nameOfWord}</p>
                `;


        div.innerHTML = html;


    } else {
        html =
            `
                <header>
                Het woord was
                    <p class="specialWorlde">
                        ${wordToGuess}
                    </p>
                </header>
                <p>Je hebt woord niet geraden</p>
                `;
        div.innerHTML = html;
    }
    return div;
}

function gameLoop(event) {
    if (currentCol < 1) currentCol = 1;
    if (currentCol - 1 == currentModus) gameStatusOnline = false;

    if (/^[a-zA-Z]$/.test(event.key) && currentCol <= currentModus && gameStatusOnline) {
        console.log('Game is processing');
        const targetInput = document.querySelector(`input[datatagrow="${currentRow}"][datatagcol="${currentCol}"]`);

        if (targetInput) {
            targetInput.value = event.key;
            currentCol++;

            if (currentCol > currentModus) {
                gameStatusOnline = false;
                let word = "";
                inputFields.forEach(inputField => {
                    if (inputField.getAttribute('datatagrow') == currentRow) {
                        word += inputField.value;
                    }
                });

                const url = "https://vqnderklein.nl/api/games/word";
                const apiToken = 'Zeb2k8AhyWN3VduP9rcEH4jDtCvGfnYxzU6gmspX5RMaFq7KJSpx96XMVZsf8GB3YPmhaDHRAkvtgUFyWjJTuEznwdb27rS4eLQK';
                const data = { word, row: currentRow, modus: currentModus };

                const xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Authorization", "Bearer " + apiToken);
                xhr.setRequestHeader("Content-Type", "application/json");

                xhr.onreadystatechange = function() {
                    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        if (response.status !== "OK" || response.information == " ") return;

                        if (response.guessedCorrectly === "Y") {
                            inputFields.forEach(inputField => {
                                if (inputField.getAttribute('datatagrow') == currentRow) {
                                    inputField.style.backgroundColor = 'green';

                                }
                            });

                            stopGameListening();
                            gameStatusOnline = false;
                            endGame(word, true);
                        } else if (response.guessedCorrectly == "O") {
                            stopGameListening();
                            endGame(response.correctWord, false);
                            gameStatusOnline = false;
                        } else {
                            let count = 0;
                            inputFields.forEach(inputField => {
                                if (inputField.getAttribute('datatagrow') == currentRow) {
                                    const [informationTag, , informationValue] = response.information[count].split(" ");
                                    if (inputField.value === informationTag) {
                                        inputField.style.backgroundColor = informationValue;
                                    }
                                    count++;
                                }
                            });
                        }

                        if (gameStatusOnline)
                            newGameIteration();

                    } else if (xhr.status !== 200) {
                        console.error('Request Error:', xhr.statusText, `Status Code: ${xhr.status}`);
                    }
                };

                xhr.onerror = function() {
                    console.error("Network Error: Unable to reach the server.");
                };

                xhr.send(JSON.stringify(data));
                gameStatusOnline = true;
            }
        }
    } else if (event.key === "Backspace" && currentCol > 0) {
        currentCol--;
        const targetInput = document.querySelector(`input[datatagrow="${currentRow}"][datatagcol="${currentCol}"]`);
        if (targetInput) targetInput.value = "";
    }
}

function newGameIteration() {
    console.log('New Game Iteration started');
    currentCol = 1;
    gameStatusOnline = true;
    currentRow++;
}

console.log('Game Listening');
const gameField = document.querySelector('.WorldeGame');
const body = document.querySelector('body');
var currentRow = 1;
var currentModus = 5;
let currentCol = 1;
var isListening = false;
let inputFields;
let gameStatusOnline = true;
const id = Math.floor(Math.random() * 100000000)


window.onload = function() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < currentModus; j++) {
            document.querySelector('.gridBody').innerHTML += `<input type="text" readonly name="input" datatagrow="${i+1}" datatagcol="${j+1}" maxlength="1">`;
        }
    }
    inputFields = document.querySelectorAll('.gridBody>input[type="text"]');

    function generateQwertyKeyboard() {
        let backSpaceIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24">
	<path fill="currentColor" d="m11.054 15.308l2.6-2.6l2.6 2.6l.707-.708l-2.6-2.6l2.6-2.6l-.707-.708l-2.6 2.6l-2.6-2.6l-.708.708l2.6 2.6l-2.6 2.6zM9.173 19q-.383 0-.727-.166t-.565-.461L3 12l4.88-6.373q.223-.294.566-.46T9.173 5h10.212q.666 0 1.14.475T21 6.615v10.77q0 .666-.475 1.14t-1.14.475zM4.25 12l4.423 5.77q.096.114.221.172t.279.058h10.212q.269 0 .442-.173t.173-.443V6.616q0-.27-.173-.443T19.385 6H9.173q-.154 0-.279.058t-.221.173zm10.02 0" />
</svg>`;

        const rows = [
            ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
            ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
            ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'bc']
        ];

        const keyboardContainer = document.createElement('div');
        keyboardContainer.classList.add('keyboard-container');
        rows.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('keyboard-row');

            row.forEach(key => {
                const keyButton = document.createElement('button');
                keyButton.classList.add('keyboard-key');



                if (key === 'bc')
                    keyButton.innerHTML = backSpaceIcon;
                else
                    keyButton.textContent = key;

                keyButton.setAttribute('data-key', key);

                keyButton.addEventListener('click', () => {
                    if (key == 'bc' && currentCol > 0) {
                        currentCol--;
                        const targetInput = document.querySelector(`input[datatagrow="${currentRow}"][datatagcol="${currentCol}"]`);
                        if (targetInput) targetInput.value = "";
                        if (currentCol <= 0) currentCol = 1;
                        return;
                    } else {
                        const targetInput = document.querySelector(`input[datatagrow="${currentRow}"][datatagcol="${currentCol}"]`);

                        if (targetInput) {
                            targetInput.value = key;
                            currentCol++;

                            if (currentCol >= 6) {
                                verifyWord()
                            }
                        }
                    }
                });
                rowDiv.appendChild(keyButton);
            });
            keyboardContainer.appendChild(rowDiv);
        });
        return keyboardContainer;
    }

    document.querySelector(".keyboard").appendChild(generateQwertyKeyboard());
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

        bord.querySelector(".endingSection").appendChild(divContainer);
        bord.querySelector('.keyboard').style.display = 'none';

    }, 1000);
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
    else gameStatusOnline = true;

    if (/^[a-zA-Z]$/.test(event.key) && currentCol <= currentModus && gameStatusOnline) {
        const targetInput = document.querySelector(`input[datatagrow="${currentRow}"][datatagcol="${currentCol}"]`);

        if (targetInput) {
            targetInput.value = event.key;
            currentCol++;

            if (currentCol > currentModus) {
                verifyWord();
            }
        }
    } else if (event.key === "Backspace" && currentCol > 0) {
        currentCol--;
        const targetInput = document.querySelector(`input[datatagrow="${currentRow}"][datatagcol="${currentCol}"]`);
        if (targetInput) targetInput.value = "";
    }
}

function verifyWord() {

    gameStatusOnline = false;
    let word = "";
    inputFields.forEach(inputField => {
        if (inputField.getAttribute('datatagrow') == currentRow) {
            word += inputField.value;
        }
    });

    const url = "https://vqnderklein.nl/api/games/word";
    const apiToken = 'Zeb2k8AhyWN3VduP9rcEH4jDtCvGfnYxzU6gmspX5RMaFq7KJSpx96XMVZsf8GB3YPmhaDHRAkvtgUFyWjJTuEznwdb27rS4eLQK';
    const data = { word, row: currentRow, modus: currentModus, id: id };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Authorization", "Bearer " + apiToken);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            if (response.status == "FAIL") gameStatusOnline = true;

            if (response.status !== "OK" || response.information == " ") return;

            if (response.guessedCorrectly === "Y") {
                inputFields.forEach(inputField => {
                    if (inputField.getAttribute('datatagrow') == currentRow) {
                        inputField.style.backgroundColor = '#a5d6a7';

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

                colorKeyBoard(response)
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

function colorKeyBoard(response) {

    const allKeys = document.querySelectorAll('.keyboard-key');

    allKeys.forEach(key => {

        for (let i = 0; i < response.information.length; i++) {
            const partOfMessage = response.information[i].split(' ');
            const tag = partOfMessage[0];
            const color = partOfMessage[2];

            if (tag == key.textContent) {
                key.style.backgroundColor = color;
            }
        }
    });
}

function newGameIteration() {
    currentCol = 1;
    gameStatusOnline = true;
    currentRow++;
}
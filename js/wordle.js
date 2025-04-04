const wordsWithHints5 = [
    { word: "MAPLE", hint: "A tree often found in forests during adventures." },
    { word: "CAVES", hint: "Dark places where adventurers search for treasures." },
    { word: "TRAIL", hint: "A path trekked by hikers and explorers." },
    { word: "RAFTS", hint: "Used to navigate rivers during expeditions." },
    { word: "BEACH", hint: "A sandy area near the ocean often visited for relaxation." },
    { word: "CLOUD", hint: "Something you often see while climbing high mountains." },
    { word: "CLIFF", hint: "A steep rock face often admired by adventurers." },
    { word: "TRACK", hint: "The path left behind by travelers or animals." },
    { word: "FLARE", hint: "Used to signal for help during expeditions." }
];

const wordsWithHints6 = [
    { word: "TORCHS", hint: "A light source used in dark and mysterious caves." },
    { word: "JUNGLE", hint: "A dense tropical forest full of mysteries and dangers." },
    { word: "CAMPER", hint: "Someone who sets up a tent during their adventure." },
    { word: "TENTED", hint: "Covered with a tent during an outdoor expedition." },
    { word: "ESCAPE", hint: "What adventurers often seek from danger or traps." },
    { word: "LAGOON", hint: "A calm, shallow body of water often found in tropical areas." },
    { word: "GROTTO", hint: "A small picturesque cave or cavern often explored." },
    { word: "MOUNTS", hint: "Large elevated areas often climbed by adventurers." },
    { word: "BEACON", hint: "A guiding light used for navigation or signaling." }
];

let wordsWithHints = wordsWithHints5; // По умолчанию 5-буквенные слова
let secretWordData = null;
let attempts = 6; // Количество попыток
let currentAttempt = 0;

// Создаём игровое поле
const wordleContainer = document.getElementById('wordle-game');
const questionContainer = document.createElement("p");
questionContainer.classList.add("word-question");

const input = document.createElement("input");
input.type = "text";
input.maxLength = 5;
input.placeholder = "Enter the word";
input.classList.add("word-input");

const button = document.createElement("button");
button.textContent = "Check";
button.classList.add("word-button");

const message = document.createElement("p");
message.classList.add("word-message");

const resultContainer = document.createElement("div");
resultContainer.classList.add("word-results");

// Радио-кнопки для выбора длины слова
const radioContainer = document.createElement("div");
radioContainer.innerHTML = `
    <label><input type="radio" name="word-length" value="5" checked> 5 letters</label>
    <label><input type="radio" name="word-length" value="6"> 6 letters</label>
`;

wordleContainer.appendChild(radioContainer);
wordleContainer.appendChild(questionContainer);
wordleContainer.appendChild(input);
wordleContainer.appendChild(button);
wordleContainer.appendChild(resultContainer);
wordleContainer.appendChild(message);

// Функция выбора случайного слова и вопроса
function chooseSecretWord() {
    secretWordData = wordsWithHints[Math.floor(Math.random() * wordsWithHints.length)];
    input.maxLength = secretWordData.word.length;
    input.placeholder = `Enter the word`;

    // Показываем вопрос-подсказку
    questionContainer.textContent = `Question: ${secretWordData.hint}`;
}

// Обработчик смены длины слова
document.querySelectorAll('input[name="word-length"]').forEach(radio => {
    radio.addEventListener("change", (event) => {
        wordsWithHints = event.target.value === "5" ? wordsWithHints5 : wordsWithHints6;
        chooseSecretWord();
        resultContainer.innerHTML = ""; // Очищаем результаты
        message.textContent = "";
        input.disabled = false;
        button.disabled = false;
        currentAttempt = 0;
    });
});

// Обработчик кнопки проверки слова
button.addEventListener("click", () => {
    let guess = input.value.toUpperCase();

    if (guess.length !== secretWordData.word.length) {
        message.textContent = `The word must be ${secretWordData.word.length} letters!`;
        return;
    }


    message.textContent = "";
    let row = document.createElement("div");
    row.classList.add("word-row");

    for (let i = 0; i < secretWordData.word.length; i++) {
        let letterBox = document.createElement("span");
        letterBox.textContent = guess[i];
        letterBox.classList.add("word-letter");

        if (guess[i] === secretWordData.word[i]) {
            letterBox.classList.add("correct"); // Правильная буква и место
        } else if (secretWordData.word.includes(guess[i])) {
            letterBox.classList.add("partial"); // Есть буква, но в другом месте
        } else {
            letterBox.classList.add("wrong"); // Такой буквы нет
        }

        row.appendChild(letterBox);
    }

    resultContainer.appendChild(row);
    currentAttempt++;

    if (guess === secretWordData.word) {
        message.textContent = "🎉 Faithfully! You guessed the word!";
        button.disabled = true;
        input.disabled = true;
    } else if (currentAttempt >= attempts) {
        message.textContent = `😞 Game over! Hidden word: ${secretWordData.word}`;
        button.disabled = true;
        input.disabled = true;
    }

    input.value = "";
});

// Выбираем слово при загрузке
chooseSecretWord();

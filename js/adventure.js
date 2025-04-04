const gameContainer = document.getElementById('four-pics-one-word-game');

// Список уровней
const wordsWithImages = [
    {
        word: "CAVE",
        images: ["cave1.jpg", "cave2.jpg", "cave3.jpg", "cave4.jpg"],
        hint: "A mysterious place often explored during adventures."
    },
    {
        word: "MAP",
        images: ["map1.jpg", "map2.jpg", "map3.jpg", "map4.jpg"],
        hint: "A tool used by adventurers to find their way."
    },
    {
        word: "TENT",
        images: ["tent1.jpg", "tent2.jpg", "tent3.jpg", "tent4.jpg"],
        hint: "A shelter adventurers use during their expeditions."
    },
    {
        word: "CAMP",
        images: ["camp1.jpg", "camp2.jpg", "camp3.jpg", "camp4.jpg"],
        hint: "A place where adventurers rest during their journey."
    },
    {
        word: "ROCKS",
        images: ["rocks1.jpg", "rocks2.jpg", "rocks3.jpg", "rocks4.jpg"],
        hint: "Often climbed or explored during mountain adventures."
    }
];
let currentLevel = 0;

function startNewGame() {
    if (currentLevel >= wordsWithImages.length) {
        gameContainer.innerHTML = "<h2>🎉 Congratulations! You've completed all the levels! 🎉</h2>";
        return;
    }

    const currentGame = wordsWithImages[currentLevel];

    // Очищаем игровую зону
    gameContainer.innerHTML = "";

    // Показываем 4 картинки
    const imagesContainer = document.createElement("div");
    imagesContainer.classList.add("images-container");

    currentGame.images.forEach(img => {
        let imgElement = document.createElement("img");
        imgElement.src = `img/${img}`;
        imgElement.classList.add("game-image");
        imagesContainer.appendChild(imgElement);
    });

    // Добавляем поле ввода
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter the word";
    input.classList.add("word-input");

    // Добавляем кнопку проверки
    const button = document.createElement("button");
    button.textContent = "Check";
    button.classList.add("word-button");

    // Сообщение о результате
    const message = document.createElement("p");
    message.classList.add("word-message");

    // Подсказка
    const hint = document.createElement("p");
    hint.classList.add("word-hint");
    hint.textContent = `hint: ${currentGame.hint}`;

    // Кнопка "Следующий уровень"
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next level";
    nextButton.classList.add("word-button");
    nextButton.style.display = "none"; // Скрываем по умолчанию
    nextButton.addEventListener("click", () => {
        currentLevel++;
        startNewGame();
    });

    // Добавляем все в контейнер
    gameContainer.appendChild(imagesContainer);
    gameContainer.appendChild(hint);
    gameContainer.appendChild(input);
    gameContainer.appendChild(button);
    gameContainer.appendChild(message);
    gameContainer.appendChild(nextButton);

    // Обработчик кнопки "Проверить"
    button.addEventListener("click", () => {
        let guess = input.value.toUpperCase();

        if (guess === currentGame.word) {
            message.textContent = "🎉 Faithfully! You guessed the word!";
            button.disabled = true;
            input.disabled = true;
            nextButton.style.display = "block"; // Показываем кнопку перехода
        } else {
            message.textContent = "❌ Wrong, try again!";
        }
    });
}

// Запуск игры при загрузке
startNewGame();

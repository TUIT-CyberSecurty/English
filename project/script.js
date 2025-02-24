const situations = [
    { text: "You accidentally call your teacher ‘Mom’ in front of the whole class", emotion: "embarrassed" },
    { text: "You walk into a glass door because you thought it was open", emotion: "confused" },
    { text: "Your sibling eats the last piece of cake you were saving", emotion: "cross" },
    { text: "You find money in your old jacket pocket", emotion: "delighted" },
    { text: "You spend hours baking a cake, but it turns out terrible", emotion: "disappointed" },
    { text: "You finally win a game after trying for weeks", emotion: "proud" },
    { text: "You spill your drink all over yourself at a fancy restaurant", emotion: "ashamed" },
    { text: "You receive an unexpected gift from a friend", emotion: "surprised" },
    { text: "You forget your lines during a school play", emotion: "nervous" },
    { text: "Your best friend moves to another city", emotion: "sad" },
    { text: "You get an A+ on a difficult test", emotion: "happy" },
    { text: "You get stuck in traffic and are late for an important meeting", emotion: "frustrated" },
    { text: "You see a huge spider in your room", emotion: "scared" },
    { text: "You help someone in need and they thank you warmly", emotion: "grateful" },
    { text: "You complete a challenging puzzle", emotion: "satisfied" }
];

let usedEmotions = new Set();
let roundTimer;
let roundActive = false;

function generateSituation() {
    let availableSituations = situations.filter(s => !usedEmotions.has(s.emotion));
    if (availableSituations.length === 0) {
        usedEmotions.clear();
        availableSituations = situations;
    }

    const randomIndex = Math.floor(Math.random() * availableSituations.length);
    const newSituation = availableSituations[randomIndex];
    usedEmotions.add(newSituation.emotion);
    
    const newSituationElement = document.createElement("p");
    newSituationElement.textContent = newSituation.text;
    document.getElementById("situations-list").appendChild(newSituationElement);
}

function toggleRound() {
    const startButton = document.getElementById("round-button");
    const stopButton = document.getElementById("stop-button");
    if (roundActive) {
        endRound();
    } else {
        startQuiz();
        startButton.style.display = "none";
        stopButton.style.display = "inline-block";
    }
    roundActive = !roundActive;
}

function startQuiz() {
    document.getElementById("situations-list").innerHTML = "";
    document.getElementById("emotions-list").innerHTML = "";
    usedEmotions.clear();
    
    generateSituation();
    roundTimer = setInterval(generateSituation, 10000);
    
    setTimeout(endRound, 60000);
}

function endRound() {
    clearInterval(roundTimer);
    const resultsContainer = document.getElementById("emotions-list");
    resultsContainer.innerHTML = "<h2>Final Emotions:</h2>";
    usedEmotions.forEach(emotion => {
        const emotionElement = document.createElement("p");
        emotionElement.textContent = emotion;
        resultsContainer.appendChild(emotionElement);
    });
    document.getElementById("round-button").style.display = "inline-block";
    document.getElementById("stop-button").style.display = "none";
    roundActive = false;
}

function toggleMenu() {
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
    menuIcon.classList.toggle('active');
}

function showSection(sectionId) {
    document.querySelectorAll("section").forEach(section => {
        section.classList.add("hidden");
    });

    document.getElementById(sectionId).classList.remove("hidden");

    // Закрываем меню после выбора
    toggleMenu();
}

const emotions = [
    "Happy", "Sad", "Angry", "Excited", "Nervous", "Surprised", "Embarrassed", "Proud", "Disappointed", "Confused",
    "Anxious", "Content", "Curious", "Frustrated", "Grateful", "Hopeful", "Lonely", "Relaxed", "Scared", "Shy",
    "Bored", "Enthusiastic", "Jealous", "Loving", "Overwhelmed", "Peaceful", "Relieved", "Stressed", "Tired", "Worried"
  ];
let emotionGameTimer;
let timer;
function startEmotionGame() {
    let timeLeft = 60;
    const display = document.getElementById("emotion-display");
    
    // Выбираем случайную эмоцию
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    display.textContent = randomEmotion;

    // Очищаем эмоцию через 1 минуту
    clearTimeout(emotionGameTimer);
    emotionGameTimer = setTimeout(() => {
        display.textContent = "Игра окончена!";
    }, 60000);

    const timerDisplay = document.getElementById('timer-display');
    timerDisplay.textContent = timeLeft;
    clearInterval(timer);

    timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
        timerDisplay.textContent = "Time's up!";
        }
        }, 1000);
    }

function openForm() {
        document.getElementById("studentForm").style.display = "block";
}

function closeForm() {
    document.getElementById("studentForm").style.display = "none";
}

function submitStudentInfo() {
    const name = document.getElementById("studentName").value.trim();
    const surname = document.getElementById("studentSurname").value.trim();
    const score = document.getElementById("studentScore").value.trim();

    if (name && surname && score) {
        addStudentToRanking(name, surname, score);
        closeForm();
        document.getElementById("studentName").value = "";
        document.getElementById("studentSurname").value = "";
        document.getElementById("studentScore").value = "";
    } else {
        alert("Please fill in all fields.");
    }
}


function addStudentToRanking(firstName, lastName, score) {
    const rankingList = document.getElementById("ranking-list");
    const ratingSection = document.getElementById("rating");
    const newEntry = document.createElement("li");
    newEntry.textContent = `${firstName} ${lastName} - ${score}`;

    if (rankingList.children.length === 1 && rankingList.children[0].textContent === "No scores yet.") {
        rankingList.innerHTML = "";
    }

    rankingList.appendChild(newEntry);
    ratingSection.classList.remove("hidden");
    ratingSection.style.display = "block";
}

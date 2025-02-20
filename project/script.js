const situations = [
    { text: "You accidentally call your teacher ‘Mom’ in front of the whole class, and you feel embarrassed.", emotion: "embarrassed" },
    { text: "You walk into a glass door because you thought it was open, and you feel confused.", emotion: "confused" },
    { text: "Your sibling eats the last piece of cake you were saving, and you feel cross.", emotion: "cross" },
    { text: "You find money in your old jacket pocket, and you feel delighted.", emotion: "delighted" },
    { text: "You spend hours baking a cake, but it turns out terrible, and you feel disappointed.", emotion: "disappointed" },
    { text: "You finally win a game after trying for weeks, and you feel proud.", emotion: "proud" },
    { text: "You spill your drink all over yourself at a fancy restaurant, and you feel ashamed.", emotion: "ashamed" }
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
    document.getElementById("situations-list").innerHTML = "";
    document.getElementById("emotions-list").innerHTML = "";
    document.getElementById("round-button").style.display = "inline-block";
    document.getElementById("stop-button").style.display = "none";
    document.getElementById("stop-button").style.backgroundColor = "red"
    roundActive = false;
}
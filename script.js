function checkAnswers() {
    const correctAnswers = {
        q1: "go",
        q2: "reads",
        q3: "play",
        q4: "watch",
        q5: "rises",
        q6: "sing",
        q7: "loves",
        q8: "boils",
        q9: "bark",
        q10: "goes"
    };
    let score = 0;
    let totalQuestions = 10;
    for (let i = 1; i <= totalQuestions; i++) {
        let questionName = 'q' + i;
        console.log(questionName)
        let userAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
        if (userAnswer && userAnswer.value === correctAnswers[questionName]) {
            score++;
            console.log(score);
        }
    }
    console.log(score);

    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `You scored ${score} out of ${totalQuestions}!`;

    return false; 
}

function nextQuestion(currentQuestion) {
    document.getElementById('question-' + currentQuestion).style.display = 'none';
    var nextQuestion = currentQuestion + 1;
    if (document.getElementById('question-' + nextQuestion)) {
        document.getElementById('question-' + nextQuestion).style.display = 'block';
    }
}

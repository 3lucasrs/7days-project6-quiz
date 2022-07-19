let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

document.querySelector('.scoreArea button').addEventListener('click', () => {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
})

function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';
        document.querySelector('.question').innerHTML = q.question;

        let optionsHtml = '';
        for (const key in q.options) {
            optionsHtml += `<div data-op="${key}" class="option"><span>${(parseInt(key) + 1)}</span>${q.options[key]}</div>`;
        }

        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(element => {
            element.addEventListener('click', (e) => {
                let clickedOption = parseInt(e.target.getAttribute('data-op'));
                if (questions[currentQuestion].answer === clickedOption) {
                    correctAnswers++;
                }
                currentQuestion++;
                showQuestion();
            });
        });
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);
    let scoreText, color = '';

    if (points < 30) {
        scoreText = pp[0].text;
        color = pp[0].color;
    } else if (points >= 30 && points < 50) {
        scoreText = pp[1].text;
        color = pp[1].color;
    } else if (points >= 50 && points < 75) {
        scoreText = pp[2].text;
        color = pp[2].color;
    } else {
        scoreText = pp[3].text;
        color = pp[3].color;
    }

    document.querySelector('.scoreText1').innerHTML = scoreText.toUpperCase();
    document.querySelector('.scorePct').style.color = color;


    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%.`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;


    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = `100%`;
}
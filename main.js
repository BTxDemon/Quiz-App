const Questions = [
    {
        question: 'what is the full form of js.',
        answers: [
            {answer: 'Javascript', correct: true},
            {answer: 'JavaSequence', correct: false},
            {answer: 'JoinScript', correct: false},
            {answer: 'JoinedScript', correct: false}
        ]
    },
    {
        question: 'What is the Full form CSS',
        answers: [
            {answer: 'Cascading Style Sheet', correct: true},
            {answer: 'Casting Style Sheet', correct: false},
            {answer: 'Both A & B', correct: false},
            {answer: 'None of these', correct: false}
        ]
    },
    {
        question: 'What is the extension of Python Programming Language Files.',
        answers: [
            {answer: '.js', correct: false},
            {answer: '.p', correct: false},
            {answer: '.py', correct: true},
            {answer: '.pn', correct: false}
        ]
    },
    {
        question: 'which Language is Fastest In Processing Data Even Faster than C++.',
        answers: [
            {answer: 'Python', correct: false},
            {answer: 'C#', correct: false},
            {answer: 'Java', correct: false},
            {answer: 'Mojo', correct: true}
        ]
    }
]

let QuizEnded = document.querySelector('.Quiz-finished');
let QuestionTag = document.querySelector('.question-container .question');
let QuestionNOTag = document.querySelector('.question-container .question .q-no');

let AnswersTag = document.querySelector('.answer-box');
let AllAnswersBtn = document.querySelectorAll('.answer-box .answers');
let NextBtn = document.querySelector('.next-btn');
let ScoreTag = document.querySelector('.score-tag');
let QuestionRemainingTag = document.querySelector('.question-remaining');

let QuestionAsked = 1;

let QuestionIndex = 0;
let Score = 0;

const ShowQuestion = (Qindex) => {
    let SelectedQ = Questions[Qindex];
    QuestionTag.innerHTML = `
    <p class="question"><b class="q-no">${Qindex + 1}. </b>${SelectedQ.question}</p>`

    QuestionRemainingTag.innerHTML = `${QuestionAsked}/${(Questions.length)} <span style="color: #3eff48;">Questions</span>`

    const DisplayAns = () => {
        for (i = 0; i<4; i++) {
            ans = SelectedQ.answers[i]
            AllAnswersBtn[i].innerHTML = `<b>${i + 1}. </b>${ans.answer}`;
            AllAnswersBtn[i].classList.add(ans.correct);
        }
    }
    DisplayAns();
    QuestionAsked++;
}

ShowQuestion(QuestionIndex);

const ClickedAnswer = (Clickedbtn) => {
    if (Clickedbtn.classList.contains('true')) {
        Clickedbtn.classList.add('correct');
        Score = Score + 5;
        ScoreTag.innerHTML = `<b>Score : </b>${Score}`
    }
    else {
        Clickedbtn.classList.add('incorrect');
        AllAnswersBtn.forEach((i) => {
            if (i.classList.contains('true')) {
                i.classList.add('correct');
            }
        })
    }
    
}

AllAnswersBtn.forEach((i) => {
    i.addEventListener('click', () => {
        AllAnswersBtn.forEach((e) => {
            e.style.pointerEvents = 'none'

        })
        ClickedAnswer(i);
        setTimeout(() => {
            NextQuestion();
        }, 2000);
    })
})

const NextQuestion = () => {
    AllAnswersBtn.forEach((i) => {
        i.classList.remove('true', 'false')
        i.classList.remove('correct', 'incorrect');
        i.style.pointerEvents = "";
    })
    QuestionIndex++;
    if (QuestionIndex < Questions.length) {
        ShowQuestion(QuestionIndex);
    }
    
    else {
        QuizEnded.classList.add('active');
        Result();
    }

}

NextBtn.addEventListener('click', () => {
    NextQuestion();
});


let ProgressTag = document.querySelector('.progress-box .progress');
let Progresspercent = document.querySelector('.progress-box .progress .percent');
let ResultScore = document.querySelector('.score-box .score');
let RestartBtn = document.querySelector('.restart-quiz');

const Result = () => {
    let Progress = (Score / (Questions.length * 5)) * 100;
    ProgressTag.style.width = `${Progress}%`;
    Progresspercent.innerText = `${parseInt(Progress)} %`;
    ResultScore.innerHTML = `${Score}/${(Questions.length * 5)}`
}

RestartBtn.addEventListener('click', () => {
    QuestionAsked = 0;
    Score = 0;
    QuestionIndex = 0;
    ShowQuestion(QuestionIndex);
    QuizEnded.classList.remove('active');
    ScoreTag.innerHTML = `<b>Score : </b>${Score}`;
    QuestionRemainingTag.innerHTML = `${QuestionAsked}/${(Questions.length)} <span style="color: #3eff48;">Questions</span>`

})
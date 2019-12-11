const url = "https://opentdb.com/api.php?amount=50&category=10&type=multiple"
const question = document.querySelector('.question')
const optionA = document.querySelector('#optionA')
const optionB = document.querySelector('#optionB')
const optionC = document.querySelector('#optionC')
const optionD = document.querySelector('#optionD')
const next = document.querySelector('.next')

let clickCount = (0)
let shuffledQs = []
// next.addEventListener('click',newQuestion)
next.addEventListener('click',getQuestionList)
// have the fetch be it's own function => store data into a variable

function getQuestionList () {
    fetch(url)
    .then(res => res.json())
    .then(data => questionSetUp(data))
    .catch(err => console.log('this is err', err))
}
//how I made a shuffle function
//https://teamtreehouse.com/community/return-mathrandom05
//https://news.ycombinator.com/item?id=2728914

function shuffle(firstResults) {
    for (let i =0; i<firstResults.length; i=i+1) {
      let j = Math.floor(Math.random() * (i + 1));
      [firstResults[i], firstResults[j]] = [firstResults[j], firstResults[i]];

    }
}

function questionSetUp(data){
    let firstResults = data.results
    shuffle(firstResults)
    shuffledQs = firstResults
    
    newQuestion(shuffledQs)
    createAnswers(shuffledQs)
}
// randomize that array
    // call the createQuestion() with the first question
    // call createAnswers( with the first question/answer obj?)


function newQuestion (shuffledQs){

    let currentQuestion = shuffledQs[3].question
    //find out if something needs a quote
    if (currentQuestion.search("&quot;") == -1 && currentQuestion.search("&#039;") == -1){
       question.innerText = currentQuestion
       
    }
    else if (currentQuestion.search("&quot;") == -1){
        let questionQuote = currentQuestion.replace(/&#039;/gi,'\"') // source this thing you found
        question.innerText = questionQuote
    }
    else if(currentQuestion.search("&#039;") == -1){
        let quotedQuestion = currentQuestion.replace(/&quot;/gi,'\'')
        question.innerText = quotedQuestion
    }
}

// find correct answer
// make array for all answers
// assign all the answers to different buttons
function createAnswers(shuffledQs){
    let rightAnswer = shuffledQs[3].correct_answer
    let answers = shuffledQs[3].incorrect_answers
    answers.push(rightAnswer)
    shuffleAnswers(answers)
    searchAns(answers)
}
// shuffle answers
function shuffleAnswers(answers) {
    for (let i =0; i<answers.length; i=i+1) {
      let j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];

    }
}

function searchAns (answers){
    console.log(answers)
}

// makeAnswers()
    // parse the data
    // transplate answer/shuffle logic here
    // append to DOMmkdir

// checkAnswers()
    // if clicked answer is wrong
        // dont add a point => maybe add modal
        // make red border
        // or make invisible p tag that appears with write answer past into it
        // document.createElement(p).innerHTML(`data.rightanswer`)
    // if clicked answer is right
        // add a point => say congrats!

// timerFunc()
    // setTimeout(() => {
        // forloop subtracts 1 from 30
        // .innerHTML = i
    // }, 1000)

// easter egg?
    // bonus points!


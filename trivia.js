const url = "https://opentdb.com/api.php?amount=50&category=10&type=multiple"
const question = document.querySelector('.question')
const optionA = document.querySelector('#optionA')
const optionB = document.querySelector('#optionB')
const optionC = document.querySelector('#optionC')
const optionD = document.querySelector('#optionD')
const start = document.querySelector('button.start')
const next = document.querySelector('.next')
const finish = document.querySelector('.finish')

let questionArr = []
let clickCount = 0
let shuffledQs = []
// next.addEventListener('click',newQuestion)
start.addEventListener('click', getQuestionList)
next.addEventListener('click',nextQuestion)
// have the fetch be it's own function => store data into a variable


// randomize that array
    // call the createQuestion() with the first question
    // call createAnswers( with the first question/answer obj?)
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
    for (let i=0; i<10; i=i+1){
        questionArr.push(shuffledQs[i])
    }
    next.style.visibility = 'visible'
    nextQuestion(questionArr)
    return questionArr
}

 function nextQuestion(questionArr){
    newQuestion(shuffledQs)
    createAnswers(shuffledQs)
    clickCount=clickCount+1
    console.log(clickCount)

    if (clickCount === 10){
        next.innerText = 'finish'
        next.style.visibility = 'hidden'
        finish.style.visibility = 'visible'
    }
    else if (clickCount == 11){
        console.log('done')
    }

    return clickCount
 }

function newQuestion (questionArr){

    let currentQuestion = questionArr[clickCount].question
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
let rightAnswer = ('')
// find correct answer
// make array for all answers
// assign all the answers to different buttons
function createAnswers(questionArr){
    rightAnswer = questionArr[clickCount].correct_answer
    let answers = questionArr[clickCount].incorrect_answers
    answers.push(rightAnswer)
    workableAnswerChoices(answers)
    rightAnswer = answers[3]
    shuffleAnswers(answers)
    assignAnswers(answers)
}

function workableAnswerChoices (answers){
    for(i=0; i<answers.length; i=i+1){
        if (answers[i].search("&quot;") == -1 && answers[i].search("&#039;") == -1 && answers[i].search("&amp;") == -1
        && answers[i].search("&eacute") == -1 && answers[i].search("&euml;") == -1){
            answers[i] = answers[i]    
         }
         //rplace apostrophe
         else if (answers[i].search("&quot;") == -1 && answers[i].search("&amp;") == -1
         && answers[i].search("&eacute") == -1 && answers[i].search("&euml;") == -1){
            answers[i] = answers[i].replace(/&#039;/gi,'\'') // source this thing you found
         }
         //replace quotes
         else if(answers[i].search("&#039;") == -1 && answers[i].search("&amp;") == -1
         && answers[i].search("&eacute") == -1 && answers[i].search("&euml;") == -1){
            answers[i] = answers[i].replace(/&quot;/gi,'\"')
         }
         //replace fancy and (ampersand)
         else if (answers[i].search("&quot;") == -1 && answers[i].search("&#039;") == -1
         && answers[i].search("&eacute") == -1 && answers[i].search("&euml;") == -1){
            answers[i] = answers[i].replace(/&amp;/gi,'&') // source this thing you found
         }
         //replace ë
         else if(answers[i].search("&#039;") == -1 && answers[i].search("&amp;") == -1
         && answers[i].search("&eacute") == -1 && answers[i].search("&quot;") == -1){
            answers[i] = answers[i].replace(/&euml;/gi,'ë')
         }
         //replace accent e
         else if (answers[i].search("&quot;") == -1 && answers[i].search("&amp;") == -1
         && answers[i].search("&#039;") == -1 && answers[i].search("&euml;") == -1){
            answers[i] = answers[i].replace(/&eacute;/gi,'\'') // source this thing you found
         }
    
    }
}
// shuffle answers
function shuffleAnswers(answers) {
    for (let i =0; i<answers.length; i=i+1) {
      let j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];

    }
}
//assign answer to answer option
function assignAnswers(answers) {
    optionA.innerText = answers[0]
    optionB.innerText = answers[1]
    optionC.innerText = answers[2]
    optionD.innerText = answers[3]
}

optionA.addEventListener('click', pickedAnswer)
optionB.addEventListener('click', pickedAnswer)
optionC.addEventListener('click', pickedAnswer)
optionD.addEventListener('click', pickedAnswer)

// checkAnswers()
    // if clicked answer is wrong
        // dont add a point
        // innerText header tag
    // if clicked answer is right
        // add a point => say congrats!

function pickedAnswer (e){
    
    if (this.innerText == rightAnswer){
    question.innerText = 'CORRECT'
    }
    else {
        question.innerText = `Sorry the correct answer was ${rightAnswer} `
    }

}



// timerFunc()
    // setTimeout(() => {
        // forloop subtracts 1 from 30
        // .innerHTML = i
    // }, 1000)

// let seconds = document.querySelector(".timer").textContent;
// let countdown = setInterval(function() {
//     seconds--;
//     document.querySelector(".timer").textContent = seconds;
//     if (seconds <= 0) clearInterval(countdown);
// }, 1000);

const timer = document.querySelector(".timer")
 
setTimeout(() => {
        for (i=15; i>0; i=i-1){
        timer.innerHTML = i}
    }, 1000)
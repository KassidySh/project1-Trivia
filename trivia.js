const url = "https://opentdb.com/api.php?amount=50&category=10&type=multiple"
const answerBox = document.querySelector('div.answerbox')
const question = document.querySelector('.question')
const optionA = document.querySelector('#optionA')
const optionB = document.querySelector('#optionB')
const optionC = document.querySelector('#optionC')
const optionD = document.querySelector('#optionD')
const start = document.querySelector('button.start')
const next = document.querySelector('.next')
const scoreBoard = document.querySelector('.score')
const allAnswers = document.querySelectorAll('.answerChoice')
const timer = document.querySelector('.timer')
const qCount = document.querySelector('#questionCount')
//modal late
const modal = document.querySelector('#tooLate');
const closeLateModal = document.querySelector('.close');
//game finished modal
const overModal = document.querySelector('#gameFinished')
const modalText = document.querySelector('#gameFinished p')
const replay = document.querySelector('.replay')
let rightAnswer = ('')
let score = 0
let questionArr = []
let clickCount = 0
let shuffledQs = []
closeLateModal.addEventListener('click',skipQuestion) 
replay.addEventListener('click', backHome)
scoreBoard.addEventListener('click', reset)
start.addEventListener('click', getQuestionList)
next.addEventListener('click',nextQuestion)

// fetch function
function getQuestionList () {
    fetch(url)
    .then(res => res.json())
    .then(data => questionSetUp(data))
    .catch(err => console.log('this is err', err))
}
//how I made a shuffle function
//https://teamtreehouse.com/community/return-mathrandom05
//https://news.ycombinator.com/item?id=2728914
function shuffle(results) {
    for (let i =0; i<results.length; i=i+1) {
      let j = Math.floor(Math.random() * (i + 1));
      [results[i], results[j]] = [results[j], results[i]];

    }
}
//setup board for first turn
//add buttons & shuffle question list
function questionSetUp(data){
    let results = data.results
    clickCount = 0
    shuffle(results)
    shuffledQs = results
    for (i =0; i<allAnswers.length; i=i+1){
        allAnswers[i].style.display = 'inline'
    }
    answerBox.style.display = 'grid'

    nextQuestion(questionArr)
    return questionArr

}
//setup question
 function nextQuestion(questionArr){
    optionA.addEventListener('click', pickedAnswer)
    optionB.addEventListener('click', pickedAnswer)
    optionC.addEventListener('click', pickedAnswer)
    optionD.addEventListener('click', pickedAnswer)
    next.style.visibility = 'hidden'
    timer.innerText = 20
    newQuestion(shuffledQs)
    createAnswers(shuffledQs)
    //intervalbreak function and time
    //set interval == infinite loop
    //intervalbreak breaks it
    timerBreak = setInterval(countDown, 1000)
    killTimeout = setTimeout(playTime, 20000)

    next.style.visibility = 'hidden'
    clickCount=clickCount+1
    qCount.innerText = `Question ${clickCount}`
    if (clickCount === 10){
        next.innerText = 'finish'
        next.style.visibility = 'hidden'
    }
    else if (clickCount == 11){
        modalText.innerText = `Congradulations! Your score was ${score} would you like to play again?`
        overModal.style.display = "block"
    }

    return clickCount
 }
//search through questions for confusing characters
function newQuestion (questionArr){

    let currentQuestion = questionArr[clickCount].question
    //find out if something needs a quote
    if (currentQuestion.search("&quot;") == -1 && currentQuestion.search("&#039;") == -1){
       question.innerText = currentQuestion
       
    }
    else if (currentQuestion.search("&quot;") == -1){
        let questionQuote = currentQuestion.replace(/&#039;/gi,'\'') // source this thing you found
        question.innerText = questionQuote
    }
    else if(currentQuestion.search("&#039;") == -1){
        let quotedQuestion = currentQuestion.replace(/&quot;/gi,'\"')
        question.innerText = quotedQuestion
    }
    else{
        let questionQuote = currentQuestion.replace(/&#039;/gi,'\'')
        let quotedQuestion = questionQuote.replace(/&quot;/gi,'\"')
        question.innerText = quotedQuestion
    }
}
// find correct answer
// make array for all answers
// assign all the answers to different buttons
function createAnswers(questionArr){
    rightAnswer = questionArr[clickCount].correct_answer
    let answers = questionArr[clickCount].incorrect_answers
    answers.push(rightAnswer)
    workableAnswerChoices(answers)
    rightAnswer = answers[3]
    results = answers
    shuffle(results)
    assignAnswers(results)
}
//search through answers and replace confusing code with readable words
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
//assign answer to answer option
function assignAnswers(answers) {
    optionA.innerText = answers[0]
    optionB.innerText = answers[1]
    optionC.innerText = answers[2]
    optionD.innerText = answers[3]
}
//Modal When the user clicks on next button, close the modal
function skipQuestion() {
  modal.style.display = "none"
  nextQuestion()
}
//review if answers right and assign points if it is
function pickedAnswer (e){

    optionA.removeEventListener('click', pickedAnswer)
    optionB.removeEventListener('click', pickedAnswer)
    optionC.removeEventListener('click', pickedAnswer)
    optionD.removeEventListener('click', pickedAnswer)
    if (this.innerText == rightAnswer && timer.innerText >= 10){
        question.innerText = 'CORRECT'
        score = score + 10
        scoreBoard.innerText = `Score = ${score}`
    }
    else if (this.innerText == rightAnswer){
        question.innerText = 'CORRECT'
        score = score + 5
        scoreBoard.innerText = `Score = ${score}`
    }
    else {
        question.innerText = `Sorry the correct answer was ${rightAnswer}`
        clearTimeout
    }
    next.style.visibility = 'visible'
    clearTimeout(killTimeout)
    questionAnswered()
}
//timer countdown
function countDown(){
    timer.innerText = timer.innerText - 1
}
//get out of countDown loop (setInterval)
function questionAnswered(){
    clearInterval(timerBreak)
}
//When you ran out of time end of setTimeout 
function playTime(){
    questionAnswered()
    modal.style.display = "block"
}
//reset score
function reset(){
    score = 0
    scoreBoard.innerText =`Score = ${score}`
}
function backHome(){
    overModal.style.display = 'none'
}
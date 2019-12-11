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
    workableRightAnswer(rightAnswer)
    let answers = shuffledQs[3].incorrect_answers
    workableAnswerChoices(answers)
    answers.push(rightAnswer)
    shuffleAnswers(answers)
    assignAnswers(answers)
}


// &eacute;

function workableRightAnswer (rightAnswer){
    if (rightAnswer.search("&quot;") == -1 && rightAnswer.search("&#039;") == -1 && rightAnswer.search("&amp;") == -1
    && rightAnswer.search("&eacute") == -1 && rightAnswer.search("&euml;") == -1){
        rightAnswer = rightAnswer    
     }
     //rplace apostrophe
     else if (rightAnswer.search("&quot;") == -1 && rightAnswer.search("&amp;") == -1
     && rightAnswer.search("&eacute") == -1 && rightAnswer.search("&euml;") == -1){
        rightAnswer = rightAnswer.replace(/&#039;/gi,'\'') // source this thing you found
     }
     //replace quotes
     else if(rightAnswer.search("&#039;") == -1 && rightAnswer.search("&amp;") == -1
     && rightAnswer.search("&eacute") == -1 && rightAnswer.search("&euml;") == -1){
        rightAnswer = rightAnswer.replace(/&quot;/gi,'\"')
     }
     //replace fancy and (ampersand)
     else if (rightAnswer.search("&quot;") == -1 && rightAnswer.search("&#039;") == -1
     && rightAnswer.search("&eacute") == -1 && rightAnswer.search("&euml;") == -1){
        rightAnswer = rightAnswer.replace(/&amp;/gi,'&') // source this thing you found
     }
     //replace ë
     else if(rightAnswer.search("&#039;") == -1 && rightAnswer.search("&amp;") == -1
     && rightAnswer.search("&eacute") == -1 && rightAnswer.search("&quot;") == -1){
        rightAnswer = rightAnswer.replace(/&euml;/gi,'ë')
     }
     //replace accent e
     else if (rightAnswer.search("&quot;") == -1 && rightAnswer.search("&amp;") == -1
     && rightAnswer.search("&#039;") == -1 && rightAnswer.search("&euml;") == -1){
        rightAnswer = rightAnswer.replace(/&eacute;/gi,'\'') // source this thing you found
     }

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

function pickedAnswer (e){
    console.log(optionA.innerText)
}


// function searchAns (answers){
//     console.log(answers)
// }

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


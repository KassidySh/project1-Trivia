const url = "https://opentdb.com/api.php?amount=50&category=10&type=multiple"
const question = document.querySelector('.question')
const optionA = document.querySelector('#optionA')
const optionB = document.querySelector('#optionB')
const optionC = document.querySelector('#optionC')
const optionD = document.querySelector('#optionD')
const next = document.querySelector('.next')
let clickCount = (0)

// have the fetch be it's own function => store data into a variable
    
function getQuestionList () {
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log('this is err', err))
}

next.addEventListener('click',getQuestionList)

console.log(getQuestionList())

// randomize that array
    // call the createQuestion() with the first question
    // call createAnswers( with the first question/answer obj?)


// function newQuestion (data){

//     let searchedQuest = data.results[clickCount].question
//     console.log(searchedQuest)
//     clickCount = clickCount+1
//     next.addEventListener('click',newQuestion)

//     //find out if something needs a quote
//     if (searchedQuest.search("&quot;") == -1 && searchedQuest.search("&#039;") == -1){
//        question.innerText = searchedQuest
       
//     }
//     else if (searchedQuest.search("&quot;") == -1){
//         let questionQuote = searchedQuest.replace(/&#039;/gi,'\"') // source this thing you found
//         question.innerText = questionQuote
//     }
//     else if(searchedQuest.search("&#039;") == -1){
//         let quotedQuestion = searchedQuest.replace(/&quot;/gi,'\'')
//         question.innerText = quotedQuestion
//     }
//     // 

// }

//find correct answer
//make array for all answers
//shuffle answers
// assign all the answers to different buttons

// // makeAnswers()
//     // parse the data
//     // transplate answer/shuffle logic here
//     // append to DOM

// // checkAnswers()
//     // if clicked answer is wrong
//         // dont add a point => maybe add modal
//         // make red border
//         // or make invisible p tag that appears with write answer past into it
//         // document.createElement(p).innerHTML(`data.rightanswer`)
//     // if clicked answer is right
//         // add a point => say congrats!

// // timerFunc()
//     // setTimeout(() => {
//         // forloop subtracts 1 from 30
//         // .innerHTML = i
//     // }, 1000)

// // easter egg?
//     // bonus points!


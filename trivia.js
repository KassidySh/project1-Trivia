const url = "https://opentdb.com/api.php?amount=50&category=10&type=multiple"
const question = document.querySelector('.question')
const optionA = document.querySelector('#optionA')
const optionB = document.querySelector('#optionB')
const optionC = document.querySelector('#optionC')
const optionD = document.querySelector('#optionD')
const next = document.querySelector('.next')
let clickCount = (0)

fetch(url)
.then(res => res.json())
.then(data => setUp(data))
.catch(err => console.log('this is err', err))

function setUp(data){
    clickCount = clickCount +1
    newQuestion(data)
    answers(data)
}

function newQuestion(data){
    for (i=0; i<clickCount; i=i+clickCount){
    let searchedQuest = data.results[i].question
    //find out if something needs a quote
    if (searchedQuest.search("&quot;") == -1 && searchedQuest.search("&#039;") == -1){
       question.innerText = searchedQuest
       
}
    else if (searchedQuest.search("&quot;") == -1){
        let questionQuote = searchedQuest.replace(/&#039;/gi,'\"')
        question.innerText = questionQuote
}
    else if(searchedQuest.search("&#039;") == -1){
        let quotedQuestion = searchedQuest.replace(/&quot;/gi,'\'')
        question.innerText = quotedQuestion
    }
}
}
//find correct answer
//make array for all answers
//shuffle answers
// assign all the answers to different buttons
function answers(data){
    for (i=0; i<clickCount; i=i+clickCount){
        //code for the right answer
    let answer = data.results[i].correct_answer
    let allAnswers = data.results[i].incorrect_answers
    console.log(allAnswers)
}}

next.addEventListener('click',setUp)

// function setUp1(e){
//     console.log('hi')
// }
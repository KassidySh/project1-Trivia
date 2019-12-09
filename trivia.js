const url = "https://opentdb.com/api.php?amount=50&category=10&type=multiple"
const question = document.querySelector('.question')
const optionA = document.querySelector('#optionA')
const optionB = document.querySelector('#optionB')
const optionC = document.querySelector('#optionC')
const optionD = document.querySelector('#optionD')


fetch(url)
.then(res => res.json())
.then(data => newQuestion(data))
.catch(err => console.log('this is err', err))

function newQuestion(e){
   let q = data
    console.log(q)
    // question.innerText
}

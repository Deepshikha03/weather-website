// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()     //to prevent the refresh of browser when the form is submitted
    const location = search.value
    messageOne.textContent = 'Loading Weather Data.....'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
            //console.log(data.error)
        }else{
            messageOne.textContent = 'Location: ' + data.location
           // console.log('Location: '+data.location)
            messageTwo.textContent = data.forecast
            //console.log(data.forecast)
        }
        })
    })
})
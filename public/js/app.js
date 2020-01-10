console.log('client side js is loaded');

// fetch('http://localhost:3000/weather?address=Miami').then((response) => {
    
//     response.json().then((data) => {
        
//         if (data.error) {
//             console.log(data.error);
//         } else {
//             console.log(data.forcast);
//             console.log(data.location);
//             console.log(data.address);
//         }

//     })
    
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    messageOne.textContent = 'Loading'
    e.preventDefault()

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    
        response.json().then((data) => {

            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.forcast 
                messageTwo.textContent = data.location
            }

        })
    
    })

})
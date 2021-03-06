



// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-one');
const messageTwo = document.getElementById('message-two');
// messageOne.innerText = 'Javascript';
messageTwo.innerText = '';

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    fetch(`/weather?address=${location}`)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageTwo.innerText = data.error;
                }
                else {
                    messageTwo.innerText = `Location :  ${data.location} 
                    Temprature : ${data.temprature} degree Celsius  
                    Humidity : ${data.humidity}
                    Min_temprature : ${data.Min_temprature}
                    Max_temprature : ${data.Max_temprature}
                    feels_like : ${data.feels_like}
                    pressure : ${data.pressure}`
                    
                }
            })
        })

})
console.log('Client side javascript file is loaded!');


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const firstMessage = document.querySelector('#first-message');
const secondMessage = document.querySelector('#second-message');


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    firstMessage.textContent = 'Loading...';
    secondMessage.textContent = ''; 
    const location = search.value;
    
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data)=>{
            if (data.error) {
                firstMessage.textContent = data.error;
            }
            else {
                firstMessage.textContent = data.location;
                secondMessage.textContent = data.forcast;
            }
        });
    });
});

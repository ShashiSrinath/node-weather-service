
function featchWeather(address , callback) {
    fetch('/weather?address='+address).then((response) => {
        response.json().then((data) => {
            callback(data);
        });

    });
}


const weatherForm = document.querySelector('form');
const searchBox = document.querySelector('input');
const paragraphOne = document.querySelector('#message-1');
const paragraphTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = searchBox.value ;
    paragraphOne.textContent = 'Loading...' ;
    paragraphTwo.textContent = '' ;
    const data = featchWeather(address ,(data) => {
        if (data.error) {
            paragraphOne.textContent = data.error;
        }
        else {
            paragraphOne.textContent = data.location.address ;
            paragraphTwo.textContent = data.forcast ;
        }
    });

});


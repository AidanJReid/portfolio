// Init weather object
const weather = new Weather('Dublin', 'Ireland');

// Init UI
const ui = new UI();

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

function getWeather(){
    weather.getWeather()
    .then(results => {
        ui.paint(results);
    })
}

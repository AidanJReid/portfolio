//Init storage
const storage = new Storage();

//Get stored location data from the local storage
const weatherLocation = storage.getLocationData();

//Initialize the weather class object
const weather = new Weather(weatherLocation.city);

//Initialize the ui
const ui = new UI();

//Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

//Change location event
document.getElementById('w-changeButton').addEventListener('click', (e) => {
  const city = document.getElementById('city').value;

  //Change location
  weather.changeLocation(city);

  //Set location in the local storage
  storage.setLocationData(city);

  //Get and display weather
  getWeather();

  //Close modal
  $('#locModal').modal('hide');
});

function getWeather() {
  weather.getWeather()
    .then(results => {
      ui.paint(results);
    })
    .catch(err => console.log(err))
}
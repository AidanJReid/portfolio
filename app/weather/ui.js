class UI {
  constructor(){
      this.location = document.getElementById('w-location');
      this.desc = document.getElementById('w-desc');
      this.string = document.getElementById('w-string');
      this.feels = document.getElementById('w-feels');
      this.icon = document.getElementById('w-icon');
      this.humidity = document.getElementById('w-humidity');
      this.detail = document.getElementById('w-detail');
  }

  paint(weather) {
      this.location.textContent = weather.name;
      this.desc.textContent = `${Math.round(weather.main.temp)}°C`;
      this.string.textContent = weather.weather[0].main;
      this.icon.setAttribute('src', `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`);
      this.humidity.textContent = `Relative Humidity: ${Math.round(weather.main.humidity)}%`;
      this.detail.textContent = weather.weather[0].description;
      this.feels.textContent = `Feels Like: ${Math.round(weather.main.feels_like)}°C`;
  }
}
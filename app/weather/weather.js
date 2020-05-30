class Weather {
  constructor(city){
      this.apiKey = '30b7b9cc0f40f4d5ef576b370b498e90';
      this.city = city;
  }

  // Fetch weather from API
  async getWeather() {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`);

      const responseData = await response.json();

      return responseData;

  }

  // Change weather location
  changeLocation(city) {
      this.city = city;
  }
}
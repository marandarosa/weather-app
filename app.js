function defaultTemperature(response) {
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = `${Math.round(response.data.main.temp)}°F`;
  let weather = document.querySelector(`#weather-description`);
  weather.innerHTML = `${response.data.weather[0].description}`;
  let humidity = document.querySelector(`#humidity`);
  humidity.innerHTML = `${response.data.main.humidity}`;
  let windSpeed = document.querySelector(`#wind-speed`);
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}`;
}
function defaultLocation() {
  let apiKey = "c589a18f7766266be7befa0ab3876d77";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Hartford&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(defaultTemperature);
}
function showTemperature(response) {
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = `${Math.round(response.data.main.temp)}°F`;
  let weather = document.querySelector(`#weather-description`);
  weather.innerHTML = `${response.data.weather[0].description}`;
  let humidity = document.querySelector(`#humidity`);
  humidity.innerHTML = `${response.data.main.humidity}`;
  let windSpeed = document.querySelector(`#wind-speed`);
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}`;
}
function currentLocationTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c589a18f7766266be7befa0ab3876d77";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(currentLocationTemp);
}
function cityTemperature(response) {
  console.log(response);
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = `${Math.round(response.data.main.temp)}°F`;
  let weather = document.querySelector(`#weather-description`);
  weather.innerHTML = `${response.data.weather[0].description}`;
  let humidity = document.querySelector(`#humidity`);
  humidity.innerHTML = `${response.data.main.humidity}`;
  let windSpeed = document.querySelector(`#wind-speed`);
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}`;
}
function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city.value}`;
  let apiKey = "c589a18f7766266be7befa0ab3876d77";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(cityTemperature);
}
function currentDay() {
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let today = document.querySelector("#current-day");
  today.innerHTML = `${days[date.getDay()].charAt(0).toUpperCase()}${days[
    date.getDay()
  ].slice(1)} `;
  let time = document.querySelector("#current-time");
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  time.innerHTML = `${hours}:${minutes}`;
}

currentDay();
getCurrentLocation();
defaultLocation();

let clickSearchButton = document.querySelector("#city-search");
clickSearchButton.addEventListener("click", getCity);

let button = document.querySelector(".current-location");
button.addEventListener("click", getCurrentLocation);

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function showTemperature(response) {
  let city = document.querySelector("h1");
  let tempElement = document.querySelector("#current-temp");
  let weather = document.querySelector(`#weather-description`);
  let humidity = document.querySelector(`#humidity`);
  let windSpeed = document.querySelector(`#wind-speed`);
  let dateElement = document.querySelector(`#current-date`);
  city.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(response.data.temperature.current);
  weather.innerHTML = response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
}
function defaultLocation() {
  let city = "Hartford";
  let apiKey = "o8f33adb6e5ada04681tfeaf708b3b4b";
  let apiUrl = ` https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
function currentLocationTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "o8f33adb6e5ada04681tfeaf708b3b4b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(currentLocationTemp);
}
function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city.value}`;
  let apiKey = "o8f33adb6e5ada04681tfeaf708b3b4b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city.value}&key=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

getCurrentLocation();
defaultLocation();

let clickSearchButton = document.querySelector("#city-search");
clickSearchButton.addEventListener("click", getCity);

let button = document.querySelector(".current-location");
button.addEventListener("click", getCurrentLocation);

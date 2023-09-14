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
function formatDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day}`;
}
function showTemperature(response) {
  let city = document.querySelector("h1");
  let tempElement = document.querySelector("#current-temp");
  let weatherElement = document.querySelector(`#weather-description`);
  let humidity = document.querySelector(`#humidity`);
  let windSpeed = document.querySelector(`#wind-speed`);
  let dateElement = document.querySelector(`#current-date`);
  let icon = document.querySelector(`#weather-icon`);

  fahrenheitTemperature = response.data.temperature.current;
  city.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(response.data.temperature.current);
  weatherElement.innerHTML = response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  icon.setAttribute("src", response.data.condition.icon_url);
  icon.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
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
  if (city.value === "") {
    alert("Oops, input required. Please enter city again.");
  } else {
    let h1 = document.querySelector("h1");
    h1.innerHTML = `${city.value}`;
    let apiKey = "o8f33adb6e5ada04681tfeaf708b3b4b";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city.value}&key=${apiKey}&units=imperial`;
    axios.get(`${apiUrl}`).then(showTemperature);
  }
}
function displayForecast(response) {
  let forecast = document.querySelector("#weather-forecast");
  let forecastArray = response.data.daily;
  let forecastHTML = `<div class="row">`;
  forecastArray.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2 forecast-individual" id="weather-forecast">
  <div class="forecast-day">${formatDays(forecastDay.time)}</div>
  <img
  src="${forecastDay.condition.icon_url}"
  style="width: 42px; height: 42px"
  class="forecast-temps"
  />
  <span class="temp-max">${Math.round(forecastDay.temperature.maximum)}°</span>
  <span class="temp-min">${Math.round(forecastDay.temperature.minimum)}°</span>
  </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "o8f33adb6e5ada04681tfeaf708b3b4b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(displayForecast);
}

let city = "Hartford";
let apiKey = "o8f33adb6e5ada04681tfeaf708b3b4b";
let apiUrl = ` https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
axios.get(`${apiUrl}`).then(showTemperature);

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", getCity);

let clickSearchButton = document.querySelector("#city-search");
clickSearchButton.addEventListener("click", getCity);

let locationButton = document.querySelector(".current-location");
locationButton.addEventListener("click", getCurrentLocation);

let fahrenheitTemperature = null;

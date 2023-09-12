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
  let icon = document.querySelector(`#weather-icon`);

  fahrenheitTemperature = response.data.temperature.current;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  city.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(response.data.temperature.current);
  weather.innerHTML = response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  icon.setAttribute("src", response.data.condition.icon_url);
  icon.setAttribute("alt", response.data.condition.description);

  displayForecast();
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
function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusValue = Math.round(((fahrenheitTemperature - 32) * 5) / 9);
  temperatureElement.innerHTML = celsiusValue;
}
function showFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayForecast() {
  let forecast = document.querySelector("#weather-forecast");
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2 forecast-individual" id="weather-forecast">
  <div class="forecast-day">${day}</div>
  <img
  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png"
  style="width: 42px; height: 42px"
  class="forecast-temps"
  />
  <span class="temp-max">79°</span>
  <span class="temp-min">65°</span>
  </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
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

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let fahrenheitTemperature = null;

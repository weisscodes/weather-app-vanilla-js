function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let conditionElement = document.querySelector("#weather-condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#condition-icon-wrapper");
  let windSpeedKmPerHour = response.data.wind.speed;
  let windSpeedMetersPerSecond =
    convertKmPerHourtoMetersPerSecond(windSpeedKmPerHour);
  let formattedWindSpeed = formatWindSpeed(windSpeedMetersPerSecond);

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${formattedWindSpeed}m/s`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `            <img
              class="condition-icon"
              src="${response.data.condition.icon_url}"
              alt=""
            />`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

//show m/s instead of km/h
function convertKmPerHourtoMetersPerSecond(kmPerHour) {
  return (kmPerHour * 1000) / 3600;
}

//truncate a decimal number to keep only the first decimal place without rounding
function formatWindSpeed(value) {
  return Math.floor(value * 10) / 10;
}

function searchCity(city) {
  let apiKey = "6b0307dtdf705784fc4o6eae892a7e2b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="forecast-col">
    <div class="forecast-day">${day}</div>
    <img src="images/clear-sky-night.png" alt="" class="forecast-icon" />
    <div class="forecast-temperatures">
      <span class="forecast-temperature-min"> 12 </span>
      <span class="forecast-temperature-max"> 16 </span>
    </div>
  </div>
`;
  });
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Regensburg");
displayForecast();

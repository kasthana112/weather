// DOM elements
const cityInputEl = document.querySelector("#city");
const searchBtnEl = document.querySelector("button[type='submit']");
const cityNameEl = document.querySelector("#city-name");
const currentDateEl = document.querySelector("#current-date");
const weatherIconEl = document.querySelector("#weather-icon");
const temperatureEl = document.querySelector("#temperature");
const humidityEl = document.querySelector("#humidity");
const windSpeedEl = document.querySelector("#wind-speed");
const forecastEl = document.querySelector("#forecast");
const historyListEl = document.querySelector("#history-list");

// API key and base URL for OpenWeatherMap API
const API_KEY = "YOUR_API_KEY_HERE";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

// Event listener for search button
searchBtnEl.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInputEl.value.trim();

  if (city) {
    // Fetch current weather data for the searched city
    fetch(`${BASE_URL}weather?q=${city}&units=imperial&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        // Update current weather data in the DOM
        cityNameEl.textContent = data.name;
        currentDateEl.textContent = new Date().toLocaleDateString();
        weatherIconEl.setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        );
        temperatureEl.textContent = data.main.temp;
        humidityEl.textContent = data.main.humidity;
        windSpeedEl.textContent = data.wind.speed;

        // Fetch forecast data for the searched city
        return fetch(
          `${BASE_URL}forecast?q=${city}&units=imperial&appid=${API_KEY}`
        );
      })
      .then((response) => response.json())
      .then((data) => {
        // Create an array of forecast data for the next 5 days
        const forecastData = data.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );

        // Clear any existing forecast data in the DOM
        forecastEl.innerHTML = "";

        // Loop through the forecast data and add it to the DOM
        forecastData.forEach((item) => {
          const forecastItemEl = document.createElement("div");
          forecastItemEl.classList.add("forecast-item");

          const dateEl = document.createElement("p");
          dateEl.textContent = new Date(item.dt_txt).toLocaleDateString();

          const iconEl = document.createElement("img");
          iconEl.setAttribute(
            "src",
            `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`
          );

          const tempEl = document.createElement("p");
          tempEl.textContent = item.main.temp;

          const windEl = document.createElement("p");
          windEl.textContent = item.wind.speed;

          const humidityEl = document.createElement("p");
          humidityEl.textContent = item.main.humidity;

          forecastItemEl.appendChild(dateEl);
          forecastItemEl.appendChild(iconEl);
          forecastItemEl.appendChild(tempEl);
          forecastItemEl.appendChild(windEl);
          forecastItemEl.appendChild(humidityEl);

          forecastEl.appendChild(forecastItemEl);
        });

        // Add the searched city to the search history
        const historyItemEl = document.createElement("li");
        historyItemEl.textContent = city;
        historyListEl.appendChild(historyItemEl);
      })
      .catch((error) => console.log(error));
  }
});

// Event listener for search history items
historyListEl.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const city =
)
}}
// Define variables for DOM elements
const searchFormEl = document.querySelector('#search-form');
const searchInputEl = document.querySelector('#search-input');
const searchHistoryEl = document.querySelector('#search-history');
const currentWeatherEl = document.querySelector('#current-weather');
const forecastEl = document.querySelector('#forecast');

// Define variables for API
const apiKey = 'your_api_key';
const apiUrl = 'https://api.openweathermap.org/data/2.5/437d0304148a809ac2e7ff4ea2168163';

// Define function to get current weather data
async function getCurrentWeather(cityName) {
  // Construct URL for API call
  const url = `${apiUrl}weather?q=${cityName}&units=metric&appid=${437d0304148a809ac2e7ff4ea2168163}`;
  try {
    // Make API call and get response
    const response = await fetch(url);
    // If response is successful, parse response data and return it
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    // If response is not successful, throw an error
    throw new Error(response.statusText);
  } catch (error) {
    console.log(error);
    alert('Failed to get current weather data');
  }
}

// Define function to get 5-day forecast data
async function getForecast(cityName) {
  // Construct URL for API call
  const url = `${apiUrl}forecast?q=${cityName}&units=metric&appid=${437d0304148a809ac2e7ff4ea2168163}`;
  try {
    // Make API call and get response
    const response = await fetch(url);
    // If response is successful, parse response data and return it
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    // If response is not successful, throw an error
    throw new Error(response.statusText);
  } catch (error) {
    console.log(error);
    alert('Failed to get 5-day forecast data');
  }
}

// Define function to display current weather data
function displayCurrentWeather(data) {
  // Get necessary data from response data
  const cityName = data.name;
  const date = new Date(data.dt * 1000);
  const weatherIcon = data.weather[0].icon;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  // Update current weather element with data
  currentWeatherEl.innerHTML = `
    <h2>${cityName} (${date.toLocaleDateString()}) <img class="weather-icon" src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${data.weather[0].description}" /></h2>
    <div class="weather-info">
      <p>Temperature: ${temperature} &deg;C</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind Speed: ${windSpeed} m/s</p>
    </div>
  `;
}

// Define function to display 5-day forecast data
function displayForecast(data) {
  // Get necessary data from response data
  const forecastData = data.list;
  // Clear current forecast element
  forecastEl.innerHTML = '';
  // Loop through each forecast data and create forecast card
  for (let i = 0; i < forecastData.length; i += 8) {
    // Get necessary data from forecast data
    const date = new Date(forecastData[i].dt * 1000);
    const weatherIcon = forecastData[i].weather[0].icon;
    const temperature = forecastData[i].main.temp;
    const humidity = forecastData[i].main.humidity;
    const windSpeed = forecastData[i

    ]}}
// app.js
const cron = require('node-cron');
const config = require('./config.json');
const { fetchWeather } = require('./weatherService');
const { checkThresholds } = require('./alertService');

// Function to fetch weather for all cities
async function fetchWeatherForAllCities() {
  for (const city of config.cities) {
    const weatherData = await fetchWeather(city);
    // Check if thresholds are breached to trigger alerts
    if (weatherData) {
      checkThresholds(weatherData);
    }
  }
}

// Schedule the task to run every 5 minutes
cron.schedule(config.interval, () => {
  console.log('Fetching weather data...');
  fetchWeatherForAllCities();
});

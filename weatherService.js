// // weatherService.js
// const axios = require('axios');
// const config = require('./config.json');
// const { insertWeatherData } = require('./database');

// // Function to fetch weather data for a city
// async function fetchWeather(city) {
//   const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.apiKey}&units=${config.unit}`;
//   try {
//     const response = await axios.get(url);
//     const data = response.data;
//     const { temp, feels_like } = data.main;
//     const { main } = data.weather[0];
//     const { dt } = data;

//     // Store weather data in the database
//     insertWeatherData(city, temp, feels_like, main, dt);

//     return { city, temp, feels_like, main, dt };
//   } catch (error) {
//     console.error(`Error fetching weather data for ${city}:`, error);
//   }
// }

// module.exports = { fetchWeather };

const axios = require('axios');
const db = require('./db'); // Import the database module

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

// Fetch weather data for a city
async function fetchWeather(city) {
  const apiKey = '9372c84370f2a36af0001e0236631450'; // Your OpenWeatherMap API key
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    console.log(`Weather data for ${city}:`, data);  // Log API response

    const { temp, feels_like } = data.main;
    const { main } = data.weather[0];
    const { dt } = data;

    // Insert data into the database
    await insertWeatherData(city, temp, feels_like, main, dt);

    return { city, temp, feels_like, main, dt };
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error);
  }
}

// Insert weather data into the database
async function insertWeatherData(city, temp, feels_like, main, dt) {
  const sql = `INSERT INTO weather (city, temp, feels_like, main, dt) VALUES (?, ?, ?, ?, ?)`;
  try {
    await db.run(sql, [city, temp, feels_like, main, dt]);
    console.log(`Inserted weather data for ${city}`);
  } catch (err) {
    console.error('Error inserting weather data:', err);
  }
}

// Fetch weather for all cities
async function fetchWeatherForAllCities() {
  for (let city of cities) {
    await fetchWeather(city);
  }
}

// Retrieve weather data from the database
async function getWeatherData() {
  const sql = `SELECT city, temp, feels_like, main, dt FROM weather ORDER BY dt DESC LIMIT 6`;
  try {
    const rows = await db.all(sql);
    console.log('Retrieved weather data from the database:', rows); // Log the retrieved data
    return rows;
  } catch (err) {
    console.error('Error fetching weather data from the database:', err);
    return [];
  }
}

// Export the necessary functions
module.exports = {
  fetchWeatherForAllCities,
  getWeatherData
};

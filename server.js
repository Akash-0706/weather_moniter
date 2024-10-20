const express = require('express');
const path = require('path');
const { fetchWeatherForAllCities } = require('./weatherService'); // Keep this import for weather fetching
const { getWeatherData, getDailySummaries } = require('./database'); // Import from database.js
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));  
app.set('view engine', 'ejs');  // Set up EJS as the template engine

// Route for the homepage
app.get('/', async (req, res) => {
  try {
    await fetchWeatherForAllCities();  // Fetch weather data for all cities
    const weatherData = await getWeatherData();  // Get current weather data from DB
    const dailySummaries = await getDailySummaries();  // Get daily summaries from DB

    console.log('Weather Data:', weatherData);  // Log current weather data
    console.log('Daily Summaries:', dailySummaries);  // Log daily summaries

    res.render('index', { weatherData, dailySummaries });  // Pass both to the view
  } catch (error) {
    console.error('Error fetching data for the homepage:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// summaryService.js
const { insertDailySummary } = require('./database');

// Simulate a function to calculate daily aggregates
function calculateDailySummary(weatherData) {
  const totalTemp = weatherData.reduce((sum, data) => sum + data.temp, 0);
  const maxTemp = Math.max(...weatherData.map((data) => data.temp));
  const minTemp = Math.min(...weatherData.map((data) => data.temp));
  const avgTemp = totalTemp / weatherData.length;

  const conditionCount = {};
  weatherData.forEach((data) => {
    conditionCount[data.main] = (conditionCount[data.main] || 0) + 1;
  });

  const dominantCondition = Object.keys(conditionCount).reduce((a, b) =>
    conditionCount[a] > conditionCount[b] ? a : b
  );

  const city = weatherData[0].city;
  const date = new Date().toLocaleDateString();

  // Store the daily summary
  insertDailySummary(city, avgTemp, maxTemp, minTemp, dominantCondition, date);
}

module.exports = { calculateDailySummary };

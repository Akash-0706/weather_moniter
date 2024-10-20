const sqlite3 = require('sqlite3').verbose();

// Initialize database
const db = new sqlite3.Database('./weather.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Create tables for storing weather data and daily summaries
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS weather (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      city TEXT,
      temp REAL,
      feels_like REAL,
      main TEXT,
      dt INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS daily_summary (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      city TEXT,
      avg_temp REAL,
      max_temp REAL,
      min_temp REAL,
      dominant_condition TEXT,
      date TEXT
    )
  `);
});

// Function to insert weather data
function insertWeatherData(city, temp, feels_like, main, dt) {
  db.run(
    `INSERT INTO weather (city, temp, feels_like, main, dt) VALUES (?, ?, ?, ?, ?)`,
    [city, temp, feels_like, main, dt]
  );
}

// Function to calculate daily summaries and insert/update them
async function calculateAndInsertDailySummaries() {
  const weatherData = await getWeatherData(); // Fetch current weather data

  const summaryData = {};

  // Aggregate data by city and date
  weatherData.forEach((data) => {
    const date = new Date(data.dt * 1000).toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
    const city = data.city;

    if (!summaryData[city]) {
      summaryData[city] = {
        totalTemp: 0,
        count: 0,
        maxTemp: -Infinity,
        minTemp: Infinity,
        dominantCondition: data.main,
        date: date
      };
    }

    // Update summary data
    summaryData[city].totalTemp += data.temp;
    summaryData[city].count += 1;
    summaryData[city].maxTemp = Math.max(summaryData[city].maxTemp, data.temp);
    summaryData[city].minTemp = Math.min(summaryData[city].minTemp, data.temp);
  });

  // Calculate averages and insert into the database
  for (const city in summaryData) {
    const { totalTemp, count, maxTemp, minTemp, dominantCondition, date } = summaryData[city];
    const avgTemp = totalTemp / count; // Calculate the average temperature

    // Check if there's already a daily summary for the city on the same date
    const existingSummary = await getDailySummaryByCityAndDate(city, date);
    if (existingSummary) {
      // If exists, update it
      await updateDailySummary(city, avgTemp, maxTemp, minTemp, dominantCondition, date);
    } else {
      // If not, insert a new record
      await insertDailySummary(city, avgTemp, maxTemp, minTemp, dominantCondition, date);
    }
  }
}

// Function to insert daily summary data
function insertDailySummary(city, avg_temp, max_temp, min_temp, dominant_condition, date) {
  db.run(
    `INSERT INTO daily_summary (city, avg_temp, max_temp, min_temp, dominant_condition, date) VALUES (?, ?, ?, ?, ?, ?)`,
    [city, avg_temp, max_temp, min_temp, dominant_condition, date],
    function (err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Inserted daily summary for ${city} on ${date}`);
    }
  );
}

// Function to update daily summary data (in case the same city and date exist)
function updateDailySummary(city, avg_temp, max_temp, min_temp, dominant_condition, date) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE daily_summary SET avg_temp = ?, max_temp = ?, min_temp = ?, dominant_condition = ? WHERE city = ? AND date = ?`,
      [avg_temp, max_temp, min_temp, dominant_condition, city, date],
      function (err) {
        if (err) {
          return reject(err.message);
        }
        console.log(`Updated daily summary for ${city} on ${date}`);
        resolve();
      }
    );
  });
}

// Function to check if a daily summary already exists
function getDailySummaryByCityAndDate(city, date) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM daily_summary WHERE city = ? AND date = ?`,
      [city, date],
      (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row); // Returns undefined if no record found
      }
    );
  });
}

// Function to get all current weather data from the database
function getWeatherData() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM weather ORDER BY dt DESC LIMIT 10', (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

// Function to get daily summaries from the database
function getDailySummaries() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM daily_summary ORDER BY date DESC LIMIT 7', (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

// Close the database connection
function closeDatabase() {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
  });
}

module.exports = {
  insertWeatherData,
  insertDailySummary,
  getWeatherData,
  getDailySummaries,
  calculateAndInsertDailySummaries,
  closeDatabase
};

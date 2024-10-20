Real-Time Data Processing System for Weather Monitoring with Rollups and Aggregates
Objective
Develop a real-time data processing system to monitor weather conditions and provide summarized insights using rollups and aggregates. The system retrieves weather data from the OpenWeatherMap API for various metros in India, processes the data, and provides daily summaries and alerts based on user-defined thresholds.

Data Source
The weather data is fetched from the OpenWeatherMap API. The following weather parameters are tracked:

Main: Main weather condition (e.g., Rain, Snow, Clear)
Temp: Current temperature (in Centigrade)
Feels_like: Perceived temperature (in Centigrade)
dt: Time of data update (Unix timestamp)
Features
Real-Time Weather Data Retrieval:

Fetches weather data at configurable intervals (e.g., every 5 minutes) for metros in India:
Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad
Converts temperature from Kelvin to Celsius or Fahrenheit, based on user preference.
Daily Weather Summary:

Aggregates daily data to calculate:
Average Temperature
Maximum Temperature
Minimum Temperature
Dominant Weather Condition (based on frequency or severity)
Stores daily summaries in a database for future analysis.
Alerting System:

Supports user-configurable thresholds for temperature or specific weather conditions.
Triggers alerts when thresholds are breached, displayed on the console or sent via email (if implemented).
Visualization:

Provides charts to display weather trends, daily summaries, and triggered alerts.
Installation
Prerequisites
Node.js (v12+)
NPM (Node Package Manager)
OpenWeatherMap API Key (Sign up here)
Steps
Clone the repository:

bash
Copy code
git clone https://github.com/your-repository/weather-monitor.git
cd weather-monitor
Install dependencies:

bash
Copy code
npm install
Configure the API Key:

Open config.json and add your OpenWeatherMap API key:
json
Copy code
{
  "apiKey": "YOUR_API_KEY",
  "interval": 300000
}
interval: Time (in milliseconds) between consecutive API calls (default: 5 minutes).
Start the application:

bash
Copy code
npm start
Usage
Real-Time Weather Monitoring:

The system retrieves weather data at the configured interval and displays updates in the console.
Daily Summaries:

Weather data is rolled up daily, with summaries stored in the database for historical reference.
Configurable Alerting:

Modify config.json to set thresholds:
json
Copy code
{
  "thresholds": {
    "temperature": 35,
    "condition": "Rain"
  }
}
Alerts are triggered when thresholds are violated.
Database
The project uses a SQLite database (weather.db) to store weather data and daily summaries. You can query it to analyze historical data.

Test Cases
System Setup:

Ensure successful connection to the OpenWeatherMap API with a valid API key.
Data Retrieval:

Simulate API calls and validate that the system fetches weather data correctly.
Temperature Conversion:

Test conversion of temperatures from Kelvin to Celsius or Fahrenheit, based on user preference.
Daily Weather Summary:

Test daily summaries for accuracy (average, max, min temperatures, dominant weather condition).
Alerting System:

Simulate weather data exceeding defined thresholds to test the alerting mechanism.
Bonus Features
Additional parameters like humidity and wind speed can be integrated into the rollups/aggregates.
Support for weather forecast retrieval based on predictions.

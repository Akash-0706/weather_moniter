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

Continuously retrieves weather data from the OpenWeatherMap API at a configurable interval (e.g., every 5 minutes) for the following Indian metros:
Delhi
Mumbai
Chennai
Bangalore
Kolkata
Hyderabad
Converts temperature from Kelvin to Celsius (user preference for Fahrenheit can also be configured).
Daily Weather Summary:

Aggregates daily weather data, calculating:
Average Temperature
Maximum Temperature
Minimum Temperature
Dominant Weather Condition (based on frequency and severity)
Stores daily summaries in a persistent database for future analysis.
Alerting System:

Users can set thresholds for specific conditions such as:
Temperature exceeding a set value (e.g., >35°C for two consecutive updates).
Specific weather conditions like heavy rain or storms.
Alerts are triggered when conditions breach user-defined thresholds, with options to:
Display alerts on the console.
Send email notifications (if implemented).
Visualization:

Provides visual summaries of daily weather data, historical trends, and triggered alerts (e.g., using charts).
Installation
Prerequisites:
Node.js (v12+)
NPM (Node Package Manager)
OpenWeatherMap API Key (Sign up here)
Steps:
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
The interval is the time (in milliseconds) between consecutive API calls (default: 5 minutes).
Start the application:

bash
Copy code
npm start
Usage
Real-Time Weather Monitoring: The system will start retrieving data at the configured interval and display real-time updates in the console.

Daily Summaries: Weather data is aggregated daily, with summaries stored in the database for historical analysis.

Alert Configuration:

Users can set thresholds for weather conditions in the configuration file (config.json), such as:
json
Copy code
{
  "thresholds": {
    "temperature": 35,
    "condition": "Rain"
  }
}
If conditions are breached, alerts will be triggered and displayed on the console.
Database
The system stores weather data and daily summaries in a SQLite database (weather.db). You can query this database to view historical data and trends.

API Endpoints
(If applicable, list any relevant endpoints for interacting with the system programmatically.)

Test Cases
System Setup:

Ensure the system connects to the OpenWeatherMap API using a valid API key.
Data Retrieval:

Simulate API calls at configurable intervals.
Verify correct retrieval and parsing of weather data.
Temperature Conversion:

Ensure accurate conversion of temperature values from Kelvin to Celsius or Fahrenheit (based on user preference).
Daily Weather Summary:

Test daily summaries for multiple days and verify the accuracy of:
Average, maximum, minimum temperatures.
Dominant weather condition.
Alerting Thresholds:

Test alerting system by simulating conditions that breach defined thresholds.
Bonus Features
Support for additional weather parameters (e.g., humidity, wind speed).
Weather forecasts based on predicted conditions.

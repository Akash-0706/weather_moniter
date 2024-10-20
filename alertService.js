// alertService.js
const nodemailer = require('nodemailer');
const config = require('./config.json');

// Create a mail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

// Function to send an alert email
function sendAlert(city, message) {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: config.alertEmail,
    subject: `Weather Alert for ${city}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Error sending alert:', error);
    }
    console.log(`Alert sent: ${info.response}`);
  });
}

// Function to check if weather data breaches the threshold
function checkThresholds(data) {
  if (data.temp > config.alertThreshold) {
    sendAlert(data.city, `Temperature exceeded ${config.alertThreshold}°C in ${data.city}. Current temperature: ${data.temp}°C.`);
  }
}

module.exports = { checkThresholds };

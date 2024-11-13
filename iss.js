const needle = require('needle');


const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';

  needle.get(url, (err, response) => {
    if (err) {
      callback(`Error fetching IP: ${err.message}`);
      return;
    }

    if (response.statusCode === 200) {

      callback(null, response.body.ip);
    } else {

      callback(`Failed to fetch IP. Status code: ${response.statusCode}`);
    }
  });
};


const fetchCoordsByIP = function(ip, callback) {
  const url = `https://ipwho.is/${ip}`;

  needle.get(url, (err, response) => {
    if (err) {
      callback(`Error fetching coordinates: ${err.message}`);
      return;
    }

    if (response.statusCode === 200) {

      const { latitude, longitude } = response.body;

      if (response.body.success) {
        callback(null, { latitude, longitude });
      } else {
        callback(` Failed to fetch coordinates ${ip}. Error: ${response.body.message}`);
      }
    } else {
      callback(`Failed to fetch coordinates. Status code: ${response.statusCode}`);
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };
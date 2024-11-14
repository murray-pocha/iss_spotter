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

// fetch flyover times
const fetchISSFlyOverTimes = function(coords, callback) {
  const { latitude, longitude } = coords;
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  //request to the ISS API
  needle.get(url, (err, response) => {
    if (err) {
      callback(`Error fetching ISS flyover times: ${err.message}`);
      return;
    }

    if (response.statusCode === 200) {
      const flyoverTimes = response.body.response;

      // check API response contains flyover times
      if (flyoverTimes && flyoverTimes.length > 0) {
        callback(null, flyoverTimes);
      } else {
        callback('There are no flyovers found for the given location.');
      }
    } else {
      callback(`Failed to fetch ISS flyover times, status code: ${response.statusCode}`);
    }
  });

};


const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      callback(error);
      return;
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error);
        return;
      }

      fetchISSFlyOverTimes(coords, (error, flyoverTimes) => {
        if (error) {
          callback(error);
          return;
        }

        callback(null, flyoverTimes);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
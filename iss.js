const needle = require('needle');


const fetchMyIp = function(callback) {
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

module.exports = { fetchMyIp };
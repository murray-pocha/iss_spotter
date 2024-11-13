const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ip);


  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log("It didnt work, error");
      return;
    }

    console.log('Coordinates for IP:', coords);
    console.log(`Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`);
  });
});
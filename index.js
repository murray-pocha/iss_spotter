

const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetch IP first
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ip);

  // fetch coordinates for the IP address
  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log("It didnt work.", error);
      return;
    }

    console.log('Coordinates for IP:', coords);
    console.log(`Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`);


    fetchISSFlyOverTimes(coords, (error, flyoverTimes) => {
      if (error) {
        console.log("It didn't work", error);
        return;
      }
      // printing the flyover times
      console.log('ISS Flyover Times:');
      flyoverTimes.forEach((time, index) => {
        const date = new Date(time.risetime * 1000); //converting timestamp to date
        console.log(`${index + 1}. ${date.toUTCString()} (Duration: ${time.duration} seconds)`);
      });

    });
  });
});
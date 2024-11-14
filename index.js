
const { nextISSTimesForMyLocation } = require('./iss');


nextISSTimesForMyLocation((error, flyoverTimes) => {
  if (error) {
    console.log("It didn't work.", error);
    return;
  }

  console.log('Here are the next flyover times for your location:');
  flyoverTimes.forEach((time, index) => {
    const date = new Date(time.risetime * 1000);
    console.log(`${index + 1}. ${date.toUTCString()} (Duration: ${time.duration} seconds)`);
  });
});

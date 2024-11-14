const { nextISSTimesForMyLocation } = require("./iss_promised");

const printPassTimes = function(passTimes) {
  passTimes.forEach((passTime, index) => {
    const date = new Date(passTime.risetime * 1000);
    console.log(`${index + 1}. ${date.toUTCString()} (Duration: ${passTime.duration} seconds)`);
  });
};




nextISSTimesForMyLocation()
  .then((passTimes) => {
    console.log("ISS Flyover Times:");
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("Error present:", error);
  });

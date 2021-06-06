const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ed116bfff305a19879c0181b71ae7afb&query=${latitude},${longitude}`;

  request(
    {
      url,
      json: true,
    },
    (error, response) => {
      if (response) {
        const data = response.body;
        if (data.error) {
          callback("Unable to fetch location", undefined);
        } else {
          const {
            current: { temperature, feelslike, cloudcover },
          } = data;

          callback(undefined, { temperature, feelslike, cloudcover });
        }
      } else if (error) {
        callback("Unable to connect to weatherstack API", undefined);
      }
    }
  );
};

module.exports = forecast;

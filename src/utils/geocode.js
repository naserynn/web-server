const request = require("postman-request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoibm5hc2VyeSIsImEiOiJja3AxNGh5YmowbWI3Mm9udnVuY2xveWZ5In0.vk3YT60CRCrvK-ASuRdOYw&limit=1`;

  request(
    {
      url,
      json: true,
    },
    (error, response) => {
      if (error) {
        callback("Unable to connect to location services", undefined);
      } else if (response) {
        const data = response.body;
        if (data.error) {
          callback("Unable to find location. Please try again.", undefined);
        } else {
          const { features } = data;
          if (features.length === 0) {
            callback("Unable to find location. Please try again.", undefined);
          } else {
            const [longitude, latitude] = features[0].center;
            callback(undefined, {
              longitude,
              latitude,
              location: features[0].place_name,
            });
          }
        }
      }
    }
  );
};

module.exports= geoCode;

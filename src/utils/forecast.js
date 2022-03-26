const request = require("request");

const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=00f0dd84db02f678433b96d12fd4132c&query=${lat},${lng}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    // console.log(response.body.current);

    if (error) {
      callback("Unable to connect to weather service");
    } else if (body.error) {
      callback("Unable to find location");
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out`
      );
    }
  });
};

module.exports = forecast;

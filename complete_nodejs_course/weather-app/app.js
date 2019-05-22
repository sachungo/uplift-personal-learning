const request = require('request');

const url = 'https://api.darksky.net/forecast/b07838850af9958e8e24818892623ab6/37.8267,-122.4233';

request({
  url,
  json: true
}, (error, response) => {
  const { currently = {} } = response.body;
  console.log(currently);
  console.log(`
    It is currently ${currently.temperature} degrees out. There is a ${currently.precipProbability}% of rain.
  `);
});

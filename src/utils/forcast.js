const request = require('postman-request')


const forcast = (latitude, longitude, callback) => {
    const weatherURL = 'http://api.weatherstack.com/current?access_key=0a21f89c6e5edc14b438fe53918790f6&query=' + latitude + ',' + longitude;

    request({ url: weatherURL, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined);
        } else if (body.error) {
            callback(body.error.info, undefined);
        } else {
            const weather_descriptions = body.current.weather_descriptions[0];
            const temperature = body.current.temperature;
            const feelslike = body.current.feelslike;
            
            callback(undefined, weather_descriptions + ". It is currently " + temperature + " degrees out. It feels like " + feelslike + " degrees out.");
        }
    })
}

module.exports = forcast;
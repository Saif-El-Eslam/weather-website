const request = require('postman-request')

const geocode = (address, callback) => {
    const geocodingURL = 'https://geocode.maps.co/search?q=' + encodeURIComponent(address);

    request({ url: geocodingURL, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to geocoding service!", undefined);
        } else if (body.length === 0) {
            callback("Unable to fetch this search query!", undefined);
        } else {
            const placeName = body[0].display_name;
            const latitude = body[0].lat;
            const longitude = body[0].lon;

            callback(undefined, {
                placeName: placeName,
                latitude: latitude,
                longitude: longitude
            });
        }
    })
}

module.exports = geocode;
const request = require('request');


const foreCast = (longitude, latitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ff49b610d9f4ec2a61a591434e1b3f6d&units=metric`;
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback(`Unable to connect to weather service.`, undefined);
        }
        else if (response.body.message) {
            callback(`Unable to find location`, undefined);
        }
        else {
            callback(undefined, {
                temp: response.body.main.temp,

                humidity: response.body.main.humidity
            })
        }
    })
}

module.exports = foreCast;
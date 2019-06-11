const request = require('request');
const fs = require('fs');

const location = require('./location');

//this function loads and returns weather data

async function weather(address, callback) {
    location(address, (error, location) => {
        //initialize weather variable as a still loading error

        if (error) {
            callback(error, undefined);
        } else {
            const darkskyApiKey = JSON.parse(fs.readFileSync('config.json').toString()).darkSkyApiKey;
            const weatherUrl = 'https://api.darksky.net/forecast/' + darkskyApiKey + '/' + location.latitude + ',' + location.longitude + '?units=si';

            request({url: weatherUrl, json: true}, (error, response) => {
                if (!error) {
                    weather = {
                        location: location,
                        summery: response.body.currently.summary,
                        temperature: response.body.currently.temperature,
                        precipProbability: response.body.currently.precipProbability * 100,
                        precipType: response.body.currently.precipType,
                        forcast: (response.body.currently.summary ? response.body.currently.summary : '')
                        + (response.body.currently.temperature ? '. It is currently ' + response.body.currently.temperature + ' celsius out ' : '')
                        + (response.body.currently.precipType && response.body.currently.precipProbability ? '. There is a ' + response.body.currently.precipProbability * 100 + '% chance of ' + response.body.currently.precipType : ''),

                    };
                    callback(undefined, weather);
                } else {
                    error = {
                        error: 'cannot connect to the Weather service',
                    }
                    callback(error, undefined);
                }
            });
        }


    });
}

module.exports = weather;
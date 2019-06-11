const request = require('request');
const fs = require('fs');


//function to get  the location
const location = (address, callback) => {

    const mapboxApiKey = JSON.parse(fs.readFileSync('config.json').toString()).mapboxApiKey;
    const locationUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent( address )+ '.json?access_token=' + mapboxApiKey + '&limit=1&autocorrect=true';

    request({url: locationUrl, json: true}, (error, response) => {

        if (error) {
           const error ={error: "Cannot Conenct to location server"} ;
           callback(error , undefined);

        } else if (response.body.features.length === 0) {
            let query = '';
            response.body.query.forEach((parameter) => {
                query += parameter + ' ';
            });
            const error ={error: "location not found : " + query} ;
            callback(error , undefined);

        } else {
           const location = {
                address: response.body.features[0].place_name,
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
            };
            callback(undefined ,location);
        }


    })

};

module.exports = location ;
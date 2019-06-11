const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weatherApi = require('./utils/weather');

const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const viewsPath = path.join(__dirname, '../templates/views');
const publicDirectoryPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (reqest, response) => {
    response.render('index', {
        title: "Weather App",
        name: "Shashi Srinath"
    });
});

app.get('/about', (reqest, response) => {
    response.render('about', {
        title: "About",
        name: "Shashi Srinath",
    });
});

app.get('/help', (reqest, response) => {
    response.render('help', {
        title: "Help",
        name: "Shashi Srinath",
    });
});


app.get('/weather', (request, response) => {

    if (!request.query.address) {
        return response.send({
            error: 'You Must Provide An Address'
        })
    }
    const weatherData = weatherApi(request.query.address,(error , weather) => {
        if (error) {
            return response.send(
                error
            );
        }
        response.send(
            weather
        );
    });
    console.log(weatherData);

});


app.get('/help/*', (request, response) => {
    response.render('404', {
            title: 'Error 404',
            errorMessage: 'Help Article Not Found',
            name: 'shashi srinath',
        }
    );
});

app.get('*', (request, response) => {
    response.render('404', {
            title: 'Error 404',
            name: 'shashi srinath',
            errorMessage: 'Page Not Found'
        }
    );
});

app.listen(port, () => {
    console.log('Server is up on port '+port);
});

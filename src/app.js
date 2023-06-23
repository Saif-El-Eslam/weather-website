const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

const app = express();

// Define paths for Express config
const puplicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use('', express.static(puplicPath));
// app.use('/help', express.static(puplicPath + '/help.html'));
// app.use('/about', express.static(puplicPath + '/about.html'));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Saifeleslam Elsayed'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Saifeleslam Elsayed'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Saifeleslam Elsayed',
        helpText: 'This is some helpful text.'
    });
});

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }

    geocode(req.query.address, (error, { placeName, latitude, longitude } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forcast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forcast: forcastData,
                location: placeName,
                address: req.query.address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Saifeleslam Elsayed',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Saifeleslam Elsayed',
        errorMessage: 'Page not found.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
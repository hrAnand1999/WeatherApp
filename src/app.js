const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const request = require('request');
const geoCode = require('./utils/geoCode');
const foreCast = require('./utils/foreCast');


// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialPaths = path.join(__dirname, '../template/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPaths);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        Name: 'Harsh Anand'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        Name: 'Harsh Anand'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Pls!',
        Name: 'Harsh Anand'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide the address'
        })
    }
    const city = req.query.address;


    geoCode(city, (error, callback) => {

        if (error) {
            return res.send({
                error: error
            })
        }
        const longitude = callback.longitude;
        const latitude = callback.latitude;
        const location = callback.location;
        console.log(longitude, latitude, location);
        foreCast(longitude, latitude, (error, callback) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            return res.send({
                location: location,
                temprature: callback.temp,
                humidity: callback.humidity
            })
        })
    })

    // geoCode(city, (error, {longitude, latitude, location}) => {
    //     if(error)
    //     {
    //         return res.send({
    //             error : error
    //         })
    //     }
    //     foreCast(longitude, latitude, (error, {temp, humidity}) => {
    //         if(error)
    //         {
    //             return res.send({
    //                 error : error
    //             })
    //         }
    //         return res.send({
    //             location : location,
    //             temprature : temp,
    //             humidity : humidity
    //         })
    //     })
    // });

})
app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search'
        })
    }
    res.send(
        {
            products: []
        }
    )
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        Name: 'Harsh Anand',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        Name: 'Harsh Anand',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on the port 3000');
})
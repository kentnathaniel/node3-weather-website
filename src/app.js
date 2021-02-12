const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000


//Define paths for Express config
const indexDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(indexDirectory))

app.get('', (req,res) => {
    res.render('index', {
        title: "Weather App",
        name: "Kent"
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: "About me",
        name: "Kent"
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: "Help page",
        help: "This is some helpful page",
        name: "Kent"
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
        
    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
    
        forecast(latitude, longitude, (forecastError, forecastData) => {
            if(forecastError) {
                return res.send({
                    error: forecastError
                })
            }
            
            res.send({
                forecast: forecastData,
                location: location + ' Latitude : ' + latitude + ' Longitude : ' + longitude,
                address: req.query.address
            })
        })
        
    })

})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: "404",
        message: "Help article not found",
        name: "Kent"
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: "404",
        message: "Page not found",
        name: "Kent"
    })
})

app.listen(port, () => {
    console.log("Server is up and running on port" + port)
})
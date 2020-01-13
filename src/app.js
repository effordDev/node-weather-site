const geocode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static dir 2 serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Reid Efford'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Reid Efford'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        help: 'This is my help text for now. ~',
        title: 'Help',
        name: 'Reid Efford'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({ error: 'Error: You must provide an address'})
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{ 
        if (error){
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
    
            res.send({
                forcast: forecastData,
                location,
                address: req.query.address  
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    } 

    res.send({
        products: []
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found',
        title: '404',
        name: 'Reid Efford'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page Not Found',
        title: '404',
        name: 'Reid Efford'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
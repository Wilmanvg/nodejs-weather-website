const path = require('path')
const express  = require('express')

const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express()

// Define path for the Express config
const pubPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(pubPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Wilman Garica'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Wilman Garcia'
    })
})

app.get('/help', (req, res) => {
    res.render('help' , {
        title: 'Help Page',
        message: 'This is the help page',
        name: 'Wilman Garcia'
    })
})
app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        
        if(error){
            return res.send({ error })
        }

        forecast( latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location, 
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term'
        })

    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 NOT FOUND',
        name: 'Wilman Garcia',
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 NOT FOUND',
        name: 'Wilman Garcia',
        error: 'Page not found.'
    })

})

// Start  the server up 
app.listen('3000', () => {
    console.log('Server is up on port 3000')
})
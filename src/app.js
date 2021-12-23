const path = require('path')    //path is a core node module
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
//console.log(__filename)
console.log(path.join(__dirname, '../public'))              //.. is used to go up one folder

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')    //a handlebars file (hbs) is like an html file but with features to inject dynamic code
app.set('views', viewsPath)    // tell express to use viewsPath for loading views
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))      //customise the server to find where the static content is

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Deepshikha Boro'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Deepshikha Boro'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Deepshikha Boro',
        message: 'Please mail us at our helpline: help@mail.com'
    })
})

//app.get to respond when a particular route is hit
// app.get('', (req, res) => {   //this function decides what to send back to the requestor, req: request data, res: response data
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res)=>{
//     res.send([{name : 'Deepshikha',age : 25}, {name : 'Andrew', age : 27}])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (errorMessage, {latitude, longitude, location} = {})=>{
        if(errorMessage){
            return res.send({
                error: errorMessage
            })
        }

        forecast(latitude, longitude, (error, weatherData)=>{
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast : weatherData,
                location
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

app.get('/help/*',(req, res)=>{
    res.render('404page',{
        title: '404',
        errorMessage: 'Help article not found!!',
        name: 'Deepshikha Boro'
    })
})

//app.com
//app.com/help
//app.com/about

//starts up the server and has it listen on a specific port

app.get('*', (req, res)=>{
    res.render('404page',{
        title: '404',
        errorMessage: '404: page not found!!',
        name: 'Deepshikha Boro'
    })
})

app.listen(3000, ()=>{        //3000 is the port no, second one is the optional argument, function to run when the server starts
    console.log('Server is up on port 3000')
})  
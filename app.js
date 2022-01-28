const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const positionRoutes = require('./routes/position')
const sceneRoutes = require('./routes/scene')
const keys = require('./config/keys.js')

mongoose.connect( keys.mongoURI )
    .then( () => console.log('MongoDB connected!') )
    .catch( error => console.log(error) )

app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/position', positionRoutes)
app.use('/api/scene', sceneRoutes)

module.exports = app
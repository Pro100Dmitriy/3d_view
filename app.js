const express = require('express')
const mongoose = require('mongoose')
const app = express()
const shopRoutes = require('./routes/shop')
const keys = require('./config/keys.js')

mongoose.connect( keys.mongoURI )
    .then( () => console.log('MongoDB connected!') )
    .catch( error => console.log(error) )

app.use('/api/shop', shopRoutes)

module.exports = app
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sceneSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    data: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('scene', sceneSchema)
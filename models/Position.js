const mongoose = require('mongoose')
const Schema = mongoose.Schema

const positionSchema = new Schema({
    productId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    sizes: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        required: false
    },
    imageSrc: {
        type: [String],
        default: []
    }
})

module.exports = mongoose.model('position', positionSchema)
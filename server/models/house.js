const mongoose = require('mongoose')
const Schema = mongoose.Schema

const House = new Schema({
    title: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    long: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    photoPath: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('House', House)
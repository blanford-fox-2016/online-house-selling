const mongoose = require('mongoose')
const Schema = mongoose.Schema

const House = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String
    },
    location: {
        address: {
            type: String
        },
        long: {
            type: String
        },
        lat: {
            type: String
        }
    },
    photoURL: {
        type: String,
    },
    photoFile: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('House', House)
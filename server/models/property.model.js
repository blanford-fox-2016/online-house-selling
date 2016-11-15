'use strict'

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');
let connection = mongoose.createConnection(process.env.DATABASE);
let propertySchema = new mongoose.Schema({
    property_id: {
        type: Number
    },
    title: {
        type: String,
        required: true
    },
    property_type: {
        type: String,
        required: true
    },
    location: {
        address: String,
        lat: Number,
        long: Number
    },
    details: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    contact: {
        name: String,
        phone: String,
        email: String
    }
});


propertySchema.plugin(AutoIncrement, { inc_field: 'property_id' });
let Property = connection.model('Property', propertySchema);
module.exports = Property

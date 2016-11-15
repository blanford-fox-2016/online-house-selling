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
    type: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    details: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    contact: {
        type: Array,
        required: true
    }

});


propertySchema.plugin(AutoIncrement, { inc_field: 'property_id' });
let Property = connection.model('Property', propertySchema);
module.exports = Property

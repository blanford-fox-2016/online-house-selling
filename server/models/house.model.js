'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Increment = require('mongoose-sequence')

const houseSchema = new Schema({
  house_id: {type: Number},
  title: {type: String, required: true},
  description: {type: String, required: true},
  image: {type: String, required: true},
  price: {type: Number, required: true},
  location: {
    lat: {type: String, required: true},
    long: {type: String, required: true}
  }
});

houseSchema.plugin(Increment, { inc_field: 'house_id' });

module.exports = mongoose.model('House', houseSchema);

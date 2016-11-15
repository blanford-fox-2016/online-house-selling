'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Increment = require('mongoose-sequence')

const houseSchema = new Schema({
  house_id: {type: Number},
  title: {type: String},
  description: {type: String},
  image: {type: String},
  price: {type: Number},
  location: {
    lat: {type: String},
    long: {type: String}
  }
});

houseSchema.plugin(Increment, { inc_field: 'house_id' });

module.exports = mongoose.model('House', houseSchema);

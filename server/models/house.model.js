'use strict'

const mongoose = require('mongoose');
const Schema = mongose.Schema;

const houseSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  images: {type: String, required: true},
  location: {type: String, required: true}
})

module.exports = mongoose.model('House', houseSchema)

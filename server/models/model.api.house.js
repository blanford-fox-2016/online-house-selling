'user strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const houseSchema = new Schema({
  title: String,
  address: String,
  description: String,
  price: Number,
  phone_number: String,
  email: String,
  picture: String,
  google_map:{
    lat: String,
    lng: String
  }
})

module.exports = mongoose.model('House', houseSchema)

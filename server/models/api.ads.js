'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let AdsSchema = new Schema({
  title : String,
  description : String,
  photo : String,
  price : Number,
  location : {
    address : String,
    addressCountry : String,
    postalCode : Number,
    long  : String,
    lat : String,
  }
},{
  timestamps: true
})

module.exports = mongoose.model('Ads', AdsSchema)

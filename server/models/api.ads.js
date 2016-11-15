'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let AdsSchema = new Schema({
  title : String,
  description : String,
  photo : String,
  location : {
    address : String,
    addressCountry : String,
    postalCode : String,
    long  : String,
    lat : String,
  }
},{
  timestamps: true
})

module.exports = mongoose.model('Ads', AdsSchema)

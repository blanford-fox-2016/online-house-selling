'use strict'

const mongoose = require('mongoose');

let Schema = mongoose.Schema

let houseSchema = new Schema ({

  name : String,
  area  :Number,
  price: Number,
  image :String,
  location : String

}, {timestamps :true}
)


module.exports = mongoose.model("House", houseSchema);

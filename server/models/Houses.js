const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let housesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  owner: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  lat: {
    type: String
  }
  long: {
    type: String
  }
},
{
  timestamps: true
});

let houses = mongoose.model('houses', housesSchema)

module.exports = houses;

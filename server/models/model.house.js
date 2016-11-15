var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var houseSchema = new Schema({
  name: String,
  location: String,
  desc : String
});

// the schema is useless so far
// we need to create a model using it
var houses = mongoose.model('Houses', houseSchema);

// make this available to our users in our Node applications
module.exports = houses;

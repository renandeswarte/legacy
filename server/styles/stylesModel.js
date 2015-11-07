var mongoose = require('mongoose');
var Q = require('q');


var StylesSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  image: String
});

module.exports = mongoose.model('Styles', StylesSchema);

var mongoose = require('mongoose');
var Q = require('q');


var BarbersSchema = new mongoose.Schema({
   name: String,
   gender: String,
   location: String,
   rating: Number,
   bio: String,
   languages: Array,
   reviews: Array,
   styles: Array,
   portrait: String,
   availability: String
});

module.exports = mongoose.model('Barbers', BarbersSchema);

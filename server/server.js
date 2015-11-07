var express = require("express");
var mongoose = require('mongoose');
var http = require('http');
var querystring = require('querystring');
var uriUtil = require('mongodb-uri');
var Q = require('q');

var User = require('./users/userModel.js');
var Styles = require('./styles/stylesModel.js');
var Barbers = require('./barbers/barbersModel.js');
var APIKeys = require('./config/APIKeys.js');

var app = express();

var port = process.env.PORT || 3000;


//---------------------------------------------------------------------

var dbuser = process.env.dbuser || APIKeys.dbuser;
var dbpassword = process.env.dbpassword || APIKeys.dbpassword;

var uristring = process.env.MONGOLAB_URI ||
process.env.MOGOHQ_URL ||
'mongodb://' + dbuser + ':' + dbpassword + '@ds043714.mongolab.com:43714/foodly';  // previous URI
// 'mongodb://' + dbuser + ':' + dbpassword + '@ds049744.mongolab.com:49744/legacy';  // our URI


var mongooseUri = uriUtil.formatMongoose(uristring);

var options = {
  server: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 30000
    }
  }
};


mongoose.connect(mongooseUri, options);
var db = mongoose.connection;

db.once('open', function() {
  console.log('connected to: ', mongooseUri);
});

require('./config/middleware.js')(app, express);

app.listen(port);
console.log('Server now listening on port ' + port);

module.exports = app;


// // KEEP THIS: dummy entries for each schema to test DB connection, uncomment when needed
// var userCreate = Q.nbind(User.create, User);
//   var newUser = {
//    username: 'bob dobalina',
//    password: '12345'
//   };
//   userCreate(newUser);

// var stylesCreate = Q.nbind(Styles.create, Styles);
//   var newStyle = {
//    title: 'McSqueeb',
//    price: 30,
//    description: 'The Tony Hawk special'
//   };
//   stylesCreate(newStyle);

// var barbersCreate = Q.nbind(Barbers.create, Barbers);

//   var newBarber = {
//    name: 'Jia',
//    gender: 'female',
//    location: 'San Francisco',
//    rating: 12,
//    ratingCount: 3,
//    bio: "she's great!",
//    languages: ['English', 'Mandarin'],
//    reviews: ["she is a fantastic stylist"],
//    styles: ['Wavy'],
//    portrait: 'https://s3-us-west-1.amazonaws.com/haircut-on-demand/jia.jpg',
//    availability: '11-7'
//   };
//   barbersCreate(newBarber);

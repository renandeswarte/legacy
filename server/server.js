var express = require("express");
var mongoose = require('mongoose');
var Q = require('q');
var uriUtil = require('mongodb-uri');
var aws = require('aws-sdk');
var nodemailer = require('nodemailer');
var http = require('http');
var querystring = require('querystring');
var braintree = require('braintree');

var User = require('./users/userModel.js');
var Styles = require('./styles/stylesModel.js');
var Barbers = require('./barbers/barbersModel.js');
var APIKeys = require('./config/APIKeys.js');

var app = express();

var port = process.env.PORT || 3000;


//---------------------------------------------------------------------

//set up URI connection to mongolab
var uristring = process.env.MONGOLAB_URI || 'mongodb://' + dbuser + ':' + dbpassword + '@ds049744.mongolab.com:49744/legacy';  // our URI

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

db.once('open',function() {
  console.log('connected to: ', mongooseUri);
});

require('./config/middleware.js')(app, express);

// --------------------------------------------------
// ***** AWS *******
var AWS_ACCESS_KEY = APIKeys.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = APIKeys.AWS_SECRET_KEY;
var S3_BUCKET = APIKeys.S3_BUCKET;

app.get('/sign_s3', function(req, res) {
  aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
  var s3 = new aws.S3();
  var s3_params = {
    Bucket: S3_BUCKET,
    Key: req.query.file_name,
    Expires: 60,
    ContentType: req.query.file_type,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3_params, function(err, data) {
    if(err) {
      console.log(err);
    } else {
      var return_data = {
        signed_request: data,
        url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
      };
      res.write(JSON.stringify(return_data));
      res.end();
    }
  });
});

app.listen(port);
console.log('Server now listening on port ' + port);

module.exports = app;





// ----------------------------------------------------
// ********* NODEMAILER ***********

// sends email notification from foodlymailer@gmail to vendor whenever customer places an order
var smtpTransport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    user: "foodlymailer@gmail.com",
    pass: "foodly123"
  }
});


// --------------------------------------------
// ROUTING

app.get('/send', function(req, res) {
  var mailOptions = {
    to: req.query.to,
    subject: req.query.subject,
    text: req.query.text
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
      res.end("error");
    } else {
      console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });
});


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
  // var newBarber = {
  //  name: 'Bob the Barber',
  //  gender: 'male',
  //  location: 'San Francisco',
  //  rating: 4.5,
  //  bio: 'he\'s the man',
  //  languages: ['English', 'Swahili'],
  //  reviews: ['he\s totally the man'],
  //  styles: ['McSqueeb'],
  //  portrait: 'https://s3-us-west-1.amazonaws.com/haircut-on-demand/royce.jpg',
  //  availability: '11-7'
  // };
  // var newBarber = {
  //  name: 'Jia',
  //  gender: 'female',
  //  location: 'San Francisco',
  //  rating: 4,
  //  bio: "she's great!",
  //  languages: ['English', 'Mandarin'],
  //  reviews: ["she is a fantastic stylist"],
  //  styles: ['Wavy'],
  //  portrait: 'https://s3-us-west-1.amazonaws.com/haircut-on-demand/jia.jpg',
  //  availability: '11-7'
  // };
  // barbersCreate(newBarber);

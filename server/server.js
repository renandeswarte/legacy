var express = require("express");
var mongoose = require('mongoose');
var Q = require('q');
var uriUtil = require('mongodb-uri');
var aws = require('aws-sdk');
var nodemailer = require("nodemailer");

var User = require('./users/userModel.js');
var Styles = require('./styles/stylesModel.js');
var Barbers = require('./barbers/barbersModel.js');
var APIKeys = require('./config/APIKeys.js');

var app = express();

var port = process.env.PORT || 3000;

require('./config/middleware.js')(app, express);

//---------------------------------------------------------------------
// ***** MONGOLABS *****
var dbuser = 'admin';
var dbpassword = 'admin';

//set up URI connection to mongolab
var uristring = process.env.MONGOLAB_URI || 
process.env.MOGOHQ_URL ||
'mongodb://' + dbuser + ':' + dbpassword + '@ds043714.mongolab.com:43714/foodly';  // previous URI
// 'mongodb://' + dbuser + ':' + dbpassword + '@ds049744.mongolab.com:49744/legacy';  // our URI

var mongooseUri = uriUtil.formatMongoose(uristring);

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } }; 

mongoose.connect(mongooseUri, options);
var db = mongoose.connection;

db.once('open',function() {
  console.log('connected to: ', mongooseUri);
});

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


// -------------------------------------------------
// ******** TWILIO *********
var ryansTwilioNumber = process.env.twilioNumber || APIKeys.ryansTwilioNumber;
var TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || APIKeys.TWILIO_ACCOUNT_SID;
var TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || APIKeys.TWILIO_AUTH_TOKEN;
// var twilioClient = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
// Test credentials only - DO NOT PUSH THIS!
var twilioClient = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


// twilioClient.messages.create({ 
//   to: '+6782960196',  // make this a variable for the users phone number
//   from: '+15005550006', // <- this is the testing number. use when not testing -> ryansTwilioNumber,   // make this a variable from the API keys file
//   body: 'Testing, testing...', 
//   // mediaUrl: "We can also send media.",  // this should be a URL to send media
// }, function(err, message) { 
//   console.log('err: ', err, 'message: ', message); 
// });

// app.post('/2010-04-01/Accounts/' + TWILIO_ACCOUNT_SID + '/Messages');


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
//   var newBarber = {
//    name: 'Bob the Barber',
//    gender: 'male',
//    location: 'San Francisco',
//    rating: 4.5,
//    bio: 'he\'s the man',
//    languages: ['English', 'Swahili'],
//    reviews: ['he\s totally the man'],
//    styles: ['McSqueeb'],
//    portrait: 'some URL',
//    availability: '11-7'
//   };
//   barbersCreate(newBarber);

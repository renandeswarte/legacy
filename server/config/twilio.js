var APIKeys = require('./APIKeys.js');


module.exports = function(app) {
  // -------------------------------------------------
  // ******** TWILIO *********
  var ryansTwilioNumber = process.env.twilioNumber || APIKeys.ryansTwilioNumber;
  var TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || APIKeys.TWILIO_ACCOUNT_SID;
  var TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || APIKeys.TWILIO_AUTH_TOKEN;
  // var twilioClient = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  // Test credentials only - DO NOT PUSH THIS!
  // var twilioClient = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  // app.use(twilioNotifications.notifyOnError);  // Twilio error handling


  // twilioClient.messages.create({ 
  //   to: '+6782960196',  // make this a variable for the users phone number
  //   from: '+15005550006', // <- this is the testing number. use when not testing -> ryansTwilioNumber,   // make this a variable from the API keys file
  //   body: 'Testing, testing...', 
  //   // mediaUrl: "We can also send media.",  // this should be a URL to send media
  // }, function(err, message) { 
  //   console.log('err: ', err, 'message: ', message); 
  // });

  // app.post('/2010-04-01/Accounts/' + TWILIO_ACCOUNT_SID + '/Messages');

};

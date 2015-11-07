var nodemailer = require('nodemailer');

module.exports = function(app) {
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


  app.get('/send', function(req, res) {
    var mailOptions = {
      to: req.query.to,
      subject: req.query.subject,
      text: req.query.text
    };
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

};
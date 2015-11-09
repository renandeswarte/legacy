var nodemailer = require('nodemailer');

module.exports = function(app) {

  var smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
      user: 'foodlymailer@gmail.com',
      pass: 'foodly123'
    }
  });

  // sends confirmation email from foodlymailer@gmail to customer when order complete
  app.post('/', function(req, res) {
    var mailOptions = {
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.text
    };
    
    smtpTransport.sendMail(mailOptions, function(error, response) {
      if (error) {
        console.log('Email error: ', error);
        res.end('error');
      } else {
        console.log('Message sent: ' + response.message);
        res.end('success');
      }
    });
  });

};
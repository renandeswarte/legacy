var APIKeys = require('./APIKeys.js');
var stripe = require('stripe')(APIKeys.apikey);


module.exports = function(app) {

  app.post('/charge', function(req, res) {
    // Get the credit card details submitted by the form
    var stripeToken = req.body.stripeToken;

    var charge = stripe.charges.create({
      amount: 3000, // amount in cents, again
      currency: 'usd',
      source: stripeToken,
      description: 'InstaCutz'
    }, function(err, charge) {
      if (err && err.type === 'StripeCardError') {
        // The card has been declined
        console.log('Card has been declined');
        res.send('Card has been declined');
      } else {
        console.log('Success!');
        res.send('Success!');
      }
    });
  });


};




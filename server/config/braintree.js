var braintree = require('braintree');
var APIKeys = require('./APIKeys.js');


module.exports = function(app) {

  // API keys
  var merchantId = process.env.merchantId || APIKeys.merchantId;
  var publicKey = process.env.publicKey || APIKeys.publicKey;
  var privateKey = process.env.privateKey || APIKeys.privateKey;

  // initial server setup
  var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: merchantId,
    publicKey: publicKey,
    privateKey: privateKey
  });


  /* The server needs to generate a client token in response to the client request, containing all the
  auth and config info the client needs to begin talking with Braintree. If we include a customerId
  when generating the token, return customers will be able to use their previous payment options. */

  app.get('/payment/client_token', function(req, res) {
    gateway.clientToken.generate({}, function (err, response) {
      res.send(response.clientToken);
    });
  });


  /* The client then needs to accept the token, talk to the Braintree server, and respond with a nonce:
  */

  app.post('/payment/checkout', function(req, res) {
    var nonce = req.body.payment_method_nonce;
    var price = req.body.price;  // TODO: make sure the client sends the price!
    
    gateway.transaction.sale({
      amount: price,
      paymentMethodNonce: nonce,
    }, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        // TODO: do something with the completed transaction
      }
    });
  });  

};

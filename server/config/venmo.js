var APIKeys = require('./APIKeys.js');
var http = require('http');
var querystring = require('querystring');

module.exports = function(app) {
// -------------------------------------------------
// ******** VENMO *********

// THIS IS NOT CURRENTLY WORKING
  // the request is made, response is 301
// var paymentObject = querystring.stringify({
//   access_token: '755a2985d81c4d0c2699aa16b964338999235e667fc2537e7f6e72fc180b3179',
//   user_id: 145434160922624933,
//   email: 'venmo@venmo.com',
//   phone: 15555555555,
//   note: 'Testing testing',
//   amount: -0.10
// });

// var reqOptions = {
//   hostname: 'sandbox-api.venmo.com',
//   path: '/v1/payments',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Content-Length': paymentObject.length
//   }
// };

// var venmoReq = http.request(reqOptions, function(res) {
//   console.log('STATUS: ' + res.statusCode);
//   console.log('HEADERS: ' + JSON.stringify(res.headers));
//   res.setEncoding('utf8');
//   res.on('data', function (chunk) {
//     console.log('BODY: ' + chunk);
//   });
//   res.on('end', function() {
//     console.log('No more data in response.')
//   });
// });

// venmoReq.on('error', function(err) {
//   console.log('problem with request: ' + err.message);
// });

// // write data to request body
// venmoReq.write(paymentObject);
// venmoReq.end();

// app.post('https://sandbox-api.venmo.com/v1', paymentObject);
};

/* NOTES ON VARIOUS FEATURES FOR USE ON LEGACY PROJECT */

// VENMO INTEGRATION

  // FRONT END SOLUTION
    /* Simple payments can be achieved on the front end by sending the user to a custom link, populating the query with the necessary info:

    https://venmo.com/?txn=pay&recipients=example%40email.com&amount=30&note=Haircut%20via%20ShortCut&audience=friends

    https://venmo.com/?txn=pay&recipients=
    + barber's email (with '%40' for the @ symbol)
    + '&amount='
    + haircut price
    + '&note=Haircut%20via%20ShortCut&audience=friends' (change 'ShortCut' to our app name)

    This will take the user to a different page to confirm their payment, so make sure this opens in a
    new tab! And indicate in the copy that this will happen, so the user expects it. Can we make this
    open in a modal or pop-up instead?


  // BACK END SOLUTION

    /* To charge a customer:

      Make a POST request to https://api.venmo.com/v1/payments
      Sandbox link: https://sandbox-api.venmo.com/v1 
        data: {
          access_token: ,
          user_id: 145434160922624933,  // this is specific for testing
          email: 'venmo@venmo.com',  // this is specific for testing
          phone: 15555555555,  // this is specific for testing
          note: 'Testing testing',
          amount: 0.10
        }

    */



// TWILIO INTEGRATION

/*

  // Twilio Credentials 
  (these are in the API keys file)
 
  //require the Twilio module and create a REST client 
  var twilioClient = require('twilio')(accountSid, authToken);  // these variable names may be different
   
  twilioClient.messages.create({ 
    to: "+4151111111",  // make this a variable for the users phone number
    from: "+14152149813",   // make this a variable from the API keys file
    body: "This is the body.", 
    mediaUrl: "We can also send media.",  // this should be a URL to send media
  }, function(err, message) { 
    console.log(message.sid); 
  });

  To send a new outgoing message, make an HTTP POST to your Messages list resource URI:
  '/2010-04-01/Accounts/{AccountSid}/Messages'

*/



/* BRAINTREE INTEGRATION

https://developers.braintreepayments.com/start/hello-server/node

  Credentials are in API keys file

  ## The strategy:
    - Client makes a request to the server
    - Server responds with a token
    - Client uses token to communicate directly with Braintree server
    - Braintree server replies to client with a nonce
    - Client sends nonce to server
    - Server sends nonce to Braintree server
    

  ## initial server setup:

    var gateway = braintree.connect({
      environment: braintree.Environment.Sandbox,
      merchantId: APIKeys.merchantId,
      publicKey: APIKeys.publicKey,
      privateKey: APIKeys.privateKey
    });


  ## initial client setup:

    <form id="checkout" method="post" action="/checkout">
      <div id="payment-form"></div>
      <input type="submit" value="Pay $10">
    </form>

    <script src="https://js.braintreegateway.com/v2/braintree.js"></script>
    <script>
    // We generated a client token for you so you can test out this code
    // immediately. In a production-ready integration, you will need to
    // generate a client token on your server.
    var clientToken = "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI5YmU0NGVhMTM3MTEwYThmNmYyYTMyNWQ1NWRkMDlkYTljNDMzYjY4NDIxMGY2YWI2ZTJhOTFiMTEwOTQ4OGFkfGNyZWF0ZWRfYXQ9MjAxNS0xMS0wNlQyMzoxODo1Ny43NTQ0NTUzOTMrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIn0sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsInRocmVlRFNlY3VyZSI6eyJsb29rdXBVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi90aHJlZV9kX3NlY3VyZS9sb29rdXAifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJjb2luYmFzZUVuYWJsZWQiOmZhbHNlLCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0=";

    braintree.setup(clientToken, "dropin", {
      container: "payment-form"
    });
    </script>


  ## Client makes GET request to /client_token to get a token

  ## Server replies with token in the response:

    app.get("/client_token", function (req, res) {
      gateway.clientToken.generate({}, function (err, response) {
        res.send(response.clientToken);
      });
    });

  ## Client embeds token into the template:

    braintree.setup("CLIENT_TOKEN_FROM_SERVER", "dropin", {
      container: "payment-form"
    });

  ## Client sends payment nonce to Braintree server:

    <form id="checkout" method="post" action="/checkout">
      <div id="payment-form"></div>
      <input type="submit" value="Pay $10">
    </form>

    <script src="https://js.braintreegateway.com/v2/braintree.js"></script>

    <script>
      braintree.setup(
        // Replace this with a client token from your server
        "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI5YmU0NGVhMTM3MTEwYThmNmYyYTMyNWQ1NWRkMDlkYTljNDMzYjY4NDIxMGY2YWI2ZTJhOTFiMTEwOTQ4OGFkfGNyZWF0ZWRfYXQ9MjAxNS0xMS0wNlQyMzoxODo1Ny43NTQ0NTUzOTMrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIn0sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsInRocmVlRFNlY3VyZSI6eyJsb29rdXBVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi90aHJlZV9kX3NlY3VyZS9sb29rdXAifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJjb2luYmFzZUVuYWJsZWQiOmZhbHNlLCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0=",
        "dropin", {
          container: "payment-form"
        });
    </script>

  ## When client receives nonce, send that nonce to the server at /checkout

  ## The server receives the nonce from the client:

    app.post("/checkout", function (req, res) {
      var nonce = req.body.payment_method_nonce;
      // Use payment method nonce here
    });

    ## The server then uses that nonce to complete the transaction:

      gateway.transaction.sale({
        amount: '10.00',
        paymentMethodNonce: nonceFromTheClient,
      }, function (err, result) {
      });

*/


// OLD ORDER PAGE FORMS

<form class="form-horizontal" >
    <fieldset >
        <h2>Contact Information</h2>
        <!-- email input-->
        <div class="control-group">
            <label class="control-label">Email address</label>
            <div class="controls">
                <input id="email" name="email" type="text" placeholder="name@example.com" class="input-xlarge">
            </div>
        </div>
        <!-- Address form -->
        <h2>Address</h2>
        <!-- address-line1 input-->
        <div class="control-group">
            <label class="control-label">Address Line 1</label>
            <div class="controls">
                <input id="address-line1" name="address-line1" type="text" placeholder="address line 1" class="input-xlarge" >
                <!-- <p ng-controller="MealController" class="help-block">Street address, P.O. box, company name, c/o
                </p> -->
            </div>
        </div>
        <!-- address-line2 input-->
        <div class="control-group">
            <label class="control-label">Address Line 2</label>
            <div class="controls">
                <input id="address-line2" name="address-line2" type="text" placeholder="address line 2" class="input-xlarge">
                <p class="help-block">Apartment, suite , unit, building, floor, etc.</p>
            </div>
        </div>
        <!-- city input-->
        <div class="control-group">
            <label class="control-label">City / Town</label>
            <div class="controls">
                <input id="city" name="city" type="text" placeholder="city" class="input-xlarge" >
                <p class="help-block"></p>
            </div>
        </div>
        <!-- region input-->
        <div class="control-group">
            <label class="control-label">State / Province / Region</label>
            <div class="controls">
                <input id="region" name="region" type="text" placeholder="state / province / region" class="input-xlarge" >
                <p class="help-block"></p>
            </div>
        </div>
        <!-- postal-code input-->
        <div class="control-group">
            <label class="control-label">Zip / Postal Code</label>
            <div class="controls">
                <input id="postal-code" name="postal-code" type="text" placeholder="zip or postal code" class="input-xlarge" >
                <p class="help-block"></p>
            </div>
        </div>



        
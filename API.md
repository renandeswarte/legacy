# API DOCUMENTATION FOR INSTACUTZ

## Table of Contents:
* Quicksheet - Server routes
* Testing
* Client Overview
* Server Overview 


## QuickSheet - Server routes. 

* Users - /api/users
    - /customer/post/signin - sign in current user.
    - /customer/post/signup - sign up new user.
    - /customer/get/meals - deprecated.
    - /customer/get/signedin - check auth.
    - /customer/post/orders - deprecated.
    - /vendors/post/meal - deprecated.
    - /customer/post/ratings - user rates barber.

* Styles - /hairstyles
    - /get/styles - fetch available styles.

* Barbers - /barbers
    - /barberid - fetch barber id.
    - /get/barbers - fetch available barbers.

* Misc
    - /payment/charge - charge credit card via Stripe.
    - /sign_s3/sign_s3 - add image asset to AWS S3.
    - /send - email user confirmation via nodemailer.


## Testing

Testing can be located in server/test. Testing uses supertest to test whether incoming client requests will receive a response.


## Client

Built with Angular.

**about-us** - The About page, describing the team.

**addMeal** - deprecated.

**assets** - Various web assets not on AWS.

**auth** - Authentication pages. html is deprecated, js still in use.

**barber-registration** - Future home of pages related to signing up new barbers.

**barbers** - Barbers and Barber Detail pages.

**hairstyles** - Style and Style Detail pages.

**homepage** - Landing page with photo carousel.

**order** - Checkout page, including authentication and payment.

*app.js* - Main app file. Routing, some authentication.


## Server:

Built with Node, Express, MongoDB.

**barbers**
    * controller: methods for fetching ids and barbers.
    * model: database schema.
    * routes: routing from /barbers.

**config**
    * APIKeys: not provided. Add your file here (gitignored).
    * aws: routes and methods for AWS S3 connection.
    * braintree: deprecated.
    * helpers: helper methods.
    * middleware: routing for all paths.
    * nodemailer: routes and methods for emailing user confirmation.
    * stripe: routes and methods for Stripe payment charging.
    * twilio: deprecated.
    * venmo: deprecated.

**styles**
    * controller: methods for fetching styles.
    * model: database schema.
    * routes: routing from /hairstyles.

**test**
    * testing.

**users**
    * controller: methods for authentication, rating, deprecated other functions.
    * model: database schema.
    * routes: routing from /api/users.

*server.js* - Server init, MongoDB connect, routing to middleware.js.




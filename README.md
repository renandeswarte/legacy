## InstaCutz

#### Team
Alex Kim - Product Owner
Kevin Aujla - Scrum Master
Aaron Spafford - Dev Team
Renan Deswarte - Dev Team
Ryan James - Dev Team

#### What
InstaCutz is a platform to connect barbers with users for on-demand haircuts. Users can select from a variety of styles, or request a custom cut. A curated selection of barbers is available to fulfill any style. Payment is easy, using Stripe for credit card transactions.

#### Why
We pivoted from the previous app, Foodly, as the food delivery market is quite saturated. On-demand haircuts are useful for our busy lives, and thus far is an underserved market. We were able to adapt the structure of Foodly to fit our new needs and new product.

#### Installation and Usage
* Install: bower install and npm install for client and server files respectively.
* Grunt:
    - 'grunt build' will compile client files.
    - 'grunt watch' watches client files for changes and rebuilds accordingly.
    - 'grunt server' begins the nodemon server.
* Database is via MongoLab. Swap out your info in server.js.
* AWS: image assets are stored in AWS S3 and referenced via URL in the DB. Be sure to make your assets public!
* API keys were in a gitignored file, server/config/APIKeys.js. Recommend that you create your own file to not break many references. Needed keys:
    - Stripe
    - MongoLab
    - AWS
* See API Documentation for more details.
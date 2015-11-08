var morgan = require('morgan'); // used for logging incoming request
var bodyParser = require('body-parser');
var helpers = require('./helpers.js');

var aws = require('aws-sdk');

module.exports = function(app, express){

  var userRouter = express.Router();
  var braintreeRouter = express.Router();
  var barbersRouter = express.Router();  
  var stylesRouter = express.Router();  
  var AWSrouter = express.Router();
  var nodemailerRouter = express.Router(); 

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client/app'));

  app.use('/api/users', userRouter);
  app.use('/payment', braintreeRouter);
  app.use('/barbers', barbersRouter);
  app.use('/hairstyles', stylesRouter);
  app.use('/sign_s3', AWSrouter);
  app.use('/send', nodemailerRouter);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  require('../users/userRoutes.js')(userRouter);
  require('./braintree.js')(braintreeRouter);
  require('../barbers/barbersRoutes.js')(barbersRouter);
  require('../styles/stylesRoutes.js')(stylesRouter);
  require('./aws.js')(AWSrouter);
  require('./nodemailer.js')(nodemailerRouter);
};

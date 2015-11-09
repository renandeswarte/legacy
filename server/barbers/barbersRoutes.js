var barbersController = require('./barbersController.js');


module.exports = function (app) {

  app.get('/barberid', barbersController.barbersIdFetch);
  app.get('/get/barbers', barbersController.barbersFetch);

};

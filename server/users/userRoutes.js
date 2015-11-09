var userController = require('./userController.js');

module.exports = function (app) {
  app.post('/customer/post/signin', userController.signin);
  app.post('/customer/post/signup', userController.signup);
  app.get('/customer/get/meals',userController.meals);
  app.get('/customer/get/signedin', userController.checkAuth);
  app.post('/customer/post/orders', userController.addMeal);
  app.post('/vendors/post/meal', userController.addMeal);
  app.post('/customer/post/ratings', userController.addRating);
};

var stylesController = require('./stylesController.js');

module.exports = function (app) {
  // app.get('/styleid', stylesController.stylesIdFetch);
  app.get('/get/styles', stylesController.styles);
};

var Style = require('./stylesModel.js');
var Q = require('q');

exports.styles = function(req,res,next){
  var findStyles = Q.nbind(Style.find, Style);
  findStyles()
  .then(function(style) {
    res.json(style);
  }).fail(function(err) {
    next(err);
  });
};

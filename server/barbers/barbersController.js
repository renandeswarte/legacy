var Barber = require('./barbersModel.js');
var Q = require('q');
var jwt = require('jwt-simple');


module.exports = {

  barbersIdFetch: function(req, res, next) {
    var barberFind = Q.nbind(Barber.findOne, Barber);

    barberFind({
      '_id': req.query.barberid
    },'', function(err, results) {
      if (err) {
        res.send('Barber Lookup Error', err);
      } else {
        res.send(results);
      }
    });
  },

  barbersFetch: function(req, res, next) {
    var findBarbers = Q.nbind(Barber.find, Barber);
    findBarbers()
      .then(function(barber) {
        res.json(barber);
      })
      .fail(function(err) {
        next(err);
      });
    }
};

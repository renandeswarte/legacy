var Barber = require('./barbersModel.js');
var Q = require('q');
var jwt = require('jwt-simple');

module.exports = {

  barbersIdFetch: function(req, res, next) {
    var barberFind = Q.nbind(Barber.findOne, Barber);

    barberFind({
      '_id.$oid': req.query.barberId
    },'', function(err, results) {
      if (err) {
        res.send('Barber Lookup Error', err);
      } else {
        res.send(results);
      }
    });
  }

};

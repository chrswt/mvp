var Factual = require('factual-api');
var factual = new Factual('lE8FYusPO5Fc16F6XMOqpDFZFkLYpSPLBrMbqZBT',
  'SmnyMiWnt33zHSGoBdLHD4zPhl1IhhcZL02DyBY8');

exports.findPlace = function(req, res) {
  var place = req.query.place;
  var region = req.query.region || 'CA';

  console.log(req);
  factual.get('/t/places-us', {
    q: place,
    filters: {
      region: region
    },
  }, function(err, result) {
    res.send(result.data);
  });
};

/* factual.get('http://api.v3.factual.com/t/crosswalk-us?q=the container store', function (err, res) {
  if (err) { console.log(err); }
  console.log(res.data);
});
*/

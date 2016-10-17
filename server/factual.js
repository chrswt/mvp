var Factual = require('factual-api');
var factual = new Factual('lE8FYusPO5Fc16F6XMOqpDFZFkLYpSPLBrMbqZBT',
  'SmnyMiWnt33zHSGoBdLHD4zPhl1IhhcZL02DyBY8');

exports.findPlace = function(req, res) {
  var place = req.query.place;
  var region = req.query.region || 'CA';
  var locality = req.query.locality || 'San Francisco';

  console.log(req);
  factual.get('/t/places-us', {
    q: place,
    filters: {
      region: region,
      locality: locality
    },
  }, function(err, result) {
    res.send(result.data);
  });
};

exports.searchCrosswalk = function(req, res) {
  var id = req.query.id;
  console.log('factual id: ', id);
  factual.get('/t/crosswalk?filters={"factual_id":"' + id + '"}&limit=50', function(err, result) {
    res.send(result);
  });
};

/* factual.get('http://api.v3.factual.com/t/crosswalk-us?q=the container store', function (err, res) {
  if (err) { console.log(err); }
  console.log(res.data);
});
*/

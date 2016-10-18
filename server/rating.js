var db = require('./db/index')

exports.submit = function(req, res) {
  db.submitRatings(req, function(submitted) {
    res.send(submitted);
  });
};

exports.check = function(req, res) {
  db.checkRatings(req, function(result) {
    console.log('result from db is: ', result);
    res.send(result);
  });
}

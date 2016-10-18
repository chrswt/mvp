var db = require('./db/index')

exports.submit = function(req, res) {
  db.submitRatings(req, function(submitted) {
    console.log('submitted: ', submitted);
    res.send(submitted);
  })
};

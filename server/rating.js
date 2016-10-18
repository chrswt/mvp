var db = require('./db/index')

exports.submit = function(req, res) {
  var username = req.query.username;
  var business = req.query.bizName;
  var rating = req.query.rating;
  var comparisons = req.query.comparisons;

  console.log(username, business, rating, comparisons);

  db.submitRatings(req, function(submitted) {
    res.send(submitted);
  })
};

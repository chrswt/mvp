var db = require('./db/index');

exports.login = function(req, res) {
  db.checkUserCredentials(req, function(verified) {
    res.send(verified);
  });
};

exports.register = function(req, res) {
  db.createUser(req, function(done) {
    res.send(done);
  });
};

exports.logout = function(req, res) {
  // destroy session
};

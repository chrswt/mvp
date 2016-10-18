var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  user: 'root',
  password: 'root',
  database: 'rex'
});

module.exports = {
  createUser: function(req, callback) {
    var username = req.query.username;
    var password = req.query.password;

    var findExisting = 'SELECT * FROM users ' +
      'WHERE username = "' + username + '"';
    var insertUser = 'INSERT INTO users (username, password) ' +
      'VALUES ("' + username + '", "' + password + '");';
    console.log(username, password);

    dbConnection.query(findExisting, function(err, rows) {
      if (rows.length !== 0) {
        callback(false);
      } else {
        dbConnection.query(insertUser, function(err) {
          if (!err) {
            callback(true);
          } else {
            callback(false);
          }
        });
      }
    });
  },

  checkUserCredentials: function(req, callback) {
    var username = req.query.username;
    var password = req.query.password;

    var userQuery = 'SELECT * FROM users ' +
      'WHERE username = "' + username + '"' +
      'AND password = "' + password + '"';

    dbConnection.query(userQuery, function(err, rows) {
      if (rows.length === 0) {
        callback(false);
      } else {
        callback(true);
      }
    })
  }  
};


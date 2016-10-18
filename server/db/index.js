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
  },

  submitRatings: function(req, callback) {
    var username = req.query.username;
    var business = req.query.bizName;
    var rating = req.query.rating;
    var yelp = req.query.yelp;
    var gogobot = req.query.gogobot;
    var tripadvisor = req.query.tripadvisor;
    var foursquare = req.query.foursquare;
    var urbanspoon = req.query.urbanspoon;
    
    if (yelp === undefined) {
      yelp = null;
    }
    if (gogobot === undefined) {
      gogobot = null;
    }
    if (tripadvisor === undefined) {
      tripadvisor = null;
    }
    if (foursquare === undefined) {
      foursquare = null;
    }
    if (urbanspoon === undefined) {
      urbanspoon = null;
    }

    var insert = 'INSERT INTO ratings (username, business, rating, yelp, foursquare, urbanspoon, tripadvisor, gogobot) ' +
      'VALUES ("' + username + '", "' + business + '", "' +
      rating + '", "' + yelp + '", "' + foursquare + '", "' +
      urbanspoon + '", "' + tripadvisor + '", "' + gogobot + '");';

    dbConnection.query(insert, function(err) {
      if (!err) {
        callback(true);
      } else {
        console.log(err);
        callback(false);
      }
    });
  },

  checkRatings: function(req, callback) {
    console.log('db to do check on: ', req.query.username);
    var username = req.query.username;

    var query = 'SELECT * FROM ratings WHERE username = "' + username + '";';

    dbConnection.query(query, function(err, rows) {
      if (rows.length === 0) {
        console.log('No data available');
        callback(null);
      } else {
        callback(rows);
      }
    })
  }
};


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
    var comparisons = req.query.comparisons;
    var yelp = null;
    var gogobot = null;
    var tripadvisor = null;
    var urbanspoon = null;
    var foursquare = null;

    console.log(Object.keys(comparisons));

    for (var key in comparisons) {
      console.log('key in comparisons', key);
      if (key === 'yelp') {
        console.log('IM GETTING CALLED YELP WHY');
        yelp = comparisons[key].slice(0, 4);
        console.log('YELP IS NOW: ', yelp);
      } else if (key === 'gogobot') {
        gogobot = comparisons[key].slice(0, 4);
      } else if (key === 'tripadvisor') {
        tripadvisor = comparisons[key].slice(0, 4);
      } else if (key === 'urbanspoon') {
        urbanspoon = comparisons[key].slice(0, 4);
      } else if (key === 'foursquare') {
        foursquare = comparisons[key].slice(0, 4);
      }
    }

    console.log(yelp, gogobot, tripadvisor, urbanspoon, foursquare);

    console.log(username, business, rating, comparisons)
  }
};


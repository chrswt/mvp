var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  user: 'root',
  password: 'root',
  database: 'rex'
});

module.exports = {
  createUser: function(req, callback) {
    
  },

  checkUserCredentials: function(req, callback) {

  }  
};


var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  user: 'root',
  password: 'root',
  database: 'rex'
});

module.exports = {
  // list all db query functions here
};


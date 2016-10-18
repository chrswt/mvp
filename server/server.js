var express = require('express');
var app = express();
var session = require('express-session');
var db = require('./db/index');

// API routes configuration
require('./config/routes.js')(app);

// Serve static files from client
app.use(express.static(__dirname + '/../client'));

app.use(session({
  secret: 'hackreactor1',
  saveUninitialized: true,
  resave: false,
  cookie: {
    secure: !true
  }
}));

app.post('/api/register', function(req, res) {
  db.createUser(req, function(done) {
    if (done) {
      req.session.user = req.query.username;
    }
    res.send(done);
  });
});

app.get('/api/logout', function(req, res) {
  req.session.destroy();
  res.send('session ended');
});

app.get('/api/login', function(req, res) {
  db.checkUserCredentials(req, function(validated) {
    if (validated) {
      req.session.user = req.query.username;
    }
    res.send(validated);
  });
})

app.listen(3000);

module.exports = app;

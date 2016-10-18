var express = require('express');
var app = express();
var stormpath = require('express-stormpath');
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
      console.log('requser: ', req.session.user);
    }
    res.send(done);
  });
});

app.get('/api/checkcredentials', function(req, res) {
  console.log('req is user?: ', req.session.user);
  if (req.session.user) {
    console.log('checking req.session.user: ', req.session.user)
    res.send(req.session.user);
  } else {
    res.send(false);
  }
});

app.get('/api/logout', function(req, res) {
  req.session.destroy();
  res.send('session ended');
})

app.listen(3000);

module.exports = app;
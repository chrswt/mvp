var express = require('express');
var app = express();
var stormpath = require('express-stormpath');

// API routes configuration
require('./config/routes.js')(app);

// Serve static files from client
app.use(express.static(__dirname + '/../client'));

app.use(stormpath.init(app, {
  apiKey: {
    id: '2JDDFP2UKZ4MLPCEYWVT6IWR0',
    secret: '6d3zldOU3r+ROn8s7cA8AVfqJAFRacdpP0++C2ntXJM'
  }, application: {
    href: 'https://api.stormpath.com/v1/applications/4BwxovhG4q1uq5vhtx9ura'
  }, expand: {
    customData: true
  }
}));

app.listen(3000);


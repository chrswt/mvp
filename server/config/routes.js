var factual = require('../factual');
var scraper = require('../scraper');
var auth = require('../auth');
var stormpath = require('express-stormpath');

module.exports = function(app) {
  app.get('/api/search', factual.findPlace);
  app.get('/api/crosswalk', factual.searchCrosswalk);
  app.get('/api/crosswalk/scrape', scraper.scrape);
  app.get('/api/getinfo', stormpath.getUser, function(req, res) {
    console.log('hello');
    console.log(req.stormpathSession);
  });
};


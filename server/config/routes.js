var factual = require('../factual');
var scraper = require('../scraper');
var auth = require('../auth');

module.exports = function(app) {
  app.get('/api/search', factual.findPlace);
  app.get('/api/crosswalk', factual.searchCrosswalk);
  app.get('/api/crosswalk/scrape', scraper.scrape);
  // app.post('/api/register', auth.register);
  app.get('/api/login', auth.login);
  app.get('/api/logout', auth.logout);
};


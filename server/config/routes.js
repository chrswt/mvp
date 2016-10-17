var factual = require('../factual');
var scraper = require('../scraper');

module.exports = function(app) {
  app.get('/api/search', factual.findPlace);
  app.get('/api/crosswalk', factual.searchCrosswalk);
  // insert more routes here
  app.get('/api/crosswalk/scrape', scraper.scrape);
};


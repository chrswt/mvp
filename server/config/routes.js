var factual = require('../factual');
var scraper = require('../scraper');
var auth = require('../auth');
var rating = require('../rating');

module.exports = function(app) {
  app.get('/api/search', factual.findPlace);
  app.get('/api/crosswalk', factual.searchCrosswalk);
  app.get('/api/crosswalk/scrape', scraper.scrape);
  app.post('/api/submitrating', rating.submit);
};


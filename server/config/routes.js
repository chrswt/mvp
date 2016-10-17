var factual = require('../factual');

module.exports = function(app) {
  app.get('/api/search', factual.findPlace);
  app.get('/api/crosswalk', factual.searchCrosswalk);
  // insert more routes here
};


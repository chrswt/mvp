var factual = require('../factual');

module.exports = function(app) {
  app.get('/api/search', factual.findPlace);

  // insert more routes here
};


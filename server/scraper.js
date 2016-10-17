exports.scrape = function(req, res) {
  var urls = req.query.urls || req.headers.urls;

  urls.forEach(function(url) {
    if (url.includes('yelp')) {
      console.log('yelp link found: ', url);
    }
  });
};

var yelpScrape = function(url, callback) {
  // implement scraper
  // callback(result)
};

var request = require('request');
var cheerio = require('cheerio');

exports.scrape = function(req, res) {
  var urls = req.query.urls || req.headers.urls;
  
  var ratings = {};
  
  if (urls.length === 1) {
    console.log('length of 1 throws error, handle case later');
  } else {
    urls.forEach(function(url) {

      if (url.includes('yelp')) {
        yelpScrape(url, function(rating) {
          if (!ratings.yelp) {
            ratings.yelp = rating;
            res.send(ratings); // TODO move to lowest rating call
          }
        });
      }
    });
  }
};
  

var yelpScrape = function(url, callback) {
  var rating;

  request(url, function(err, resp, html) {
    if (!err) {
      var $ = cheerio.load(html);
      
      if (!rating) {
        rating = $('.star-img').attr('title');
        if (rating) { // Handles first rating = undefined edge cases
          callback(rating); 
        }
      }
    }
  });
};


var request = require('request');
var cheerio = require('cheerio');

exports.scrape = function(req, res) {
  var urls = req.query.urls || req.headers.urls;
  var count = 0;
  var reqCount = urls.length - 1;
  var ratings = {};
  
  urls.forEach(function(url, i) {

    if (url.includes('yelp')) {
      yelpScrape(url, function(rating) {
        ratings.yelp = rating || ratings.yelp;
        count++;

        if (count === reqCount) {
          res.send(ratings);
        }

      });
    } else if (url.includes('foursquare')) {
      foursquareScrape(url, function(rating) {
        ratings.foursquare = rating || ratings.foursquare;
        count++;

        if (count === reqCount) {
          res.send(ratings);
        }

      });
    } else if (url.includes('tripadvisor')) {
      tripadvisorScrape(url, function(rating) {
        ratings.tripadvisor = rating || ratings.tripadvisor;
        count++;

        if (count === reqCount) {
          res.send(ratings);
        }
      
      });
    } else if (url.includes('urbanspoon')) {
      urbanspoonScrape(url, function(rating) {
        ratings.urbanspoon = rating || ratings.urbanspoon;
        count++;

        if (count === reqCount) {
          res.send(ratings);
        }
        
      });
    } else if (url.includes('gogobot')) {
      gogobotScrape(url, function(rating) {
        ratings.gogobot = rating || ratings.gogobot;
        count++;

        if (count === reqCount) {
          res.send(ratings);
        }

      });
    }
  });
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

var foursquareScrape = function(url, callback) {
  var rating;

  request(url, function(err, resp, html) {
    if (!err) {
      var $ = cheerio.load(html);

      if (!rating) {
        rating = $('.venueScore').attr('title');
        if (rating) {
          callback(rating);
        }
      }
    }
  });
};

var tripadvisorScrape = function(url, callback) {
  var rating;

  request(url, function(err, resp, html) {
    if (!err) {
      var $ = cheerio.load(html);

      if (!rating) {
        rating = $('.sprite-rating_rr_fill').attr('alt');
        if (rating) {
          callback(rating);
        }
      }
    }
  });
};

var urbanspoonScrape = function(url, callback) {
  var rating;

  request(url, function(err, resp, html) {
    if (!err) {
      var $ = cheerio.load(html);

      if (!rating) {
        rating = $('.rating-div').text()
        .replace(/\s+/g, '')
        .replace(/\n/g, ',');
        if (rating) {
          callback(rating);
        }
      }
    }
  });
};

var gogobotScrape = function(url, callback) {
  var rating;

  request(url, function(err, resp, html) {
    if (!err) {
      var $ = cheerio.load(html);

      if (!rating) {
        if ($('.average')[0]) {
          rating = $('.average')[0].attribs.title;
          if (rating) {
            callback(rating);
          }
        }
      }
    }
  });
};

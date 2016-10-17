var request = require('request');
var cheerio = require('cheerio');

exports.scrape = function(req, res) {
  var urls = req.query.urls || req.headers.urls;
  
  var ratings = {};
  
  urls.forEach(function(url, i) {

    if (url.includes('yelp')) {
      yelpScrape(url, function(rating) {
        if (!ratings.yelp) {
          ratings.yelp = rating;
          console.log(ratings);
          if (i === urls.length - 1) {
            res.send(ratings);
          }
        }
      });
    } else if (url.includes('foursquare')) {
      foursquareScrape(url, function(rating) {
        if (!ratings.foursquare) {
          ratings.foursquare = rating;
          console.log(ratings);
          if (i === urls.length - 1) {
            res.send(ratings);
          }
        }
      });
    } else if (url.includes('tripadvisor')) {
      tripadvisorScrape(url, function(rating) {
        if (!ratings.tripadvisor) {
          ratings.tripadvisor = rating;
          console.log(ratings);
          if (i === urls.length - 1) {
            res.send(ratings);
          }
        }
      });
    } else if (url.includes('urbanspoon')) {
      urbanspoonScrape(url, function(rating) {
        if (!ratings.urbanspoon) {
          ratings.urbanspoon = rating;
          console.log(ratings);
          if (i === urls.length - 1) {
            res.send(ratings);
          }
        }
      });
    } else if (url.includes('zagat')) {

    } else if (url.includes('gogobot')) {

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

var zagatScrape = function(url, callback) {
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

var gogobotScrape = function(url, callback) {
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

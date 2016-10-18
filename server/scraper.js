var request = require('request');
var cheerio = require('cheerio');
var each = require('async-each');

exports.scrape = function(req, res) {
  var urls = req.query.urls || req.headers.urls;
  var count = 0;
  var reqCount = urls.length - 1;
  var ratings = {};
  
  each(urls, function(url, i) {

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
    console.log('yelp has left to scrape');
    if (!err) {
      var $ = cheerio.load(html);
     
      if (!rating) {
        rating = $('.star-img').attr('title');
        if (rating) { // Handles first rating = undefined edge cases
          console.log('yelp has returned');
          callback(rating); 
        }
      }
    } else {
      callback('Error scraping Yelp');
    }
  });
};

var foursquareScrape = function(url, callback) {
  var rating;
  
  request(url, function(err, resp, html) {
    console.log('foursquare has left to scrape');
    if (!err) {
      var $ = cheerio.load(html);

      if (!rating) {
        rating = $('.venueScore').attr('title');
        if (rating) {
          console.log('foursquare has returned');
          callback(rating);
        }
      }
    } else {
      callback('Error scraping Foursquare');
    }
  });
};

var tripadvisorScrape = function(url, callback) {
  var rating;

  request(url, function(err, resp, html) {
    console.log('tripadvisor has left to scrape');
    if (!err) {
      var $ = cheerio.load(html);

      if (!rating) {
        rating = $('.sprite-rating_rr_fill').attr('alt');
        if (rating) {
          console.log('tripadvisor has returned');
          callback(rating);
        }
      }
    } else {
      callback('Error scraping TripAdvisor');
    }
  });
};

var urbanspoonScrape = function(url, callback) {
  var rating;

  request(url, function(err, resp, html) {
    console.log('urbanspoon has left to scrape');
    if (!err) {
      var $ = cheerio.load(html);

      if (!rating) {
        rating = $('.rating-div').text()
        .replace(/\s+/g, '')
        .replace(/\n/g, ',');
        if (rating) {
          console.log('urbanspoon has returned');
          callback(rating);
        }
      }
    } else {
      callback('Error scraping UrbanSpoon');
    }
  });
};

var gogobotScrape = function(url, callback) {
  var rating;

  request(url, function(err, resp, html) {
    console.log('gogobot has left to scrape');
    if (!err) {
      var $ = cheerio.load(html);

      if (!rating) {
        if ($('.average')[0]) {
          rating = $('.average')[0].attribs.title;
          if (rating) {
            console.log('gogobot has returned');
            callback(rating);
          }
        }
      }
    } else {
      callback('Error scraping GogoBot');
    }
  });
};

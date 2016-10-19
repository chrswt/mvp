var db = require('./db/index')

exports.submit = function(req, res) {
  db.submitRatings(req, function(submitted) {
    res.send(submitted);
  });
};

exports.check = function(req, res) {
  db.checkRatings(req, function(result) {
    var userRatings = [];
    var yelpRatings = [];
    var foursquareRatings = [];
    var urbanspoonRatings = [];
    var tripadvisorRatings = [];
    var gogobotRatings = [];

    var yelpDiff;
    var foursquareDiff;
    var urbanspoonDiff;
    var tripadvisorDiff;
    var gogobotDiff;

    var analyzedResults = {};

    var absDiff;
    var count;

    result.forEach(function(instance) {
      userRatings.push(instance.rating);
      yelpRatings.push(+instance.yelp || null);
      foursquareRatings.push(+instance.foursquare || null);
      urbanspoonRatings.push(+instance.urbanspoon || null);
      tripadvisorRatings.push(+instance.tripadvisor || null);
      gogobotRatings.push(+instance.gogobot || null);
    });

    console.log(userRatings);
    console.log(yelpRatings);
    console.log(foursquareRatings);

    // Calculating yelp similarity
    absDiff = 0;
    count = 0;

    yelpRatings.forEach(function(rating, i) {
      if (rating !== null && userRatings[i]) {
        count++;
        absDiff += Math.abs(rating - userRatings[i])
      }
    });

    yelpDiff = 1 - (absDiff / count);
    analyzedResults.yelp = parseFloat(yelpDiff).toFixed(2);

    // Calculating foursquare similarity
    absDiff = 0;
    count = 0;

    foursquareRatings.forEach(function(rating, i) {
      if (rating !== null && userRatings[i]) {
        count++;
        absDiff += Math.abs(rating - userRatings[i])
      }
    });

    foursquareDiff = 1 - (absDiff / count);
    analyzedResults.foursquare = parseFloat(foursquareDiff).toFixed(2);;

    // Calculating urbanspoon similarity
    absDiff = 0;
    count = 0;

    urbanspoonRatings.forEach(function(rating, i) {
      if (rating !== null && userRatings[i]) {
        count++;
        absDiff += Math.abs(rating - userRatings[i])
      }
    });

    urbanspoonDiff = 1 - (absDiff / count);
    analyzedResults.urbanspoon = parseFloat(urbanspoonDiff).toFixed(2);

    // Calculating tripadvisor similarity
    tripadvisorRatings.forEach(function(rating, i) {
      if (rating !== null && userRatings[i]) {
        count++;
        absDiff += Math.abs(rating - userRatings[i])
      }
    });

    tripadvisorDiff = 1 - (absDiff / count);
    analyzedResults.tripadvisor = parseFloat(tripadvisorDiff).toFixed(2);;

    // Calculating gogobot similarity
    gogobotRatings.forEach(function(rating, i) {
      if (rating !== null && userRatings[i]) {
        count++;
        absDiff += Math.abs(rating - userRatings[i])
      }
    });

    gogobotDiff = 1 - (absDiff / count);
    analyzedResults.gogobot = parseFloat(gogobotDiff).toFixed(2);;

    console.log(analyzedResults);

    res.send(analyzedResults);
  });
}

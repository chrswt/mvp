angular.module('rex.services', [])

.factory('Search', function($http) {

  var findInstances = function(query) {
    return $http({
      method: 'GET',
      url: '/api/search',
      params: {place: query}
    })
    .then(function(res) {
      return res.data;
    });
  };

  var retrieveCrosswalk = function(id) {
    return $http({
      method: 'GET',
      url: '/api/crosswalk',
      params: {id: id}
    })
    .then(function(res) {
      return res.data;
    });
  };

  var scrapeAll = function(urls) {
    return $http({
      method: 'GET',
      url: 'api/crosswalk/scrape',
      params: {urls: urls}
    })
    .then(function(res) {
      return res.data;
    });
  };

  return {
    findInstances: findInstances,
    retrieveCrosswalk: retrieveCrosswalk,
    scrapeAll: scrapeAll
  };

})

.factory('Auth', function($http) {
  var register = function(username, password) {
    return $http({
      method: 'POST',
      url: '/api/register',
      params: {
        username: username,
        password: password
      }
    }).then(function(res) {
      return res.data;
    });
  };

  var login = function(username, password) {
    return $http({
      method: 'GET',
      url: '/api/login',
      params: {
        username: username,
        password: password
      }
    }).then(function(res) {
      return res.data;
    });
  };

  var logout = function() {
    console.log('factory logout');
    return $http({
      method: 'GET',
      url: '/api/logout'
    }).then(function(res) {
      return res;
    });
  };

  return {
    register: register,
    login: login,
    logout: logout
  };

})

.factory('Rating', function($http) {
  var submitRating = function(bizName, username, rating, comparisons) {
    if (comparisons.yelp) {
      var yelp = comparisons.yelp.slice(0, 4);
    } else {
      var yelp = null;
    }

   if (comparisons.gogobot) {
     var gogobot = comparisons.gogobot.slice(0, 4);
   } else {
     var gogobot = null;
   }

   if (comparisons.tripadvisor) {
     var tripadvisor = comparisons.tripadvisor.slice(0, 4);
   } else {
     var tripadvisor = null;
   }

   if (comparisons.foursquare) {
     var foursquare = comparisons.foursquare.slice(0, 3) / 2;
   } else {
     var foursquare = null;
   }

   if (comparisons.urbanspoon) {
     var urbanspoon = comparisons.urbanspoon.slice(0, 3);
   } else {
     var urbanspoon = null;
   }

    return $http({
      method: 'POST',
      url: '/api/submitrating',
      params: {
        bizName: bizName,
        username: username,
        rating: rating,
        yelp: yelp,
        gogobot: gogobot,
        tripadvisor: tripadvisor,
        foursquare: foursquare,
        urbanspoon: urbanspoon
      }
    }).then(function(res) {
      return res.data;
    });
  };

  var analyze = function(username) {
    return $http({
      method: 'GET',
      url: '/api/analyze',
      params: {
        username: username
      }
    }).then(function(res) {
      return res.data;
    });
  };

  return {
    submitRating: submitRating
    analyze: analyze;
  };
});

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
  var submitRating = function(bizName, username, rating) {
    console.log('rating submitted for: ', bizName, username, rating);
    return $http({
      method: 'POST',
      url: '/api/submitrating',
      params: {
        bizName: bizName,
        username: username,
        rating: rating
      }
    }).then(function(res) {
      return res.data
    })
  };

  return {
    submitRating: submitRating
  };
});

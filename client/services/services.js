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

});

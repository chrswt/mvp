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
    console.log('calling retrieve crosswalk services.js');
    return $http({
      method: 'GET',
      url: '/api/crosswalk',
      params: {id: id}
    })
    .then(function(res) {
      return res.data;
    });
  };

  return {
    findInstances: findInstances,
    retrieveCrosswalk: retrieveCrosswalk
  };

});

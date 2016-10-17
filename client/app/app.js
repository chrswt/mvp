angular.module('rex', [
  'rex.services'
])

.controller('searchController', function($scope, Search) {
  $scope.candidates = [];

  $scope.findInstances = function(query) {
    Search.findInstances(query)
    .then(function(res) {
      console.log('receiving response in app.js: ', res);
      $scope.candidates.push(res);
      console.log('candidates: ', $scope.candidates);
    })
  };
});

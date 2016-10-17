angular.module('rex', [
  'rex.services'
])

.controller('searchController', function($scope, Search) {
  $scope.candidates = [];
  $scope.result = [];

  $scope.findInstances = function(query) {
    Search.findInstances(query)
    .then(function(res) {
      console.log('receiving response in app.js: ', res);
      $scope.candidates.push(res);
      console.log('candidates: ', $scope.candidates);
    });
  };

  $scope.searchCrosswalk = function(id) {
    Search.retrieveCrosswalk(id)
    .then(function(res) {
      console.log('receiving response in app.js: ', res);
      $scope.result.push(res);
      console.log('results: ', $scope.result);
    })
  }
})

.directive('ngSearchResults', function() {
  return {
    template:  
      '<div ng-click="searchCrosswalk(candidate.factual_id)">Name: {{candidate.name}}</div>' +
      '<div>Factual ID: {{candidate.factual_id}}</div>' +
      '<div>Address: {{candidate.address}}</div>' +
      '<div>Location: {{candidate.locality}}</div>' +
      '<div>Neighborhoods:' +
        '<div ng-repeat="neighborhood in candidate.neighborhood">{{neighborhood}}</div>' +
      '</div>'
  };
});

angular.module('rex', [
  'rex.services'
])

.controller('searchController', function($scope, Search) {
  $scope.candidates = [];
  $scope.places = [];

  $scope.findInstances = function(query) {
    Search.findInstances(query)
    .then(function(res) {
      $scope.candidates.push(res);
      console.log('candidates: ', $scope.candidates);
    });
  };

  $scope.searchCrosswalk = function(id) {
    var results = [];
    var current;
    var urlsToScrape = [];
    Search.retrieveCrosswalk(id)
    .then(function(res) {
      results.push(res);
      current = results[results.length - 1];

      current.data.forEach(function(xwalk) {
        if (xwalk.namespace === 'zagat' ||
          xwalk.namespace === 'gogobot' ||
          xwalk.namespace === 'yelp' ||
          xwalk.namespace === 'tripadvisor' ||
          xwalk.namespace === 'urbanspoon' ||
          xwalk.namespace === 'facebook' ||
          xwalk.namespace === 'foursquare') {
          urlsToScrape.push(xwalk.url);
        }
      });
      
      Search.scrapeAll(urlsToScrape)
      .then(function(result) {
        console.log(result);
      });
      // for each url, pass through scraper and find function
    });
  };
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

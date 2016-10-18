angular.module('rex', [
  'rex.services'
])

.controller('searchController', function($scope, Search) {
  $scope.candidates = [];
  $scope.places = [];
  $scope.candidateName;
  $scope.candidateGeneration = true;
  $scope.candidateView = false;

  $scope.findInstances = function(query) {
    $scope.candidateGeneration = true;
    $scope.candidateView = false;

    Search.findInstances(query)
    .then(function(res) {
      $scope.candidates.push(res);
      console.log('candidates: ', $scope.candidates);
    });
  };

  $scope.searchCrosswalk = function(id, name) {
    $scope.candidateGeneration = false;
    $scope.candidateView = true;

    $scope.candidateName = name;
    var results = [];
    var current;
    var urlsToScrape = [];

    Search.retrieveCrosswalk(id)
    .then(function(res) {
      results.push(res);
      current = results[results.length - 1];

      current.data.forEach(function(xwalk) {
        if (
          xwalk.namespace === 'gogobot' ||
          xwalk.namespace === 'yelp' ||
          xwalk.namespace === 'tripadvisor' ||
          xwalk.namespace === 'urbanspoon' ||
          xwalk.namespace === 'foursquare'
        ) {
          urlsToScrape.push(xwalk.url);
        }
      });
      
      console.log('urls to scrape: ', urlsToScrape);
      if (urlsToScrape.length <= 1) {
        $scope.places = {
          error: 'We could not find any review sites for this business!'
        }
      } else { // TODO generate loading gif
        $scope.places = {
          loading: 'We are processing your request'
        }
        Search.scrapeAll(urlsToScrape)
        .then(function(result) {
          console.log('ratings object: ', result);
          $scope.places = result;
        });
      }
    });
  };
})

.directive('ngSearchResults', function() {
  return {
    template:
      '<div class="candidates-container">' +
        '<div ng-click="searchCrosswalk(candidate.factual_id, candidate.name)">Name: {{candidate.name}}</div>' +
        '<div>Factual ID: {{candidate.factual_id}}</div>' +
        '<div>Address: {{candidate.address}}</div>' +
        '<div>Location: {{candidate.locality}}</div>' +
        '<div>Neighborhoods:' +
          '<div ng-repeat="neighborhood in candidate.neighborhood">{{neighborhood}}</div>' +
        '</div>' + 
      '</div>'
  };
})

.directive('ngCrosswalkResults', function() {
  return {
    template:
      '<div class="results-container">' +
        '<div ng-if="$index === 0">{{$parent.candidateName}}</div>' +
        '<div>{{key}}</div>' +
        '<div>{{value}}</div>' +
      '</div>'
  };
});

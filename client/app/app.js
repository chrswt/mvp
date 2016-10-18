angular.module('rex', [
  'rex.services',
  'angular-loading-bar',
  'ngAnimate',
  'ui.router'
])

.config(function($stateProvider) {
  $stateProvider
    .state('register', {
      templateUrl: 'app/auth/register.html',
      controller: 'authController'
    })

    .state('login', {
      templateUrl: 'app/auth/login.html',
      controller: 'authController'
    })

    .state('home', {
      template: '',
      controller: 'authController'
    });
})

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

.controller('authController', function($scope, Auth) {
  $scope.register = function(user, pass) {
    Auth.register(user, pass)
    .then(function(res) {
      console.log('registration done: ', res);
    })
  }
})

.directive('ngSearchResults', function() {
  return {
    template:
      '<div class="candidates-container">' +
        '<div class="candidate-name" ng-click="searchCrosswalk(candidate.factual_id, candidate.name)">{{candidate.name}}</div>' +
        '<div class="candidate-address">{{candidate.address}}</div>' +
        '<div class="candidate-address">{{candidate.locality}}</div>' +
        '<div class="candidate-neighborhoods">' +
          '<div ng-repeat="neighborhood in candidate.neighborhood">{{neighborhood}}</div>' +
        '</div>' + 
      '</div>'
  };
})

.directive('ngCrosswalkResults', function() {
  return {
    template:
      '<div class="results-container">' +
        '<div class="results-name" ng-if="$index === 0">{{$parent.candidateName}}</div>' +
        '<div class="rating-site">' +
          '<div class="rate">{{key}}</div>' +
          '<div class="rate">{{value}}</div>' +
        '</div>' +
      '</div>'
  };
});

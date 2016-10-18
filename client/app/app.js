angular.module('rex', [
  'rex.services',
  'angular-loading-bar',
  'ngAnimate',
  'ui.router',
  'jkAngularRatingStars',
  'angularCharts'
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
      template: '<div></div>',
      controller: 'authController'
    });
})

.controller('searchController', function($scope, Search, $rootScope, Rating) {
  $scope.candidates = [];
  $scope.places = [];
  $scope.candidateName;
  $rootScope.candidateGeneration = false;
  $rootScope.candidateView = false;
  $rootScope.analysisView = true;
  $rootScope.analysis;

  $scope.findInstances = function(query) {
    $rootScope.candidateGeneration = true;
    $rootScope.candidateView = false;
    $rootScope.analysisView = false;

    Search.findInstances(query)
    .then(function(res) {
      $scope.candidates.push(res);
    });
  };

  $scope.searchCrosswalk = function(id, name) {
    $rootScope.candidateGeneration = false;
    $rootScope.candidateView = true;
    $rootScope.analysisView = false;

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
      
      if (urlsToScrape.length <= 1) {
        $scope.places = {
          ERROR: 'We could not find any review sites for this business!'
        }
      } else {
        $scope.places = {
          LOADING: 'We are processing your request'
        }
        Search.scrapeAll(urlsToScrape)
        .then(function(result) {
          $scope.places = result;

        });
      }
    });
  };

  $scope.submitRating = function(rating) {
    if (!$rootScope.user) {
      alert('You must login to save your ratings!');
    } else {
      if (!$scope.places) {
        alert('Please wait for our scrapers to complete their work :)');
      }
      Rating.submitRating($scope.candidateName, $rootScope.user, rating, $scope.places);
    }
  };

  $scope.analyzeRatings = function(username) {
    $rootScope.candidateGeneration = false;
    $rootScope.candidateView = false;
    $rootScope.analysisView = true;

    Rating.analyze(username)
    .then(function(result) {
      $rootScope.analysis = result;
      console.log($rootScope.analysis);
    });
  };
})

//   $scope.config = {
//       title: 'Products',
//       tooltips: true,
//       labels: false,
//       mouseover: function() {},
//       mouseout: function() {},
//       click: function() {},
//       legend: {
//         display: true,
//         //could be 'left, right'
//         position: 'right'
//       }
//     };

//   $scope.data = {
//     series: ['Sales', 'Income', 'Expense', 'Laptops', 'Keyboards'],
//     data: [{
//       x: "Laptops",
//       y: [100, 500, 0],
//       tooltip: "this is tooltip"
//     }, {
//       x: "Desktops",
//       y: [300, 100, 100]
//     }, {
//       x: "Mobiles",
//       y: [351]
//     }, {
//       x: "Tablets",
//       y: [54, 0, 879]
//     }]
//   };
// })

.controller('authController', function($scope, $rootScope, Auth) {
  $rootScope.user;

  $scope.register = function(user, pass) {
    Auth.register(user, pass)
    .then(function(res) {
      if (res) {
        $rootScope.user = user;
      } else {
        alert('This username is taken!');
      }
    });
  };

  $scope.logout = function() {
    Auth.logout()
    .then(function(res) {
      $rootScope.user = undefined;
    });
  };

  $scope.login = function(user, pass) {
    Auth.login(user, pass)
    .then(function(res) {
      if (res) {
        $rootScope.user = user;
      } else {
        alert('Login credentials invalid!');
      }
    });
  };
})

.directive('ngSearchResults', function() {
  return {
    template:
      '<div class="candidates-container">' +
        '<div class="candidate-name" ng-click="searchCrosswalk(candidate.factual_id, candidate.name)">{{candidate.name}}</div>' +
        '<div class="candidate-address">{{candidate.address}}</div>' +
        '<div class="candidate-address">{{candidate.locality}}</div>' +
        '<div class="candidate-address">{{candidate.tel}}</div>' +
        '<div>{{candidate.hours_display}}</div>' +
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
        '<div class="results-name" ng-if="$index === 0">{{$parent.candidateName}}' + 
          '<jk-rating-stars max-rating="5" on-rating="submitRating(rating)" ></jk-rating-stars></div>' +
          '<div class="rating-site">' +
            '<div class="rate">{{key}}</div>' +
            '<div class="rate">{{value}}</div>' +
          '</div>' +
        '</div>'
  };
})

.directive('ngAnalysisResults', function() {
  return {
    template:
      '<div class="analysis-container">' +
        '<div class="analysis-result">{{key}}</div>' +
        '<div class="analysis-result">{{value}}</div>' + '</div>'
      //   '<div data-ac-chart="\'bar\'"data-ac-data="data"data-ac-config="config" class="chart"></div>' +
      // '</div>'
  };
})

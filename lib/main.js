var app = angular.module('LeagueApp', ['ngRoute']);
//var summonerName = document.getElementById('summonerBox');

// Routes
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    controller: 'ListController',
    templateUrl: 'templates/home.html',
  }).when('/interests', {
    controller: 'InterestsController',
    templateUrl: 'templates/interests.html',
  });
}]);
// Controllers
app.controller('ListController', ['$scope', '$window', '$http', 'LeagueService', function($scope, $window, $http, LeagueService) {
  $scope.champions = {};



  $scope.searchSummoner = function() {
    LeagueService.staticChampions().then(function(response) {
      for (var value in response.data.data) {
        var champion = response.data.data[value];
        $scope.champions[champion.id] = champion.key;
      }
    });
    LeagueService.summonerByName($scope.summonerText).then(function(responseData) {




      let summonerId = responseData.data[$scope.summonerText].id;
      // make your second api call
      return $http({
        method: 'GET',
        url: `https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/${summonerId}/recent?api_key=8a3ef1e8-ec3b-4495-84fd-a906c21cb24a`
      });
    }).then(function(summonerData) {
      //  angular.copy(response.data.leagues, summonerCache);
      //  return response;
      console.log(summonerData);

      $scope.matches = summonerData.data.games;
      $scope.stats = summonerData.data.games.stats;

    });


  };
}]);

// directives
// factory
app.factory('LeagueService', function($http) {
  let idCache = {};
  let summonerCache = [];
  let championCache = {};

  return {


    staticChampions: function() {
      let url = `https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=8a3ef1e8-ec3b-4495-84fd-a906c21cb24a`
      return $http.get(url)

    },
    summonerByName: function(summonerName) {
      let url = `https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/${summonerName}?api_key=8a3ef1e8-ec3b-4495-84fd-a906c21cb24a`
      return $http.get(url);

      // this callback will be called asynchronously
      // when the response is available
      //  }, function errorCallback(response) {
      console.log('FAIL')
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        //  });

    },
    getSummonerId: function(summonerObject, summonerName) {

    }
  };

});

//{{champions[match.championId]}}

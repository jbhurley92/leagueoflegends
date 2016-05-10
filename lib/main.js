var app = angular.module('LeagueApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        controller: 'ListController',
        templateUrl: 'templates/home.html',
    }).when('/interests', {
        controller: 'InterestsController',
        templateUrl: 'templates/interests.html',
		});
}]);

app.controller('ListController', ['$scope', '$window', 'LeagueService', 				function($scope, $window, LeagueService) {
    console.log('working');
    LeagueService.getLeague().then(function (data) {
      console.log(data);
      $scope.leagues= data.data.leagues;

   	});
	 }]);

/*
	 app.controller('InterestsController', ['$scope', 'LeagueService', function ($scope, LeagueService) {

	     $scope.interests = LeagueService.getInterests();

	     $scope.addInterests = function () {
	         LeagueService.addInterests($scope.leagueText);
	         $scope.leagueText = '';
	     };
	 }]);
	 */

	 app.factory('LeagueService', function ($http) {

	    let leagueCache = [];

	    let league = $http({
	       method: 'GET',
	       url: 'https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/37629782?rankedQueues=RANKED_SOLO_5x5&seasons=SEASON2016&api_key=3f148e12-787a-45f5-8f9d-5419fc7b0571'
	    }).then(function (response) {
	       angular.copy(response.data.leagues, leagueCache);
	       return response;
	    });

				return{
					getLeague: function () {
						 return league;
					},
				};

		});

		//https://api.toornament.com/v1/tournaments/{tournament_id}/schedules

		//https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/37629782?rankedQueues=RANKED_SOLO_5x5&seasons=SEASON2016&api_key=3f148e12-787a-45f5-8f9d-5419fc7b0571

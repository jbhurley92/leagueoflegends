var app = angular.module('LeagueApp', ['ngRoute']);
//var summonerName = document.getElementById('summonerBox');

// Routes
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        controller: 'ListController',
        templateUrl: 'templates/home.html',
    }).when('/interests', {
        controller: 'InterestsController',
        templateUrl: 'templates/interests.html',
		});
}]);
// Controllers
app.controller('ListController', ['$scope', '$window', '$http', 'LeagueService', 				function($scope, $window, $http, LeagueService) {
	//$scope.interests = LeagueService.getInterests();

	$scope.searchSummoner = function () {
		LeagueService.summonerByName($scope.summonerText).then(function(responseData){
			console.log(responseData);
			//$scope.summonerObject = responseData.data['huriey'].id;
			let summonerId = responseData.data[$scope.summonerText].id;
			// debugger

			// make your second api call
			//  &seasons=SEASON2016
			return $http({
			 method: 'GET',
			 url:`https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/${summonerId}?rankedQueues=RANKED_SOLO_5x5&api_key=3f148e12-787a-45f5-8f9d-5419fc7b0571`
		 });
	 }).then(function (summonerData) {
			//  angular.copy(response.data.leagues, summonerCache);
			//  return response;
			console.log(summonerData);
			$scope.searchSummoner = function (summoner) {
        $window.open(`${summonerData.data}`,'_blank');
    };
	});


	};
}]);

// directives
// factory
app.factory('LeagueService', function ($http) {
	    let idCache = [];
			let summonerCache = [];

			//  let league2 = $http({
			// 	method: 'GET',
			// 	url:'https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/37629782?rankedQueues=RANKED_SOLO_5x5&seasons=SEASON2016&api_key=3f148e12-787a-45f5-8f9d-5419fc7b0571'
			// }).then(function (response) {
			// 	 angular.copy(response.data.leagues, summonerCache);
			// 	 return response;
			// });

				return{
					summonerByName: function(summonerName){
						let url = `https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/${summonerName}?api_key=3f148e12-787a-45f5-8f9d-5419fc7b0571`
						return $http.get(url);
						//console.log(response.data);

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

		//https://api.toornament.com/v1/tournaments/{tournament_id}/schedules

		//https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/37629782?rankedQueues=RANKED_SOLO_5x5&seasons=SEASON2016&api_key=3f148e12-787a-45f5-8f9d-5419fc7b0571

		//https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/hurIey?api_key=3f148e12-787a-45f5-8f9d-5419fc7b0571

		//https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/${summonerName}?api_key=3f148e12-787a-45f5-8f9d-5419fc7b0571

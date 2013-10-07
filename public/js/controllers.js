'use strict';

/********************************************************/
/* Controllers */

angular.module('yelpz')
  .controller('YelpCtrl', function ($scope, $http) {

	$scope.moods = moods;

	var locale = localStorage.getItem("locale");

	if(!locale){
	getLocale($http, $scope);
	locale = 'Austin';
	}
	getYelp(locale, '', $http, $scope);
	updateLocale($http, $scope);

	$scope.updateYelp = function(index){
		var mood = $scope.moods[index].name
		var city = $scope.locale;
		getYelp(city, mood, $http, $scope);
  	}

  	setupFacebook();
}).controller('appController', ['$scope', function($scope){
	$scope.$on('LOAD', function(){$scope.loading=true;$('.dataTable').fadeTo(0.25);});
	$scope.$on('UNLOAD', function(){$scope.loading=false;$('.dataTable').fadeTo(1);});
}]);

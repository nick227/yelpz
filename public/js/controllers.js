'use strict';

/********************************************************/
/* Controllers */

angular.module('yelpz')
  .controller('YelpCtrl', function ($scope, $http) {

$scope.moods = [
  {name:'casual', checked:false}, 
  {name:'fancy', checked:false}, 
  {name:'intellectual', checked:false}, 
  {name:'experimental', checked:false}, 
  {name:'exciting', checked:false}
];
/********************************************************/
$scope.moodToCats = {
	activities:{
	casual:['amusementparks','fishing','leisure_centers','campgrounds','sportsbars','divebars','poolhalls','movietheaters','mini_golf','videoandgames'],
	fancy:['wineries','spas','boatcharters','champagne_bars','galleries','auctionhouses','gardens','golf','beautysvc','resorts'],
	intellectual:['jazzandblues','opera','careercounseling','pianobars','hobbyshops','museums','culturalcenter','specialtyschools','theater'],
	experimental:['festivals','massage','tattoo','tours','yelpevents','comedyclubs','buddhist_temples','psychic_astrology','taichi','hookah_bars'],
	exciting:['diving','hanggliding','hot_air_balloons','kiteboarding','skydiving','matchmakers','casinos','trampoline','rafting','fireworks']
	},
	dining:{
	casual:['diners','icecream','donuts','sandwiches','pizza','pretzels','foodtrucks','bbq','burgers','comfortfood'],
	fancy:['gourmet','cheese','chocolate','brazilian','fondue','french','persian','tapas','gastropubs','steak'],
	intellectual:['ethnicmarkets','gelato','coffee','cafes','gluten_free','colombian','italian','vegetarian','bagels','salad'],
	experimental:['juicebars','bubbletea','streetvendors','caribbean','mediterranean','soulfood','seafood','raw_food','egyptian','vietnamese'],
	exciting:['farmersmarket','coffee','seafoodmarkets','dimsum','indpak','thai','modern_european','greek','filipino','spanish']
	}
}

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
  	
}).controller('appController', ['$scope', function($scope){
	$scope.$on('LOAD', function(){$scope.loading=true;$('.dataTable').fadeTo(0.25);});
	$scope.$on('UNLOAD', function(){$scope.loading=false;$('.dataTable').fadeTo(1);});
}]);

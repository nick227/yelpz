'use strict';

/********************************************************/
/* Services */

angular.module('yelpz.services', ['truncate']).
  value('version', 'alpha');


var getYelp = function(city, mood, $http, $scope){
	$scope.$emit('LOAD');

	var randomMoodIndex, mood, randomActivityIndex, randomDinnerIndex, randomActivity=[], randomDining=[];

	if(!mood){
	var randomMoodIndex = getRandomInt(0, moods.length),
	mood = moods[randomMoodIndex].name;
	}
	var i=0;
	for(i=0;i<5;i++){
		randomActivityIndex = getRandomInt(0, moodToCats.activities[mood].length),
		randomDinnerIndex = getRandomInt(0, moodToCats.dining[mood].length),
		randomActivity.push(moodToCats.activities[mood][randomActivityIndex]),
		randomDining.push(moodToCats.dining[mood][randomDinnerIndex]);
	}
	$scope.currentMood = mood;
	$scope.locale = city;

	$http({method: 'GET', url: '/api/yelp', params: {city: city, activityTerm:randomActivity.toString(), diningTerm:randomDining.toString()}}).
	success(function(data, status, headers, config) {
	$scope.activites = [];
	$scope.dinings = [];

	var i=0;
	if(!data.activity.businesses || data.activity.businesses.length < 1){
		$scope.dinings.push({name:'no results found!'});
	}else{
  		for(i=0;i<data.activity.businesses.length;i++){
	  		$scope.activites.push(data.activity.businesses[i]);
  			$scope.dinings.push(data.dining.businesses[i]);
  		}
	}
	$scope.$emit('UNLOAD');
  	}).
  	error(function(data, status, headers, config) {
    $scope.activites = ['Error!']
  	});

}  

/********************************************************/
var getLocale = function($http, $scope){

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
    return true;
}else{
	return false;
}

	function success(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
	reverseGeoCode(lat, lng);
	}
	function error(){
		console.log('Something went horribly wrong');
	}
  	function reverseGeoCode(lat, lng) {
  		var geocoder;
		geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(lat, lng);
  
  		geocoder.geocode({'latLng': latlng}, function(results, status) {
    		if (status == google.maps.GeocoderStatus.OK) {
      			if (results[1]) {
      			var locale = results[3].formatted_address.split(','), locale = locale[0];
      			if(locale.indexOf('Austin') < 0){
				getYelp(locale, '', $http, $scope);
      			}
				localStorage.setItem("locale", locale);
      			} else {
        		return false;
      			}
    		} else {
        		return false;
    		}
  		});
	}
}
/********************************************************/
var updateLocale = function($http, $scope){
	
	$(document).ready(function(){
		$.fn.editable.defaults.mode = 'inline';
		$('.locale').editable({
    	type: 'text',
    	title: 'Update City',
    	success: function(response, newValue) {
    		if(!newValue){return false;}
			$scope.locale = newValue;
			localStorage.setItem("locale", newValue);
    		var mood = ($scope.currentMood) ? $scope.currentMood : '';
			getYelp(newValue, mood, $http, $scope);
	    }
	    }).fadeIn();
	});
}
/********************************************************/
var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
/********************************************************/
var setupFacebook = function(){
	(function(d, s, id) {
  	var js, fjs = d.getElementsByTagName(s)[0];
  	if (d.getElementById(id)) return;
  	js = d.createElement(s); js.id = id;
  	js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=414152045353617";
  	fjs.parentNode.insertBefore(js, fjs);
	$('.footer').fadeIn();
	}(document, 'script', 'facebook-jssdk'));
}
/********************************************************/
var moods = [
  {name:'casual', checked:false}, 
  {name:'fancy', checked:false}, 
  {name:'intellectual', checked:false}, 
  {name:'experimental', checked:false}, 
  {name:'exciting', checked:false}
];
/********************************************************/
var moodToCats = {
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
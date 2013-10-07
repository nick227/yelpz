'use strict';

/********************************************************/
/* Public App */

angular.module('yelpz', ['yelpz.filters', 'yelpz.services', 'yelpz.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }]);
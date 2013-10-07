'use strict';

/********************************************************/
/* Directives */


angular.module('yelpz.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

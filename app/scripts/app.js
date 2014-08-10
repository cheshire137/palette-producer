'use strict';

$('body').tooltip({
  selector: '[data-toggle="tooltip"]'
});



/**
 * @ngdoc overview
 * @name paletteApp
 * @description
 * # paletteApp
 *
 * Main module of the application.
 */
var app = angular.module('paletteApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'ngClipboard'
  ]);

app.config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  });
  $routeProvider.otherwise({redirectTo: '/'});
});

app.config(['ngClipProvider', function(ngClipProvider) {
  ngClipProvider.setPath('bower_components/zeroclipboard/dist/ZeroClipboard.swf');
}]);

app.directive('selectOnClick', function () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.on('click', function() { this.select(); });
    }
  };
});

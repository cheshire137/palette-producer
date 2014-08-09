'use strict';

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
    'ngRoute'
  ]);

app.config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  });
  $routeProvider.otherwise({redirectTo: '/'});
});

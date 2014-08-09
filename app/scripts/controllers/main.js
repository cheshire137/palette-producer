'use strict';

/**
 * @ngdoc function
 * @name paletteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the paletteApp
 */
angular.module('paletteApp')
  .controller('MainCtrl', function ($scope) {
    $scope.options = {source_color: '#ff00ff'};
    $scope.palettes = [];

    $scope.make_palettes = function() {
      $scope.palettes.length = 0;
      var base_color = tinycolor($scope.options.source_color).toHsv();
      var scheme_types = ['analogous', 'monochromatic', 'complementary',
                          'split-complementary', 'double-complementary',
                          'triadic'];
      for (var i=0; i<scheme_types.length; i++) {
        $scope.palettes.push(
          Please.make_scheme(base_color,
                             {scheme_type: scheme_types[i],
                              format: 'rgb'})
        );
      }
    };

    $scope.make_palettes();
  });

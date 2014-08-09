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
    $scope.options = {source_color: Please.make_color()};
    $scope.palettes = [];

    $scope.make_palettes = function() {
      $scope.palettes.length = 0;
      var base_color = tinycolor($scope.options.source_color).toHsv();
      var scheme_types = ['analogous', 'monochromatic', 'complementary',
                          'split-complementary', 'double-complementary',
                          'triadic'];
      for (var i=0; i<scheme_types.length; i++) {
        var scheme_type = scheme_types[i];
        var colors = Please.make_scheme(base_color,
                                        {scheme_type: scheme_type,
                                         format: 'rgb'});
        $scope.palettes.push(
          {colors: colors, scheme_type: scheme_type}
        );
      }
    };

    $scope.randomize_source_color = function() {
      $scope.options.source_color = Please.make_color();
      $scope.make_palettes();
    };

    $scope.make_palettes();
  });

'use strict';

/**
 * @ngdoc function
 * @name paletteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the paletteApp
 */
angular.module('paletteApp')
  .controller('MainCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.options = {
      source_color: tinycolor(Please.make_color()).toHex(),
      copy_format: 'hex'
    };
    $scope.toggle = {copy_message: false};
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
                                         format: 'hex'});
        for (var j=0; j<colors.length; j++) {
          colors[j] = tinycolor(colors[j]);
        }
        var palette = {colors: colors, scheme_type: scheme_type};
        $scope.palettes.push(palette);
      }
    };

    $scope.randomize_source_color = function() {
      var color = tinycolor(Please.make_color());
      $scope.options.source_color = $scope.get_color_text(color);
      $scope.make_palettes();
    };

    $scope.get_color_text = function(color) {
      var format = $scope.options.copy_format;
      if (format === 'rgb') {
        return color.toRgbString();
      }
      if (format === 'hex') {
        return color.toHex();
      }
      if (format === 'hsv') {
        return color.toHsvString();
      }
      if (format === 'hex8') {
        return color.toHex8();
      }
      return color.toPercentageRgbString();
    };

    $scope.show_copied_message = function(color) {
      $scope.toggle.copy_message = true;
      $timeout(function() {
        $scope.toggle.copy_message = false;
      }, 1500);
    };

    $scope.make_palettes();
  }]);

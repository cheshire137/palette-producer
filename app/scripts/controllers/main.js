'use strict';

/**
 * @ngdoc function
 * @name paletteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the paletteApp
 */
angular.module('paletteApp')
  .controller('MainCtrl', ['$scope', '$timeout', '$window', function ($scope, $timeout, $window) {
    var get_random_color = function() {
      var colors = [randomColor(), Please.make_color()];
      return tinycolor(colors[Math.floor(Math.random() * colors.length)]);
    };

    $scope.luminosities = ['bright', 'light', 'dark'];
    $scope.hues = ['red', 'orange', 'yellow', 'green', 'blue', 'purple',
                   'pink', 'monochrome'];
    $scope.options = {
      source_color: get_random_color().toHex(), luminosity: 'bright',
      copy_format: 'hex', generate: 'schemes', source_hue: 'red'
    };
    $scope.toggle = {copy_message: false};
    $scope.palettes = [];
    $scope.colors = [];

    $scope.generate_palettes = function() {
      if ($scope.options.generate === 'schemes') {
        $scope.make_schemes();
      } else {
        $scope.make_colors();
      }
    };

    $scope.make_colors = function() {
      $scope.colors.length = 0;
      var raw_colors = randomColor({count: 100, hue: $scope.options.source_hue,
                                    luminosity: $scope.options.luminosity,
                                    format: 'hex'});
      for (var i=0; i<raw_colors.length; i++) {
        $scope.colors.push(tinycolor(raw_colors[i]));
      }
      console.log($scope.colors);
    };

    $scope.make_schemes = function() {
      $scope.palettes.length = 0;
      var base_color = tinycolor($scope.options.source_color).toHsv();
      var scheme_types = ['analogous', 'monochromatic', 'complementary',
                          'split-complementary', 'double-complementary',
                          'triadic'];
      var labels = {
        'analogous': 'Analogous',
        'monochromatic': 'Monochrome',
        'complementary': 'Complement',
        'split-complementary': 'Split Comp.',
        'double-complementary': 'Double Comp.',
        'triadic': 'Triadic'
      };
      for (var i=0; i<scheme_types.length; i++) {
        var scheme_type = scheme_types[i];
        var colors = Please.make_scheme(base_color,
                                        {scheme_type: scheme_type,
                                         format: 'hex'});
        var color_hex_list = [];
        for (var j=0; j<colors.length; j++) {
          colors[j] = tinycolor(colors[j]);
          color_hex_list.push(colors[j].toHex());
        }
        color_hex_list = color_hex_list.join(',');
        var palette = {colors: colors, scheme_type: scheme_type,
                       label: labels[scheme_type],
                       color_hex_list: color_hex_list};
        $scope.palettes.push(palette);
      }
    };

    $scope.$watch('options.copy_format', function() {
      var color = tinycolor($scope.options.source_color);
      $scope.options.source_color = $scope.get_color_text(color);
    });

    $scope.$watch('options.source_color', function() {
      $scope.make_schemes();
    });

    $scope.$watch('options.generate', function() {
      $scope.generate_palettes();
    });

    $scope.$watch('options.source_hue', function() {
      $scope.make_colors();
    });

    $scope.$watch('options.luminosity', function() {
      $scope.make_colors();
    });

    $scope.get_color_list_height = function() {
      return ($(window).height() - $('.color-list').offset().top - $('.footer').outerHeight() - 20) + 'px';
    };

    angular.element($window).bind('resize', function() {
      $('.color-list').each(function() {
        $(this).css('height', $scope.get_color_list_height());
      });
    });

    $scope.randomize = function() {
      if ($scope.options.generate === 'schemes') {
        var color = get_random_color();
        $scope.options.source_color = $scope.get_color_text(color);
      } else {
        $scope.options.luminosity = $scope.luminosities[Math.floor(Math.random() * $scope.luminosities.length)];
        $scope.options.source_hue = $scope.hues[Math.floor(Math.random() * $scope.hues.length)];
      }
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

    $scope.show_copied_message = function() {
      $scope.toggle.copy_message = true;
      $timeout(function() {
        $scope.toggle.copy_message = false;
      }, 1500);
    };
  }]);

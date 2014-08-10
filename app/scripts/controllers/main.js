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
    $scope.active_swatch = {index: undefined};
    $scope.selected_colors = [];
    $scope.toggle = {copy_message: false};
    $scope.scheme_types = ['analogous', 'monochromatic', 'complementary',
                           'split-complementary', 'double-complementary',
                           'triadic'];
    $scope.scheme_labels = {
      'analogous': 'Analogous',
      'monochromatic': 'Monochrome',
      'complementary': 'Complement',
      'split-complementary': 'Split Comp.',
      'double-complementary': 'Double Comp.',
      'triadic': 'Triadic'
    };
    $scope.schemes = [];
    $scope.colors = [];

    $scope.generate_palettes = function() {
      if ($scope.options.generate === 'schemes') {
        $scope.make_schemes();
      } else {
        $scope.make_colors();
      }
    };

    $scope.make_colors = function() {
      var raw_colors = randomColor({count: 114, hue: $scope.options.source_hue,
                                    luminosity: $scope.options.luminosity,
                                    format: 'hex'});
      var cur_num_colors = $scope.colors.length;
      for (var i=0; i<raw_colors.length; i++) {
        var color = tinycolor(raw_colors[i]);
        if (i < cur_num_colors) {
          $scope.colors[i] = color;
        } else {
          $scope.colors.push(color);
        }
      }
    };

    $scope.make_schemes = function() {
      $scope.schemes.length = 0;
      var base_color = tinycolor($scope.options.source_color).toHsv();
      var make_scheme = function(i) {
        var scheme_type = $scope.scheme_types[i];
        var colors = Please.make_scheme(base_color,
                                        {scheme_type: scheme_type,
                                         format: 'hex'});
        var color_hex_list = [];
        for (var j=0; j<colors.length; j++) {
          colors[j] = tinycolor(colors[j]);
          color_hex_list.push(colors[j].toHex());
        }
        color_hex_list = color_hex_list.join(',');
        return {colors: colors, scheme_type: scheme_type,
                label: $scope.scheme_labels[scheme_type],
                color_hex_list: color_hex_list};
      };
      var num_schemes = $scope.schemes.length;
      for (var i=0; i<$scope.scheme_types.length; i++) {
        var scheme = make_scheme(i);
        if (i < num_schemes) {
          $scope.schemes[i] = scheme;
        } else {
          $scope.schemes.push(scheme);
        }
      }
    };

    $scope.$watch('options.copy_format', function() {
      var color = tinycolor($scope.options.source_color);
      $scope.options.source_color = $scope.get_color_text(color);
    });

    $scope.$watch('options.source_color', function() {
      $scope.make_schemes();
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

    var randomize_schemes = function() {
      var color = get_random_color();
      $scope.options.source_color = $scope.get_color_text(color);
    };

    var randomize_colors = function() {
      var cur_luminosity = $scope.options.luminosity;
      var new_luminosity = cur_luminosity;
      var cur_hue = $scope.options.source_hue;
      var new_hue = cur_hue;
      while (new_luminosity === cur_luminosity && new_hue === cur_hue) {
        new_luminosity = $scope.luminosities[Math.floor(Math.random() * $scope.luminosities.length)];
        new_hue = $scope.hues[Math.floor(Math.random() * $scope.hues.length)];
      }
      $scope.options.luminosity = new_luminosity;
      $scope.options.source_hue = new_hue;
    };

    $scope.randomize = function() {
      if ($scope.options.generate === 'schemes') {
        randomize_schemes();
      } else {
        randomize_colors();
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

    var toggle_selected_color = function(color) {
      var index = -1;
      var color_hex = color.toHex();
      for (var i=0; i<$scope.selected_colors.length; i++) {
        if ($scope.selected_colors[i].toHex() === color_hex) {
          index = i;
        }
      }
      if (index > -1) {
        $scope.selected_colors.splice(index, 1);
      } else {
        $scope.selected_colors.push(color);
      }
    };

    $scope.toggle_and_copy_color = function(color) {
      $scope.show_copied_message();
      toggle_selected_color(color);
    };

    $scope.toggle_color = function(color) {
      toggle_selected_color(color);
    };
  }]);

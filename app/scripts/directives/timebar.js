'use strict';

/**
 * @ngdoc directive
 * @name bsb.directive:timeBar
 * @description
 * # timeBar
 */
angular.module('bsb').directive('timeBar', function() {
  var getBarLength = function(bar) {
    return bar[0].offsetWidth;
  };

  return {
    template: '<div></div>',
    restrict: 'E',
    scope: {
      time: '='
    },
    link: function(scope, element) {
      var timer = element.find('div');

      // Watch elapsed time for changes
      scope.$watch(
        function() {
          return scope.time.elapsed;
        },
        function() {
          var percentElapsed = scope.time.elapsed / scope.time.length,
            timerPosition =
              Math.round(getBarLength(element) * percentElapsed) + 'px';

          // Timer position is % time elapsed - timerOffset (so it's centered)
          timer.css('left', timerPosition);
        }
      );
    }
  };
});

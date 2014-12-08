'use strict';

/**
 * @ngdoc directive
 * @name buySellBuyApp.directive:tradeButton
 * @description
 * # tradeButton
 */
angular.module('bsb')
  .directive('tradeButton', ['$document', 'stocks', function ($document, stocks) {

    var trade = function (scope) {
      var change = scope.type === 'buy' ? 1 : -1;

          stocks.trade(change);
      },

      // Sets up listener or shortcut events
      setUpKeyListener = function (scope) {
          var key = scope.type === 'buy' ? 70 : 74;

          angular.element($document).on('keydown', function (event) {
              if (event.keyCode === key) {
                trade(scope);
                scope.$apply();
              }
          })
      };

    return {
      restrict: 'E',
      scope: {
        type: '@'
      },
      link: function (scope) {
        scope.trade = trade.bind(null, scope);

        setUpKeyListener(scope);
      },
      replace: true,
      templateUrl: '../../views/templates/trade-button.html'
    };
  }]);

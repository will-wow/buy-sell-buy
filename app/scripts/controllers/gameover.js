'use strict';

/**
 * @ngdoc function
 * @name bsb.controller:GameoverCtrl
 * @description
 * # GameoverCtrl
 * Controller for the Game Over screen
 */
angular.module('bsb')
  .controller('GameoverCtrl', function ($scope, stocks, market) {
    var lastPrice;

    if (market.prices.length > 0) {
      lastPrice = market.currentPrice();

      $scope.final = stocks.account + (stocks.count * lastPrice);
    }

  });

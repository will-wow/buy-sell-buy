'use strict';

/**
 * @ngdoc function
 * @name buySellBuyApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller for the main game view
 */
angular.module('bsb')
  .controller('GameCtrl', ['$scope', '$interval', 'market', 'stocks', function ($scope, $interval, market, stocks) {
    var stopUpdates;

    /* Chart options */
    $scope.config = {
      refreshDataOnly: true
    };

    $scope.options = {
      chart: {
        type: 'stackedAreaChart',
        height: 300,

        showControls: false,
        showLegend: false,
        showXAxis: false,
        tooltips: false,
        margin : {
          top: 20,
          right: 0,
          bottom: 20,
          left: 40
        },
        color: function () {
          return 'green';
        },
        x: function (d) {return d[0];},
        y: function (d) {return d[1];},
        useVoronoi: false,
        clipEdge: true,
        transitionDuration: 500,
        useInteractiveGuideline: false,
        xAxis: {
          tickFormat: function(d) {
            return d;
          },
          showMaxMin: false
        },
        yAxis: {
          tickFormat: function(d){
            return '$' + d.toFixed(2);
          },
          showMaxMin: false
        }
      }
    };


    $scope.startPlay = function () {
      // run nextPrice every second
      stopUpdates = $interval(function () {
        market.nextPrice();
        // TODO: figure out why this isn't being passed by ref already
        $scope.data[0].values = $scope.prices;
      }, 1000);
    };

    $scope.stopPlay = function () {
      if (stopUpdates) {
        $interval.cancel(stopUpdates);
      }
    };

    $scope.displayPrice = function () {
      var price = market.currentPrice(),
          firstPrice = market.prices[0][1],
          change = Math.round(((price-firstPrice) / firstPrice) * 10000) / 100;

      return '$' + price + ' (' + change + '%)';
    };

    $scope.init = function () {
      // Put prices on scope, and start at a random price
      $scope.data = [{
        key: 'prices',
        values: market.setFirstPrice()
      }];

      $scope.prices = $scope.data[0].values;

      // Starting account balance
      stocks.account = 10000;
      // Starting number of stocks
      stocks.count = 0;
      // Connect to stocks service to get account, price, and trade() on scope
      $scope.stocks = stocks;

      $scope.startPlay();
    };

    $scope.init();
  }]);

'use strict';

/**
 * @ngdoc function
 * @name buySellBuyApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller for the main game view
 */
angular.module('bsb')
  .controller('GameCtrl', function ($scope, $interval, $timeout, $location, market, stocks, words) {
    var stopUpdates,
        stopTimeout,
        STARTING_DOLLARS = 10000,
        TURN_LENGTH = 1000, // 1 second turn
        GAME_LENGTH = 90000; // 1.5 minute game


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
        transitionDuration: 250,
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

    $scope.paused = false;

    $scope.time = {
      length: GAME_LENGTH,
      elapsed: 0
    };

    $scope.startPlay = function () {
      // run nextPrice every second
      stopUpdates = $interval(function () {
        market.nextPrice();

        if (market.currentPrice() > 0) {
          // Continue if the price is positive
          // TODO: figure out why this isn't being passed by ref already
          $scope.data[0].values = $scope.prices;

          // increment the time elapsed
          $scope.time.elapsed += TURN_LENGTH;
        } else {
          // End if the price goes to $0
          $scope.gameOver();
        }


      }, TURN_LENGTH);

      // End after time is over
      stopTimeout = $timeout($scope.gameOver, GAME_LENGTH - $scope.time.elapsed);

      $scope.paused = false;
    };

    $scope.gameOver = function () {
      $scope.stopPlay();
      $location.url('/game-over');
    };

    $scope.pausePlay = function () {
      // stop play
      $scope.stopPlay();

      $scope.paused = true;
    };

    $scope.stopPlay = function () {
      if (stopUpdates) {
        $interval.cancel(stopUpdates);
      }

      if (stopTimeout) {
        $interval.cancel(stopTimeout);
      }
    };

    $scope.displayPrice = function () {
      var price = market.currentPrice(),
          firstPrice = market.prices[0][1],
          change = Math.round(((price-firstPrice) / firstPrice) * 10000) / 100;

      return '$' + price + ' (' + change + '%)';
    };

    $scope.init = function () {
      words.generateName();

      // Put prices on scope, and start at a random price
      $scope.data = [{
        key: 'prices',
        values: market.setFirstPrice()
      }];

      // Preload the next 9 moves, so there's some data to start with
      for (var i = 0; i < 10; i++) {
        market.nextPrice();
      }

      $scope.prices = $scope.data[0].values;

      // Starting account balance
      stocks.account = STARTING_DOLLARS;
      // Starting number of stocks
      stocks.count = Math.round(STARTING_DOLLARS / market.currentPrice());
      // Connect to stocks service to get account, price, and trade() on scope
      $scope.stocks = stocks;

      $scope.name = words.name;
      $scope.symbol = words.symbol;

      $scope.startPlay();

      // Cancel on exit
      $scope.$on('$destroy', $scope.stopPlay);
    };

    $scope.init();
  });

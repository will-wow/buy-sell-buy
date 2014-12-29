'use strict';

/**
 * @ngdoc service
 * @name buySellBuyApp.market
 * @description
 * # market
 * Factory in the buySellBuyApp.
 */
angular.module('bsb')
  .factory('market', function () {
    // History of prices
    var prices = [],
        // returns the current price
        currentPrice = function () {
            return prices[prices.length - 1][1];
        },
        // rounds to the nearest cent
        roundToCent = function (number) {
            return Math.round(number * 100) / 100;
        },
        // Returns a random number between -1 and 1
        negativeOneToOne = function () {
          return Math.random() * 2 - 1;
        },
        // returns a random number with a normal distribution
        normalDistribution = function (stDev, mean) {
            // Generate a normally distributed number by adding a few random numbers together
            var normallyDistributedRandom = negativeOneToOne() + negativeOneToOne() + negativeOneToOne();

            // Multiply by the standard deviation, and add the mean, to match the distribution
            return normallyDistributedRandom * (stDev || 1) + (mean || 0);
        },

        // Price changing algorithm
        // TODO: something a little more legit
        nextPrice = function () {

            var oldPrice = currentPrice(),
                // Generate a delta
                // This is a normal distribution with mean 0, standard deviation 0.1, plus a 0.01 upward trend
                variance = Math.abs(normalDistribution(0.0075, 0.01)),
                delta = normalDistribution(Math.sqrt(variance), 0.01),
                // calculate the new price
                priceChange = oldPrice * delta;

            // push the rounded, random price to prices
            prices.push([prices.length, roundToCent(oldPrice + priceChange)]);
        },

        // Choose a random price ($0 to $500)
        setFirstPrice = function () {
          prices.length = 0;
          prices.push([0, roundToCent(Math.random() * 100)]);

          return prices;
        };

    return {
        prices: prices,
        roundToCent: roundToCent,
        currentPrice: currentPrice,
        nextPrice: nextPrice,
        setFirstPrice: setFirstPrice
    };
  });

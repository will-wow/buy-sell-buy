'use strict';

/**
 * @ngdoc service
 * @name buySellBuyApp.stocks
 * @description
 * Tracks and changes the user's stock store
 */
angular.module('bsb')
    .factory('stocks', ['market', function (market) {
        // Price for a trade
        // TODO: Make this editable in settings or something?
        var TRADE_PRICE = 4,
            stocks = {
              count: 0,
              account: 0
            };

          // Makes a trade
          stocks.trade = function (change) {
              // Make sure the user doesn't sell more than they own
              change = (change * -1) > this.count ? this.count : change;

              // Make the change for the stocks
              this.count = this.count + change;
              // Make the change to the account, minus the tradePrice
              this.account = this.account - TRADE_PRICE - (change * market.currentPrice());

              console.log(this.account);
          };

        // Public API here
        return stocks;
    }]);

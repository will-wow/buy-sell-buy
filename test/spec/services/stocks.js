'use strict';

describe('Service: stocks', function() {
  // load the service's module
  beforeEach(module('buySellBuyApp'));

  // instantiate service
  var stocks;
  beforeEach(inject(function(_stocks_) {
    stocks = _stocks_;
  }));

  it('should do something', function() {
    expect(!!stocks).toBe(true);
  });
});

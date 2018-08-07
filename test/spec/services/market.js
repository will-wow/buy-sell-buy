'use strict';

describe('Service: market', function() {
  // load the service's module
  beforeEach(module('bsb'));

  // instantiate service
  var market;
  beforeEach(inject(function(_market_) {
    market = _market_;
  }));

  it('should do something', function() {
    expect(!!market).toBe(true);
  });
});

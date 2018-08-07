'use strict';

describe('Directive: tradeButton', function() {
  // load the directive's module
  beforeEach(module('bsb'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<trade-button></trade-button>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tradeButton directive');
  }));
});

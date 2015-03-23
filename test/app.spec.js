'use strict';
describe('MainCtrl', function() {
    var ctrl, scope, counter;

    beforeEach(module('exampleApp'));
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ctrl = $controller("MainCtrl", {$scope: scope});
        counter = 0;
    }));

    describe('scope', function() {
        it('should have a message of "Hello"', function() {
            expect(scope.message).to.equal("Hello");
        });

        it('should be able to increment numbers', function() {
            expect(scope.increment).to.be.a('function');
            expect(scope.increment(5)).to.equal(6);
        });
    });
});

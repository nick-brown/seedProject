'use strict';
describe('main controller', function() {
    var ctrl, scope;

    beforeEach(module('exampleApp'));
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope
        ctrl = $controller("MainCtrl", {$scope: scope});
    }));

    describe('MainCtrl', function() {
        it('should have a message of "Hello"', function() {
            expect(scope.message).toBe("Hello");
        })
    });
});

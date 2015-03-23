'use strict';
describe('MainCtrl', function() {
    var ctrl, scope, counter, backend;

    beforeEach(module('exampleApp'));

    beforeEach(inject(function($httpBackend) {
        backend = $httpBackend;
        backend.expect('GET', '/api/items').respond(
            // data encoded as json automatically
            [
                {name: 'three'},
                {name: 'four'}
            ]);
    }));

    beforeEach(inject(function($controller, $rootScope, $http) {
        scope = $rootScope.$new();
        ctrl = $controller("MainCtrl", {$scope: scope, $http: $http});
        counter = 0;
        backend.flush();
    }));

    describe('scope', function() {
        it('should have a message of "Hello"', function() {
            expect(scope.message).to.equal("Hello");
        });

        it('should be able to increment numbers', function() {
            expect(scope.increment).to.be.a('function');
            expect(scope.increment(5)).to.equal(6);
        });

        it('Makes an Ajax request', function () {
            backend.verifyNoOutstandingExpectation();
        });

        it('Processes the data', function () {
            expect(scope.items).to.exist;
            expect(scope.items).to.have.length(2);
        });

        it('Preserves the order of the data', function() {
            expect(scope.items[0].name).to.equal('three');
            expect(scope.items[1].name).to.equal('four');
        });
    });
});

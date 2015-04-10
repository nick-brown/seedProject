/*globals inject, expect*/
describe('module: controllers', function() {
    var backend;

    beforeEach(module('exampleApp'));

    beforeEach(inject(function($httpBackend) {
        backend = $httpBackend;
    }));

    describe('controller: MainCtrl', function() {
        var ctlr, scope;

        beforeEach(inject(function($controller, $rootScope, $http) {
            scope = $rootScope.$new();
            ctrl = $controller("MainCtrl", {$scope: scope, $http: $http});
            backend.expect('GET', '/api/items').respond(function(method, url, data) {
                return [200, [{name: 'three'}, {name: 'four'}]];
            });
            backend.flush();
        }));

        it('should have a message of "Hello"', function() {
            expect(scope.message).to.equal("Hello");
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

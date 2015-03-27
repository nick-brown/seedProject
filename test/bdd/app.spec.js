/*globals inject, expect*/
describe('MainCtrl', function() {
    'use strict';
    var ctrl, scope, counter, backend;

    beforeEach(module('exampleApp'));

    beforeEach(inject(function($httpBackend) {
        backend = $httpBackend;
        backend.expect('GET', '/api/items').respond(function(method, url, data) {
            return [200, [{name: 'three'}, {name: 'four'}]];
        });
    }));

    beforeEach(inject(function($controller, $rootScope, $http) {
        scope = $rootScope.$new();
        ctrl = $controller("MainCtrl", {$scope: scope, $http: $http});
        counter = 0;
        backend.flush();
    }));

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

describe('Items Service', function() {
    var backend, $httpPostSpy;

    beforeEach(module('exampleApp'));

    beforeEach(inject(function($httpBackend, items, $http) {
        backend = $httpBackend;
        backend.expect('POST', '/api/items').respond(function(method, url, data) {
            return [200, ['okay!']];
        });

        $httpPostSpy = sinon.spy($http, 'post');
    }));

    it('posts items to an endpoint', inject(function(items) {
        var callback = sinon.spy();

        callback.call(this);

        expect(callback).to.have.been.called;
    }));

    it('should spy on postItems', inject(function(items) {
        var obj = {thing: 'stuff'};
        items.postItems(obj);

        expect($httpPostSpy.args[0][1]).to.deep.equal(obj);
        expect($httpPostSpy).to.have.been.called;
    }));

    afterEach(function() {
        $httpPostSpy.restore();        
    });
});

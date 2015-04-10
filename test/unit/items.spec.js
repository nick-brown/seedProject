/*globals inject, expect*/
describe('module: items', function() {
    var backend;

    beforeEach(module('items'));

    beforeEach(inject(function($httpBackend) {
        backend = $httpBackend;
    }));

    describe('Items Service', function() {
        var $httpPostSpy;

        beforeEach(inject(function(items, $http) {
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
});

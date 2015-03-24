/*globals browser, by, element*/
var chai = require('chai')
,   promised = require('chai-as-promised')
,   expect = chai.expect;

chai.use(promised);

describe('exampleApp', function() {
    'use strict';

    beforeEach(function() {
        browser.get('http://localhost:8080/');
    });

    describe('home view', function() {
        it('should have a title', function() {
            expect(browser.getTitle()).to.eventually.equal('Example App');
        });

        it('should have a sub-header', function() {
            var header = element(by.css('h3'));
            expect(header.isPresent()).to.eventually.be.true;
            expect(header.getText()).to.eventually.be.a('string');
        });

        it('should display a welcome message', function() {
            var msg = element(by.binding('message'));
            expect(msg.getText()).to.eventually.equal('Hello');
        });

        it('should allow a user to input their name', function() {
            var input = element(by.model('user.name'));
            expect(input.isPresent()).to.eventually.be.true;
            input.sendKeys('John');
            expect(input.getAttribute('value')).to.eventually.equal('John');
        });
    });
});

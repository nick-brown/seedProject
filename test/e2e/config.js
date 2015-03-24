/*globals global*/
module.exports = function() {
    'use strict';
    var chai = require('chai')
    ,   promised = require('chai-as-promised');

    global.expect = chai.expect;

    chai.use(promised);
}();

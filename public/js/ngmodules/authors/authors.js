module.exports = angular.module('authors', [])
    .service('authorService', function($q, $http, author) {
        'use strict';

        this.getNext = function() {
            return $http.get('/api/authors')
                .then(function(res) {
                    angular.copy(res.data, author);
                    console.log(res.data);
                    return res.data;
                });
        };
    })
    
    .service('author', function() {

    });

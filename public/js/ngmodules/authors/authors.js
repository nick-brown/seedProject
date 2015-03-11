module.exports = angular.module('authors', [])
    .service('authorService', function($q, $http, author, $rootScope) {
        'use strict';

        this.getNext = function() {
            return $http.get('/api/authors')
                .then(function(res) {
                    author.data = res.data;
                    console.log(res.data);

                    return res.data;
                });
        };
    })
    
    .service('author', function() {
        'use strict'; 
    });

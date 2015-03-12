module.exports = (function() {
    'use strict';
    return angular.module('authors', [])
        .service('authorService', function($q, $http, author) {

            var authorService = this;
            authorService.getNext = function() {
                 var prom = $http.get('/api/authors')
                    .then(function(res) {
                        console.log(res.data);
                        angular.copy(res.data, author.data);

                        return res.data;
                    });

                
                if(authorService.lastPromise) {
                    angular.copy(prom, authorService.lastPromise);
                } else {
                    authorService.lastPromise = prom;
                }

                return prom;
            };
        })
        
        .service('author', function() {
            this.data = {};
        })

        .directive('top', function() {
            return {
                restrict: 'E',
                scope: {},
                template: '<div>{{auth.name}}</div>',
                controller: function($scope, author) {
                    $scope.auth = author.data;

                    //authorService.lastPromise.then(function(data) {
                    //    $scope.auth = data;
                    //});
                }
            };
        })
        
        .directive('bottom', function($timeout) {
            return {
                restrict: 'E',
                scope: {},
                template: '<div ng-repeat="book in auth.books">{{book.title}}</div>',
                controller: function($scope, author) {
                    $scope.auth = author.data;
                    $timeout(function() {
                        author.data.name = "Bob!";
                    }, 500);
                }
            };
        });
}());

module.exports = (function() {
    'use strict';
    return angular.module('authors', [])
        .service('authorService', function($q, $http, author) {

            this.getNext = function() {
                return $http.get('/api/authors')
                    .then(function(res) {
                        author.data = res.data;
                        //console.log(res.data);

                        return res.data;
                    });
            };
        })
        
        .service('author', function() {
            this.data = {};
        })

        .directive('top', function() {
            return {
                restrict: 'E',
                template: '<div>{{author.name}}</div>'
            };
        })
        
        .directive('bottom', function() {
            return {
                restrict: 'E',
                template: '<div ng-repeat="book in books">{{book.title}}</div>',
                controller: function($scope, author) {
                    $scope.books = author.data.books;
                }
            };
        });
}());

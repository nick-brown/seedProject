module.exports = angular.module('controllers.main', ['items'])
    .controller('MainCtrl', ['$scope', 'items', function($scope, items) {
        'use strict';
        $scope.message = 'Hello';

        items.fetchItems().then(function(data) {
            $scope.items = data;
        });
    }]);

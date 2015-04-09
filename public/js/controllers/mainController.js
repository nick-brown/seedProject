module.exports = function($scope, products, items) {
    'use strict';

    $scope.message = 'Hello';

    $scope.increment = function(num) {
        return ++num;
    };

    items.fetchItems().then(function(data) {
        $scope.items = data;
    });
};

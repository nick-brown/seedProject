module.exports = angular.module('controllers.main', ['items'])
    .controller('MainCtrl', ['$scope', 'items', function($scope, items) {
        $scope.message = 'Hello';

        items.fetchItems().then(function(data) {
            $scope.items = data;
        });
    }]);

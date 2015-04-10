module.exports = angular.module('controllers.main', [])
    .controller('MainCtrl', ['$scope', function($scope) {
        $scope.message = 'Hello';
    }]);

module.exports = function($scope) {
    'use strict';
    $scope.addUser = function(userDetails) {
        $scope.message = userDetails.name + " (" + userDetails.email +
        ") (" + userDetails.agreed + ")";
    };

    $scope.message = 'Ready';
};

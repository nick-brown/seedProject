module.exports = function($scope) {
    'use strict';
    $scope.todos = [
        { action: "Get groceries", complete: false },
        { action: "Call plumber", complete: false },
        { action: "Buy running shoes", complete: true },
        { action: "Buy flowers", complete: false },
        { action: "Call family", complete: false }
    ];
};

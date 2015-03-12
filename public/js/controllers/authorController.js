module.exports = function($scope, authorService) {
    'use strict';

    window.serve = authorService;

    $scope.nexter = function() {
        authorService.getNext()
            .then(function(data) { 
                $scope.author = data; 
            });
    };

    $scope.nexter();

};

module.exports = function($scope, authorService) {
    'use strict';

    authorService.getNext()
        .then(function(data) { 
            $scope.author = data; 
        });

};

module.exports = function($scope, authorService, author) {
    'use strict';

    $scope.author = author;

    authorService.getNext();
    authorService.getNext();
    authorService.getNext();
        //.then(function(data) {
        //    console.log(data);
        //});

};

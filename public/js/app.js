(function() {
    'use strict';

    require('angular');
    require('angular-route');
    require('./components/tools/tools');

    // Modules
    //===========================================================================

    angular.module('exampleApp', ['ngRoute', 'tools'])


    // Routes
    //===========================================================================

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({
            templateUrl: './js/views/home.html'
        });
    }])
    // Controllers
    //===========================================================================

    .controller('MainCtrl', [
        '$scope',
        require('./controllers/mainController')
    ]);
}());

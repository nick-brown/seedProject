(function() {
    'use strict';

    require('angular');
    require('angular-ui-router');

    // Modules
    //===========================================================================

    angular.module('exampleApp', ['ui.router'])


    // Routes
    //===========================================================================

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: './js/views/home.html'
        });

        $urlRouterProvider.otherwise('home');
    }])
    // Controllers
    //===========================================================================

    .controller('MainCtrl', [
        '$scope',
        require('./controllers/mainController')
    ]);
}());

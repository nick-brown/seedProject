(function() {
    'use strict';

    require('angular');
    require('angular-ui-router');
    require('./ngmodules/products');

    // Modules
    //===========================================================================

    angular.module('exampleApp', ['ui.router', 'products'])


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
        'products',
        require('./controllers/mainController')
    ]);
}());

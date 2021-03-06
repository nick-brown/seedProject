(function() {
    'use strict';

    require('angular');
    require('angular-ui-router');
    require('./ngmodules/items');
    require('./controllers/controllers');


    // Modules
    //===========================================================================

    angular.module('exampleApp', [
        'controllers',
        'ui.router',
        'items'
    ])


    // Routes
    //===========================================================================

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: './js/views/home.html'
        });

        $urlRouterProvider.otherwise('home');
    }]);
}());

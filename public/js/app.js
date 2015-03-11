(function() {
    'use strict';

    require('angular');
    require('angular-ui-router');
    require('./ngmodules/products');
    require('./ngmodules/authors/authors');

    // Modules
    //===========================================================================

    angular.module('exampleApp', ['ui.router', 'products', 'authors'])


    // Routes
    //===========================================================================

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: './js/views/home.html'
            })

            .state('authors', {
                url: '/authors',
                templateUrl: './js/views/authors.html',
                controller: 'AuthorCtrl'
            });

        $urlRouterProvider.otherwise('home');
    }])
    // Controllers
    //===========================================================================

    .controller('MainCtrl', [
        '$scope',
        'products',
        require('./controllers/mainController')
    ])

    .controller('AuthorCtrl', [
        '$scope',
        'authorService',
        'author',
        require('./controllers/authorController')
    ]);
}());

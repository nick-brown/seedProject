(function() {
  'use strict';

  require('angular');
  require('angular-route');

  // Modules
  //===========================================================================
  
  angular.module('exampleApp', ['ngRoute'])


  // Routes
  //===========================================================================
  
  .config(function($routeProvider) {
      $routeProvider.otherwise({
          templateUrl: './js/views/home.html'
      });
  })


  // Controllers
  //===========================================================================
  
  .controller('mainController', [
      '$scope',
      require('./controllers/mainController')
  ]);
}());

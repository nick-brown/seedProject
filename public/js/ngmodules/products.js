module.exports = angular.module('products', [])
    .factory('products', ['$http', '$q', function($http, $q) {
        //var products = $http.get('/api/products')
        //    .then(function(res) {
        //        return res.data;
        //    });

        //return {
        //    data: products
        //};


        var products;

        var getProducts = function() {
          // If we've already cached it, return that one.
          // But return a promise version so it's consistent across invocations
          if ( angular.isDefined( products ) ) return $q.when( products );

          // Otherwise, let's get it the first time and save it for later.
          // return whateverFunctionGetsTheUserTheFirstTime()
          return $http.get('/api/products')
              //.then( function( data ) {
              //  products = data;
              //  return products;
              //});
        };

        // The public API
        return {
          data: products,
          fetch: getProducts
        };
    }]);

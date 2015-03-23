module.exports = function($scope, products) {
    'use strict';

    $scope.message = 'Hello';

    //$scope.products = products.fetch();
    //window.prods = $scope.products;
    //$scope.$watch('products', function(nu, old) {
    //    window.nu = nu;
    //    window.old = old;
    //    console.log('nu', nu);
    //    console.log('old', old);
    //});

    $scope.increment = function(num) {
        return ++num;
    };

    products.fetch().then(function(res) {
        console.log(res.data);
        $scope.products = res.data;
    });
};

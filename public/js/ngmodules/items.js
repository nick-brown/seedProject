module.exports = angular.module('items', [])
    .factory('items', ['$http', function($http) {
        return {
            fetchItems: function() {
                return $http.get('/api/items')
                    .then(function(res) {
                        return res.data;
                    });
            });
        };
    }]);

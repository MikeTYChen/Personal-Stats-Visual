angular
.module('dataService', [])
.factory('Data', function ($http) {
    return {
        get: function () {
            console.log("inside function");
            return $http.get('/api/get.json');
        }
    };
});
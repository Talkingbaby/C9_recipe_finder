var app = angular.module('recipeApp', ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: "index.html"
        })
});
app.controller('mainController', function($http, $log){
    $log.info("I am ready to load!");
    $http({
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?cuisine=french&number=25&license=true',
        headers: {
            'X-mashape-key': 'VpQmAeJYO5msh7bVwZT13pUsanqKp1DU33NjsnvQ9KO5VtnlU9'
        }
    }).then(function successCallback(response) {
        var results = response.data.results;
        $log.info("Response: ", results);
    }, function errorCallback(response) {
        $log.error("Response: ", response);
    });
});

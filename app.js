var app = angular.module('recipeApp', ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: "index.html"
        })
        .when('/recipe-list',{
            templateUrl: "list.html"
        })
        .when('/recipe',{
            templateUrl: "recipe.html"
        })
        .otherwise({
            redirectTo: "/"
        })
});

app.factory("recipe_list_data", function($http, $q){
    var service = {};
    var baseUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?cuisine=french&limitLicense=false&number=25';
    var url = '';
    //var searchTerm = '';


    // var makeUrl = function(){
    //     url = baseUrl + searchTerm;
    // };

    // service.setSearch = function(s){
    //     searchTerm = s;
    //     makeUrl();
    // };

    service.callSpoonacularData = function(){
        var defer = $q.defer();
        $http({
            url: 'spoonacular_results.js',
            method: 'get',
            dataType: 'json'
            // headers: {
            //     "Content-Type": "X-My-Favorite-Field"
            // }
        }).then(function(response){
            console.log("recipe_list_data.service.callSpoonacularData: success");
            data = response.data;
            defer.resolve(data);

        }, function(response){
            defer.reject(reponse);
        });
        return defer.promise;
    };
    return service;
});

app.factory("recipe_directions", function($http, $q, recipe_list_data, search_params){
    var service = {};
    //var baseUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?cuisine=french&limitLicense=false&number=25';
    //var url = '';
    //var searchTerm = '';
    service.recipe_id = callSpoonacularData().then(function(response){
        console.log("recipe_list_data.service.callSpoonacularData: success");
        data = response.data;
        defer.resolve(data);

    });
    console.log("Recipe ID: ", service.recipe_id);

    // var makeUrl = function(){
    //     url = baseUrl + searchTerm;
    // };

    // service.setSearch = function(s){
    //     searchTerm = s;
    //     makeUrl();
    // };

    // service.call_recipe_directions = function(){
    //     var defer = $q.defer();
    //     $http({
    //         url: 'spoonacular_results.js',
    //         method: 'get',
    //         dataType: 'json'
    //         // headers: {
    //         //     "Content-Type": "X-My-Favorite-Field"
    //         // }
    //     }).then(function(response){
    //         console.log("recipe_list_data.service.callSpoonacularData: success");
    //         data = response.data;
    //         defer.resolve(data);
    //
    //     }, function(response){
    //         defer.reject(reponse);
    //     });
    //     return defer.promise;
    // };
    return service;
});


app.controller('mainController', ["$http", "$log", "$scope", "recipe_list_data", "searchParams",function($http, $log, $scope, recipe_list_data, searchParams, recipe_directions){
    $log.info("mainController: I am ready to load!");

    var self = this;
    this.spoonacularData = [];
    this.recipeTitle = '';
    this.recipeCookTime = 0;
    this.recipeImageFilename = '';
    this.recipeImageUrl = "https://spoonacular.com/recipeImages/" + this.recipeImageFilename;

    self.searchParams = searchParams;

    this.searchInput = {
        style: "",
        cookTime: ""
    };
    searchParams = this.searchInput;

    this.getSpoonacularData = function(){
        var self = this;
        recipe_list_data.callSpoonacularData().then (function (data){
            $log.log('recipe_list_data.callSpoonacularData(): success, data = ', data);
            self.spoonacularData = data.results;
            //$log.log('spoonacularData: ', self.spoonacularData);
        });
        console.log("searchInput.style = ", this.searchInput.style);
        console.log("searchInput.cookTime = ", this.searchInput.cookTime);
        console.log("searchParams service = ", searchParams);
    };


    //this.getSpoonacularData();
}]);


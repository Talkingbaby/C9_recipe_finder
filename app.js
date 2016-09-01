var app = angular.module('recipeApp', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "index.html"
        })
        .when('/recipe-list', {
            templateUrl: "list.html",
            controller: "recipe-list-controller"
        })
        .when('/recipe', {
            templateUrl: "recipe.html"
        })
        .otherwise({
            redirectTo: "/"
        })
});


app.factory("recipe_list_data", function($http, $q, $log, searchParams){

    var service = {};
    var baseUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?cuisine=';
    var return_number = '&number=100';
    var url = '';
    var fself = this;
    fself.searchp = searchParams;
    var searchTerm = '';


    var makeUrl = function(){
        url = baseUrl + searchParams.style + return_number;
    };



    service.callSpoonacularData = function(){
        makeUrl();
        $log.info('url: ', url);

        var defer = $q.defer();
        $http({
            url: url,
            method: 'get',
            dataType: 'json',
            headers: {
                "X-Mashape-Key": "VpQmAeJYO5msh7bVwZT13pUsanqKp1DU33NjsnvQ9KO5VtnlU9"
            }

        }).then(function (response) {
            console.log("recipe_list_data.service.callSpoonacularData: success");
            data = response.data;
            fself.searchp.SpoonacularData = data.results;
            defer.resolve(data);
        }, function (response) {
            defer.reject(reponse);
        });
        return defer.promise;
    };
    return service;
});

app.factory("recipe_instructions", function ($http, $q, searchParams) {
    var service = {};
    var fself = this;
    fself.searchp = searchParams;
    var recipeId = fself.searchp.recipeID;
    var url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + recipeId + '/analyzedInstructions?stepBreakdown=true';


    service.getSpoonacularRecipeInstructions = function () {
        var defer = $q.defer();
        $http({
            url: 'recipeID_561004_instruction.js', //replace this with 'url' variable when doing live call
            method: 'get',
            dataType: 'json'
        }).then(function (response) {
            console.log("recipe_instructions.service.getSpoonacularInstructions: success");
            data = response.data;
            defer.resolve(data);
        }, function (response) {
            defer.reject(response);
        });
        return defer.promise;
    };
    return service;
});

app.controller('mainController', ["$http", "$log", "$scope", "recipe_list_data", "searchParams", "recipe_instructions", function ($http, $log, $scope, recipe_list_data, searchParams, recipe_instructions) {
    $log.info("mainController: I am ready to load!");

    var self = this;
    this.spoonacularData = [];
    this.recipeTitle = '';
    this.recipeCookTime = 0;
    this.recipeImageFilename = '';
    this.recipeImageUrl = "https://spoonacular.com/recipeImages/" + this.recipeImageFilename;

    self.searchParams = searchParams;

    this.getSpoonacularData = function () {
        //var self = this;
        recipe_list_data.callSpoonacularData().then(function (data) {
            $log.log('recipe_list_data.callSpoonacularData(): success, data = ', data);
            //self.spoonacularData = data.results;
            searchParams.SpoonacularData = data.results;
            $log.log('KYLE spoonacularData: ', searchParams);
        });
        console.log("searchInput.style = ", searchParams.style);

        console.log("searchInput.cookTime = ",searchParams.cookTime);
        console.log("searchParams service = ", searchParams);
    };

//this.getSpoonacularData();
}]);


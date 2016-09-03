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


app.factory("recipe_list_data", function ($http, $q, $log, searchParams) {

    var service = {};
    var baseUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?cuisine=';
    var return_number = '&number=100';
    var url = '';
    var fself = this;
    fself.searchp = searchParams;
    var searchTerm = '';


    var makeUrl = function () {
        url = baseUrl + searchParams.style + return_number;
    };


    service.callSpoonacularData = function () {
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
    var url = "";
    var createUrl = function () {
        url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + fself.searchp.recipeID + '/analyzedInstructions?stepBreakdown=true';
    };

    service.getSpoonacularRecipeInstructions = function () {
        createUrl();
        var defer = $q.defer();
        $http({
            url: url, //'recipeID_561004_instruction.js'
            method: 'get',
            dataType: 'json',
            headers: {
                "X-Mashape-Key": "VpQmAeJYO5msh7bVwZT13pUsanqKp1DU33NjsnvQ9KO5VtnlU9"
            }
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

app.factory("recipe_ingredients", function ($http, $q, $log, searchParams) {
    var service = {};
    var self = this;
    self.searchp = searchParams;
    var url = "";
    var createUrl = function () {
        url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + self.searchp.recipeID + "/information?includeNutrition=false"
    };

    service.getSpoonacularRecipeIngredients = function () {
        createUrl();
        var defer = $q.defer();
        $http({
            url: url,
            method: "get",
            dataTpe: "json",
            headers: {"X-Mashape-Key": "VpQmAeJYO5msh7bVwZT13pUsanqKp1DU33NjsnvQ9KO5VtnlU9"}
        }).then(function (response) {
            $log.log("recipe_ingredients.service.getSpoonacularRecipeIngredients: success");
            var data = response.data;
            defer.resolve(data);
        }, function (response) {
            defer.reject(response);
        });
        return defer.promise;
    };
    return service;
});

app.controller('mainController', ["$http", "$log", "$scope", "recipe_list_data", "searchParams", "recipe_instructions", "recipe_ingredients", function ($http, $log, $scope, recipe_list_data, searchParams, recipe_instructions, recipe_ingredients) {
    $log.info("mainController: I am ready to load!");

    var self = this;
    this.spoonacularData = [];
    this.recipeTitle = '';
    this.recipeCookTime = 0;
    this.recipeImageFilename = '';
    this.cuisine_array = ['french', 'vegan', 'italian', 'japanese'];
    this.cooktime = ['0 - 15 min', '15 - 30 min', '30 - 45 min', '5 - 60 min', '60+ min'];

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

        console.log("searchInput.cookTime = ", searchParams.cookTime);
        console.log("searchParams service = ", searchParams);
    };

    this.getRecipeInstructions = function (index) {
        $log.log('getRecipeInstructions function called');
        searchParams.recipeID = searchParams.sortedData[index].id;
        searchParams.recipeImage = "https://spoonacular.com/recipeImages/" + searchParams.sortedData[index].image;
        searchParams.recipeTitle = searchParams.sortedData[index].title;
        recipe_instructions.getSpoonacularRecipeInstructions()
            .then(function (data) {
                searchParams.recipeInstructions = data[0].steps;
                $log.log('searchParams.recipeInstructions:', searchParams.recipeInstructions);
            });
        self.getRecipeIngredients();
    };

    //function to check if 'step' property of searchParams.recipeInstructions contains a number or not
    this.checkRecipeStep = function (element) {
        return isNaN(parseInt(element.step));
    };

    //function to get recipe ingredients, gets called in the 'getRecipeInstructions' function
    this.getRecipeIngredients = function () {
        $log.log("getRecipeIngredients function called");
        recipe_ingredients.getSpoonacularRecipeIngredients()
            .then(function (data) {
                searchParams.recipeIngredients = data;
                $log.log('searchParams.recipeIngredients:', searchParams.recipeIngredients);
            });
    }
}]);


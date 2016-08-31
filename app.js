var app = angular.module('recipeApp', ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: "index.html"
        })
        .when('/recipe-list',{
            templateUrl: "list.html",
            controller: "recipe-list-controller"
        })
        .when('/recipe',{
            templateUrl: "recipe.html"
        })
        .otherwise({
            redirectTo: "/"
        })
});

app.factory("recipe_list_data", function($http, $q, searchParams){
    var service = {};
    var baseUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?cuisine=french&limitLicense=false&number=25';
    var url = '';
    var fself = this;
    fself.searchp = searchParams;
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
            fself.searchp.SpoonacularData = data.results;
            defer.resolve(data);
        }, function(response){
            defer.reject(reponse);
        });
        return defer.promise;
    };
    return service;
});

app.controller('mainController', ["$http", "$log", "$scope", "recipe_list_data", "searchParams",function($http, $log, $scope, recipe_list_data, searchParams){
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
        cookTime: "",
        SpoonacularData: []
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


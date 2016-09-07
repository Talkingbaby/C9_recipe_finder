var app = angular.module('recipeApp', ['ngRoute']);


app.controller('mainController', ["$http", "$log", "$scope", "recipe_list_data", "searchParams", "recipe_instructions", "recipe_ingredients", function ($http, $log, $scope, recipe_list_data, searchParams, recipe_instructions, recipe_ingredients) {
    //$log.info("mainController: I am ready to load!");

    var self = this;
    this.cuisine_array = ['french', 'vegan', 'italian', 'japanese']; //array for mg-options
    this.cooktime = ['0 - 15 min', '15 - 30 min', '30 - 45 min', '45 - 60 min', '60+ min']; //array for ng-options

    self.searchParams = searchParams;

    this.getSpoonacularData = function () {
        //var self = this;
        recipe_list_data.callSpoonacularData().then(function (data) {
            //$log.log('recipe_list_data.callSpoonacularData(): success, data = ', data);
            //self.spoonacularData = data.results;
            searchParams.SpoonacularData = data.results;
            //$log.log('KYLE spoonacularData: ', searchParams);
        });
        // console.log("searchInput.style = ", searchParams.style);
        // console.log("searchInput.cookTime = ", searchParams.cookTime);
        // console.log("searchParams service = ", searchParams);
    };

    this.getRecipeInstructions = function (index) {
        $log.log('getRecipeInstructions function called');
        searchParams.recipeID = searchParams.sortedData[index].id;
        searchParams.recipeImage = "https://spoonacular.com/recipeImages/" + searchParams.sortedData[index].image;
        searchParams.recipeTitle = searchParams.sortedData[index].title;
        recipe_instructions.getSpoonacularRecipeInstructions()
            .then(function (data) {
                if (data.length == 0) {
                    searchParams.recipeInstructions = [];
                    searchParams.recipeInstructions[0] = {
                        step: "Sorry, there is no instruction available for this recipe."
                    };
                    //$log.log('searchParams.recipeInstructions:', searchParams.recipeInstructions);
                }
                else {
                    searchParams.recipeInstructions = data[0].steps;
                    //$log.log('searchParams.recipeInstructions:', searchParams.recipeInstructions);
                }
            });
        self.getRecipeIngredients();
    };

    //function to check if 'step' property of searchParams.recipeInstructions contains a number or not
    this.checkRecipeStep = function (element) {
        return isNaN(parseInt(element.step));
    };

    //function to get recipe ingredients, gets called in the 'getRecipeInstructions' function
    this.getRecipeIngredients = function () {
        //$log.log("getRecipeIngredients function called");
        recipe_ingredients.getSpoonacularRecipeIngredients()
            .then(function (data) {
                searchParams.recipeIngredients = data;
                //$log.log('searchParams.recipeIngredients:', searchParams.recipeIngredients);
            });
    }

    //tied to click handler to reset search params when returning to the home page
    this.resetSearchParams = function(){
        searchParams.style = "";
        searchParams.cookTime = "";
        searchParams.SpoonacularData = [];
        searchParams.sortedData = [];
        searchParams.recipeID = "";
        searchParams.recipeTitle = "";
        searchParams.recipeImage = "";
        searchParams.recipeInstructions = [];
        searchParams.recipeIngredients = [];

       // $log.info("KYLE I am empty params: ", searchParams);
    };

}]);


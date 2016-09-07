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
            //$log.log("recipe_ingredients.service.getSpoonacularRecipeIngredients: success");
            var data = response.data;
            defer.resolve(data);
        }, function (response) {
            defer.reject(response);
        });
        return defer.promise;
    };
    return service;
});

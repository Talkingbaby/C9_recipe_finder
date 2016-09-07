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
            // console.log('response: ', response);
            // console.log('data: ', data);
            defer.resolve(data);
        }, function (response) {
            defer.reject(response);
        });
        return defer.promise;
    };
    return service;
});

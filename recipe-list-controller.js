app.controller('recipe-list-controller',["$log","$http","searchParams", "recipe_instructions", function ($log,$http,searchParams, recipe_instructions) {
    var self = this;
    var sorted_array = [];
    console.log("list controller");
    self.searchParams = searchParams;
    $log.log("searchParam in recipe-list-controller:",searchParams);
    ////a function to find recipe within the cooking time
    self.sort = function () {
        for (var i in searchParams.SpoonacularData) {
            ///setting a default when the user doesn't choose any time
            if (searchParams.cookTime == "") {
                searchParams.cookTime = "15";
            }

            if (parseInt(searchParams.cookTime) == 65) {
                if (searchParams.SpoonacularData[i].readyInMinutes > 60) {
                    sorted_array.push(searchParams.SpoonacularData[i]);
                }
            }
            else if (searchParams.SpoonacularData[i].readyInMinutes <= parseInt(searchParams.cookTime) && searchParams.SpoonacularData[i].readyInMinutes > parseInt(searchParams.cookTime) - 15){
                sorted_array.push(searchParams.SpoonacularData[i]);
            }
        }
    };
    self.sort();
    searchParams.sortedData = sorted_array;
    console.log("sorted array: ", sorted_array);
    console.log("searchParam in list: ", searchParams);

    this.getRecipeInstructions = function (index) {
        $log.log('getRecipeInstructions function called');
        $log.log('sortedData: ', searchParams.sortedData);
        searchParams.recipeID = searchParams.sortedData[index].id;
        recipe_instructions.getSpoonacularRecipeInstructions()
            .then(function (data) {
                searchParams.recipeInstructions = data[0].steps;
                $log.log('searchParams.recipeInstructions:', searchParams.recipeInstructions);
            });
    };

}]);
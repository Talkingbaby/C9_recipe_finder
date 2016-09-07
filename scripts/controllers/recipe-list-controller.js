app.controller('recipe-list-controller',["$log","$http","searchParams", "recipe_instructions", function ($log,$http,searchParams, recipe_instructions) {
    var self = this;
    var sorted_array = [];


    //console.log("list controller");
    self.searchParams = searchParams;
    //$log.log("searchParam in recipe-list-controller:",searchParams);
    ////a function to find recipe within the cooking time
    self.sort = function () {
        // console.log('self.sort function called', searchParams.cookTime);
        // console.log('SpoonacularData: ', searchParams.SpoonacularData);
        for (var i=0; i<searchParams.SpoonacularData.length; i++) {
            switch (searchParams.cookTime) {
                case "0 - 15 min" :
                    if (searchParams.SpoonacularData[i].readyInMinutes > 0 && searchParams.SpoonacularData[i].readyInMinutes <= 15) {
                        sorted_array.push(searchParams.SpoonacularData[i]);
                    }
                    break;
                case "15 - 30 min" :
                    if (searchParams.SpoonacularData[i].readyInMinutes > 15 && searchParams.SpoonacularData[i].readyInMinutes <= 30) {
                        sorted_array.push(searchParams.SpoonacularData[i]);
                    }
                    break;
                case "30 - 45 min" :
                    if (searchParams.SpoonacularData[i].readyInMinutes > 30 && searchParams.SpoonacularData[i].readyInMinutes <= 45) {
                        sorted_array.push(searchParams.SpoonacularData[i]);
                    }
                    break;
                case "45 - 60 min" :
                    if (searchParams.SpoonacularData[i].readyInMinutes > 45 && searchParams.SpoonacularData[i].readyInMinutes <= 60) {
                        sorted_array.push(searchParams.SpoonacularData[i]);
                    }
                    break;
                case "60+ min" :
                    if (searchParams.SpoonacularData[i].readyInMinutes > 60) {
                        sorted_array.push(searchParams.SpoonacularData[i]);
                    }
                    break;
                default:
                    if (searchParams.SpoonacularData[i].readyInMinutes > 0 && searchParams.SpoonacularData[i] <= 15) {
                        sorted_array.push(searchParams.SpoonacularData[i]);
                    }
                    break;
            }
        }
        //console.log('sorted array: ', sorted_array);
    };
    self.sort();
    searchParams.sortedData = sorted_array;

    //console.log("searchParam in list: ", searchParams);

}]);
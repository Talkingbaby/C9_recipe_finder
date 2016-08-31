app.controller('recipe-list-controller',["$log","$http","searchParams", function ($log,$http,searchParams) {
    var self = this;
    console.log("list controller");
    self.searchParams = searchParams;
    $log.log("searchParam:",searchParams);

    ////a function to find recipe within the cooking time
    self.sort = function () {
        for (var i in searchParams.SpoonacularData) {
            ///setting a default when the user doesn't choose any time
            if (searchParams.cookTime == "") {
                searchParams.cookTime = "15";
            }

            switch (searchParams.cookTime){
                case "15" :
                    if (searchParams.SpoonacularData[i].readyInMinutes <= 15){
                        console.log(searchParams.SpoonacularData[i]);
                    }
                    break;
            }


        }
    };
}]);
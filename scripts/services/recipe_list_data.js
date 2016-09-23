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

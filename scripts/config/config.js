app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "home.html"
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

app.controller('recipe-list-controller',["$log","$http","searchParams", function ($log,$http,searchParams) {
    console.log("list controller");
    this.searchParams = searchParams;
    $log.log("searchParam:",searchParams);
}]);
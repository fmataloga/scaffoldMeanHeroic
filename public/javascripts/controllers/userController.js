.controller('userController',
  ['$rootScope','$scope', '$location', 'userService',
  function ($rootScope,$scope, $location, userService) {
    $scope.titleLoginController = "scaffoldMeanHeroic";
    $rootScope.titleWeb = "Users";
    userService.allUsers().then(function(data) {
            $scope.usersList = data;
    });
        

}])
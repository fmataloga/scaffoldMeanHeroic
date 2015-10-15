.controller('userController',
  ['$rootScope','$scope', '$location', 'userService','$timeout',
  function ($rootScope,$scope, $location, userService,$timeout) {
    $scope.titleLoginController = "scaffoldMeanHeroic";
    $rootScope.titleWeb = "Users";
    $scope.preloader = true;
    userService.allUsers().then(function(data) {
            $scope.usersList = data;
            $scope.preloader = false;
    });

    /*    Configuration Watch  Change Serch    */
          $scope.filterText = '';
          // Instantiate these variables outside the watch
          var tempFilterText = '',
          filterTextTimeout;
          $scope.$watch('searchText', function (val) {
              if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
              tempFilterText = val;
              filterTextTimeout = $timeout(function() {
                  $scope.filterText = tempFilterText;
              }, 1500); // delay 250 ms
          })
    /*    Configuration Watch Change Serch     */
        

}])
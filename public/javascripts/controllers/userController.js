.controller('userController',
  ['$rootScope','$scope', '$location', 'userService','$timeout','$uibModal',
  function ($rootScope,$scope, $location, userService,$timeout,$uibModal) {
    $scope.titleLoginController = "scaffoldMeanHeroic";
    $rootScope.titleWeb = "Users";
    $scope.preloader = true;
    userService.allUsers().then(function(data) {
            $scope.usersList = data; 
            $scope.preloader = false;      
    });


     $scope.items = ['Felix', 'Andres', 'Juan'];
    /*  Modal*/

    /*  Create    */
     $scope.open = function (size,item) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'templates/users/modalUserEdit.html',
          controller: 'modalUserCreateController',
          size: size,
          resolve: {
            item: function () {
              return item;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
          console.log('Modal dismissed at: ' + selectedItem);
        });
    };

    /*  Create    */
    /*  Delete    */
    $scope.openDelete = function (size,user) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'templates/users/modalUserEdit.html',
          controller: 'modalUserCreateController',
          size: size,
          resolve: {
            user: function () {
              return user;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
    };

    /*  Delete    */

    /*  Modal*/
    

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
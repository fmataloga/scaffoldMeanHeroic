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

    /*  Modal*/

    /*  Create    */
     $scope.open = function (size,item) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'templates/users/modalUserCreate.html',
          controller: 'modalUserCreateController',
          size: size,
          resolve: {
            item: function () {
              return item;
            }
          }
        });

        modalInstance.result.then(function(data) {
          /*if(!id) {
                VendedoresModel.getAll().then(function (vendedores) {
                     listar.lista = vendedores;
                });
               
            } else {
                    var idx = listar.lista.indexOf(id);

                    if(idx!=-1) {
                        listar.lista[idx] = vendedor;
                     }
                     

             
            } */ 
          console.log(data);             
        });
    };

    /*  Create    */
    /*  Delete    */
    $scope.openDelete = function (size,item) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'templates/users/modalUserDelete.html',
          controller: 'modalUserDeleteController',
          size: size,
          resolve: {
            item: function () {
              return item;
            }
          }
        });

        modalInstance.result.then(function(data) {
          /*var idx = listar.lista.indexOf(vendedor);
          listar.lista.splice(idx, 1);*/ 
          var idx = $scope.usersList.indexOf(data); 
          $scope.usersList.splice(idx, 1);
          console.log(data);             
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
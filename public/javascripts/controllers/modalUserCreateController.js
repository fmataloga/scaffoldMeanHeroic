.controller('modalUserCreateController',
  ['$scope', '$modalInstance', 'item','AuthService',
  function ($scope, $modalInstance, item,AuthService) {
  
    $scope.item = item;
    $scope.saving = false;
    $scope.save = function () {

      //if(!item){
        $scope.saving = true;
        item = {username:$scope.item.username,rol:$scope.item.rol,flat:true};
        AuthService.register($scope.item.username,$scope.item.password,$scope.item.rol).then(function(r){
          $scope.saving = false;
        });
        
      //}
      $modalInstance.close(item);
    };
}])

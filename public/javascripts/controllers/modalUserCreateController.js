.controller('modalUserCreateController',
  ['$scope', '$modalInstance', 'item','AuthService',
  function ($scope, $modalInstance, item,AuthService) {
  
    $scope.item = item;
    $scope.saving = false;
    $scope.save = function () {
    	//AuthService.register(item.username,item.password,item.rol);
      if(!item){
        item = {username:$scope.item.username,rol:$scope.item.rol,flat:true};
        AuthService.register($scope.item.username,$scope.item.password,$scope.item.rol);
        $scope.saving = true;
      }
      $modalInstance.close(item);
    };


      

}])

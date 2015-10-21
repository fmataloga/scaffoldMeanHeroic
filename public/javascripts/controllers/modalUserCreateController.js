.controller('modalUserCreateController',
  ['$scope', '$modalInstance', 'item','AuthService',
  function ($scope, $modalInstance, item,AuthService) {
    
  $scope.item = item;
  $scope.save = function (username,password,rol) {
  	AuthService.register(item.username,item.password,item.rol);
    $modalInstance.close(item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
    

}])

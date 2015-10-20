.controller('homeController',
  ['$scope', '$location', 'AuthService','$uibModal',
  function ($scope, $location, AuthService,$uibModal) {
    $scope.titleHomeController = "Welcome";
    $scope.items = ['Felix', 'Andres', 'Juan'];

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'templates/myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = true;
  };

    

}])
.controller('ModalInstanceCtrl',
  ['$scope', '$modalInstance', 'items',
  function ($scope, $modalInstance, items) {
    
     $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
    

}])

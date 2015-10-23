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

    $scope.peopleObj = {
      '1' : { name: 'Adam',      email: 'adam@email.com',      age: 12, country: 'United States' },
      '2' : { name: 'Amalie',    email: 'amalie@email.com',    age: 12, country: 'Argentina' },
      '3' : { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
      '4' : { name: 'Adrian',    email: 'adrian@email.com',    age: 21, country: 'Ecuador' },
      '5' : { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30, country: 'Ecuador' },
      '6' : { name: 'Samantha',  email: 'samantha@email.com',  age: 30, country: 'United States' },
      '7' : { name: 'Nicole',    email: 'nicole@email.com',    age: 43, country: 'Colombia' },
      '8' : { name: 'Natasha',   email: 'natasha@email.com',   age: 54, country: 'Ecuador' },
      '9' : { name: 'Michael',   email: 'michael@email.com',   age: 15, country: 'Colombia' },
      '10' : { name: 'Nicolás',   email: 'nicolas@email.com',    age: 43, country: 'Colombia' }
    };

}])

var myApp = angular.module('setupApp',[]);

myApp.controller('setupAppController', ['$scope', function($scope) {
    $scope.greeting = 'Hola!';
}]);
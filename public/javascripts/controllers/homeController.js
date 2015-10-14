.controller('homeController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {
    $scope.titleHomeController = "Welcome";
    
         /*  LOGOUT  */
	    $scope.logout = function () {
	      AuthService.logout()
	        .then(function () {
	          $location.path('/login');
	        });

	    };

}])
.controller('bootstrapController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {
    $scope.test = "Menú 1";
    $scope.logo = "ScaffoldMEANHeroic";
         /*  LOGOUT  */
	    $scope.logout = function () {
	      AuthService.logout()
	        .then(function () {
	          $location.path('/login');
	        });

	    };

}])
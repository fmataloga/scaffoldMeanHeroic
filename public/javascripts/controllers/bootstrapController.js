.controller('bootstrapController',
  ['$scope', '$location', 'AuthService','bootstrapService','usersModel',
  function ($scope, $location, AuthService,bootstrapService,usersModel) {
    $scope.test = "Menú 1";
    $scope.logo = "MEAN_CASE HEROIC";
         /*  LOGOUT  */
	    $scope.logout = function () {
	      AuthService.logout()
	        .then(function () {
	          $location.path('/login');
	        });

	    };

	   /* bootstrapService.getMenu().then(function(data) {
	      $scope.menus = data;
	    });
	    usersModel.getAll().then(function(result) {
		  // code depending on result
		  console.log(result);
		}).catch(function() {
		  // an error occurred
		});	*/    	
}])
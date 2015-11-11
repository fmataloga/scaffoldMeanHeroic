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
	    bootstrapService.getMenu().then(function(data) {
	      $scope.menus = data;
	    });	
	    /*save find
	    usersModel.findById('5642b75ca310e00415ca6c00').then(function(data){
			usersModel.username = "jesus";
			usersModel.rol = 6;
			usersModel.save();
		})*/
		/*asignate values a query
		usersModel.findById('5642b75ca310e00415ca6c00').then(function(data){
			 console.log(data.username);
		})
		*/
	    //debugger;
	    /*var user = usersModel.create();
	    user.username = "chela";  	
	    user.password = "chela";  	
	    user.rol = 1; 
	    user.save(); */
}])
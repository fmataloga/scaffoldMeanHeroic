.controller('loginController', ['$rootScope', '$scope', '$location', 'AuthService',
  function ($rootScope, $scope, $location, AuthService) {
		$scope.titleLoginController = "MEAN_CASE HEROIC";
		$rootScope.titleWeb = "Login";
		$scope.login = function () {

			// initial values
			$scope.error = false;
			$scope.disabled = true;
			// call login from service
			AuthService.login($scope.loginForm.username, $scope.loginForm.password, $scope.remember)
				// handle success
				.then(function () {
					$location.path('/');
					$scope.disabled = false;
					$scope.loginForm = {};
				})
				// handle error
				.catch(function () {
					$scope.error = true;
					$scope.errorMessage = "Invalid username and/or password";
					$scope.disabled = false;
					$scope.loginForm = {};
				});

		};

		/* REGISTRAR  */
		$scope.register = function () {

			// initial values
			$scope.error = false;
			$scope.disabled = true;

			// call register from service
			AuthService.register($scope.registerForm.username, $scope.registerForm.password, $scope.rol)
				// handle success
				.then(function () {
					$location.path('/');
					$scope.disabled = false;
					$scope.registerForm = {};
				})
				// handle error
				.catch(function (err) {
					$scope.error = true;
					$scope.errorMessage = "User already exists!";
					$scope.disabled = false;
					$scope.registerForm = {};
					$scope.rol = "";
				});

		};

}])
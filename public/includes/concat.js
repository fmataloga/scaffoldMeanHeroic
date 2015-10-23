 angular.module('appAngular', ['ngRoute', 'angular-table','ui.bootstrap'])

 .config(function ($routeProvider) {
 	$routeProvider
 		.when('/', {
 			templateUrl: 'templates/home.html',
 			controller: 'homeController',
 			access: {
 				restricted: false,
 				rol: 2
 			}
 		})
 		.when('/login', {
 			templateUrl: 'templates/login/loginIndex.html',
 			controller: 'loginController',
 			access: {
 				restricted: true,
 				rol: 1
 			}
 		})
 		.when('/logout', {
 			controller: 'logoutController',
 			access: {
 				restricted: true,
 				rol: 1
 			}
 		})
 		.when('/register', {
 			templateUrl: 'templates/login/loginRegister.html',
 			controller: 'loginController',
 			access: {
 				restricted: true,
 				rol: 1
 			}
 		})
 		.when('/accessDenied', {
 			template: '<center><h2>Access Dennied!</h2></center>',
 			access: {
 				restricted: true,
 				rol: 1
 			}
 		})
 		.when('/userList', {
 			templateUrl: 'templates/users/userList.html',
 			controller: 'userController',
 			access: {
 				restricted: false,
 				rol: 4
 			}
 		})
 		.otherwise({
 			redirectTo: '/'
 		});
 })

 .run(function ($rootScope, $location, $route, AuthService, $http, $window) {
 	$rootScope.$on('$routeChangeStart', function (event, next, current) {
 		var session;
 		$rootScope.titleWeb = "scaffoldMeanHeroic";
 		//Window Width
 		var windowWidth = $window.innerWidth;
 		/*    Configuration Tables     */
 		var itemsPerPage, maxPages;
 		if (windowWidth <= 600) {
 			//Mobile
 			itemsPerPage = 5;
 			maxPages = 3;
 		} else if (windowWidth <= 992) {
 			//Tablet
 			itemsPerPage = 5;
 			maxPages = 5;
 		} else {
 			//PC
 			itemsPerPage = 5;
 			maxPages = 8;
 		}
 		$rootScope.configTable = {
 			itemsPerPage: itemsPerPage,
 			maxPages: maxPages,
 			fillLastPage: "yes"
 		};

 		/*    Configuration Tables     */
 		/*    Users Labels rols    */
 		$rootScope.labelRol = ["reader", "edit", "coordinator", "admin"];
 		/*    Users Labels rols    */

 		$http.get('/cookie').
 		success(function (data) {
 			if (!data.comp) {
 				session = false;
 			} else {
 				session = data.comp;
 				$rootScope.user = data.user;
 			}

 			if (next.access.rol) {
 				if (data.user.rol) {
 					if (data.user.rol < next.access.rol) {
 						$location.path('/accessDenied');
 					}
 				}
 			}

 			//Menu Exeptions
 			if (next.$$route.originalPath == '/login' || next.$$route.originalPath == '/register') {
 				$rootScope.route = false;
 			} else {
 				$rootScope.route = true;
 			}
 			if (session == false && next.access.restricted == false) {
 				$location.path('/login');
 			}

 			if (next.$$route.originalPath == '/login' && session == true) {
 				$location.path('/');
 			}

 		});
 	});
 })
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
.controller('homeController',
  ['$scope', '$location', 'AuthService','$uibModal',
  function ($scope, $location, AuthService,$uibModal) {
    $scope.titleHomeController = "Welcome";
    

}])
.controller('loginController', ['$rootScope', '$scope', '$location', 'AuthService',
  function ($rootScope, $scope, $location, AuthService) {
		$scope.titleLoginController = "scaffoldMeanHeroic";
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

		$scope.personList = [
			{
				index: 1,
				name: "Kristin Hill",
				email: "kristin@hill.com"
      },
			{
				index: 2,
				name: "Valerie Francis",
				email: "valerie@francis.com"
      },
			{
				index: 3,
				name: "Bob Abbott",
				email: "bob@abbott.com"
      },
			{
				index: 4,
				name: "Greg Boyd",
				email: "greg@boyd.com"
      },
			{
				index: 5,
				name: "Peggy Massey",
				email: "peggy@massey.com"
      },
			{
				index: 6,
				name: "Janet Bolton",
				email: "janet@bolton.com"
      },
			{
				index: 7,
				name: "Maria Liu",
				email: "maria@liu.com"
      },
			{
				index: 8,
				name: "Anne Warren",
				email: "anne@warren.com"
      },
			{
				index: 9,
				name: "Keith Steele",
				email: "keith@steele.com"
      },
			{
				index: 10,
				name: "Jerome Lyons",
				email: "jerome@lyons.com"
      },
			{
				index: 11,
				name: "Jacob Stone",
				email: "jacob@stone.com"
      },
			{
				index: 12,
				name: "Marion Dunlap",
				email: "marion@dunlap.com"
      },
			{
				index: 13,
				name: "Stacy Robinson",
				email: "stacy@robinson.com"
      },
			{
				index: 14,
				name: "Luis Chappell",
				email: "luis@chappell.com"
      },
			{
				index: 15,
				name: "Kimberly Horne",
				email: "kimberly@horne.com"
      },
			{
				index: 16,
				name: "Andy Smith",
				email: "andy@smith.com"
      }
    ]


}])
.controller('modalUserCreateController',
  ['$scope', '$modalInstance', 'item','AuthService',
  function ($scope, $modalInstance, item,AuthService) {
    
  $scope.item = item;
  $scope.save = function () {
  	//AuthService.register(item.username,item.password,item.rol);
    if(!item){
      item = {username:$scope.item.username,rol:$scope.item.rol,flat:true};
      AuthService.register($scope.item.username,$scope.item.password,$scope.item.rol);
    }
    $modalInstance.close(item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
    

}])

.controller('modalUserDeleteController',
  ['$scope', '$modalInstance', 'item',
  function ($scope, $modalInstance, item) {
    
  $scope.item = item;
  $scope.ok = function () {
    $modalInstance.close($scope.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
    

}])
.controller('userController',
  ['$rootScope','$scope', '$location', 'userService','$timeout','$uibModal',
  function ($rootScope,$scope, $location, userService,$timeout,$uibModal) {
    $scope.titleLoginController = "scaffoldMeanHeroic";
    $rootScope.titleWeb = "Users";
    $scope.preloader = true;
    $scope.msjAlert = false;
    userService.allUsers().then(function(data) {
            $scope.usersList = data; 
            $scope.preloader = false;      
    });

    /*  Modal*/

    /*  Create    */
     $scope.open = function (size,item) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'templates/users/modalUserCreate.html',
          controller: 'modalUserCreateController',
          size: size,
          resolve: {
            item: function () {
              return item;
            }
          }
        });

        modalInstance.result.then(function(data) {
          if(!data._id) {
                $scope.usersList.push(data);   
            } 
            console.log(data);        
        });
    };

    /*  Create    */
    /*  Delete    */
    $scope.openDelete = function (size,item) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'templates/users/modalUserDelete.html',
          controller: 'modalUserDeleteController',
          size: size,
          resolve: {
            item: function () {
              return item;
            }
          }
        });

        modalInstance.result.then(function(data) { 
          var idx = $scope.usersList.indexOf(data); 
          $scope.usersList.splice(idx, 1);
          userService
            .deleteUser(data._id)
            .then(function(result) {
                $scope.msjAlert = true;
                $scope.alert = "success";
                $scope.message = result.message;
            })
            .catch(function(err) {
                //error
                $scope.msjAlert = true;
                $scope.alert = "danger";
                $scope.message = "Error "+err;
            })            
        });
    };

    /*  Delete    */

    /*  Modal*/

    /*    Configuration Watch  Change Serch    */
          $scope.filterText = '';
          // Instantiate these variables outside the watch
          var tempFilterText = '',
          filterTextTimeout;
          $scope.$watch('searchText', function (val) {
              if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
              tempFilterText = val;
              filterTextTimeout = $timeout(function() {
                  $scope.filterText = tempFilterText;
              }, 1500); // delay 250 ms
          })
    /*    Configuration Watch Change Serch     */
        

}])
.factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;

    // return available functions for use in controller
    return ({
      isLoggedIn: isLoggedIn,
      login: login,
      logout: logout,
      register: register
    });

    function isLoggedIn() {
        if(user) {
          return true;
        } else {
          return false;
        }
    }


    function login(username, password,check) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/api/login', {username: username, password: password,check: check})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/api/logout')
        // handle success
        .success(function (data) {
          user = false;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function register(username, password,rol) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/api/register', {username: username, password: password,rol:rol})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

}])
.factory('loginFactorie', function($http) {
        var comun = {};


        return comun;
    })
.factory('userService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    

    // return available functions for use in controller
    return ({
      allUsers: allUsers,
      deleteUser : deleteUser
    });


    function allUsers () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get('/api/users')
            .success(function(data) {
                defered.resolve(data);
            })
            .error(function(err) {
                defered.reject(err)
            });

        return promise;
    }

    function deleteUser (id) {
      var defered = $q.defer();
      var promise = defered.promise;
      $http.delete('/api/users/' + id)
        .success(function(data) {
                defered.resolve(data);
            })
            .error(function(err) {
                defered.reject(err)
            });

        return promise;
    }






    }])
.controller('setupController',
    ['$scope',
        function ($scope) {
            $scope.fieldName = [];
            $scope.showOnView = [];
            var stringFields = "";
            var stringDataTypes = "";
            var stringShowOnView = "";

//initialize data on first Row
            $scope.collection = [{
                field: '',
                dataType: '',
                showOnView: ''
            }];

            // remove the "Remove" Header and Body when only left one document
            $scope.firstRow = function () {
                if ($scope.collection[1])
                    return false;
                else
                    return true;
            };


            $scope.dataTypes = [
                {
                    id: 1,
                    name: 'String'
                },
                {
                    id: 2,
                    name: 'Number'
                },
                {
                    id: 3,
                    name: 'Boolean'
                },
                {
                    id: 4,
                    name: 'Array'
                }];

            // expose a function to add new (blank) rows to the model/table
            $scope.addRow = function () {
                // push a new object with some defaults
                $scope.collection.push({
                    field: $scope.fieldName[0],
                    dataType: $scope.dataTypes[0],
                    showOnView: $scope.showOnView[0]
                });
            }

            $scope.removeRow = function (index) {
                $scope.collection.splice(index, 1);
            }

            $scope.validate = function () {
                var cont = 0;
                angular.forEach($scope.collection, function (value, key) {
                    cont++;
                    if (cont != $scope.collection.length) {
                        stringFields += value.field + ",";
                        stringDataTypes += value.dataType.name + ",";
                        stringShowOnView += value.showOnView + ",";
                    } else {
                        stringFields += value.field;
                        stringDataTypes += value.dataType.name;
                        stringShowOnView += value.showOnView;
                    }
                });
                console.log(
                    "schemeName = "  + '"' + $scope.schemeName + '"' + "\n" +
                    "fields = " + '"' +stringFields + '"' + "\n" +
                    "dataTypes = " + '"' +stringDataTypes + '"' + "\n" +
                    "showOnView = " + '"' +stringShowOnView  + '"'
                )
            }
        }])

.config(function ($routeProvider) {
 	$routeProvider
 		.when('/setup', {
 			templateUrl: '/javascripts/setup/templates/setup.html',
 			controller: 'setupController',
 			access: {
 				restricted: true,
 				rol: 1
 			}
 		})
 		.when('/crud', {
 		    templateUrl: '/javascripts/setup/templates/crud.html',
 			controller: 'setupController',
 			access: {
 				restricted: true,
 				rol: 1
 			}
 		});
 })
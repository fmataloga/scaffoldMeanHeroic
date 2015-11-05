 angular.module('appAngular', ['ngRoute', 'angular-table','ui.bootstrap','optimumModel'])
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
  ['$scope', '$location', 'AuthService','bootstrapService',
  function ($scope, $location, AuthService,bootstrapService) {
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
}])
.controller('homeController',
  ['$scope', '$location', 'AuthService','$uibModal',
  function ($scope, $location, AuthService,$uibModal) {
    $scope.titleHomeController = "Welcome";
    
}])
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
.factory('bootstrapService',
  ['$q', '$http',
  function ($q, $http) {
  	return ({
      getMenu: getMenu,
    });


    function getMenu () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get('/api/menu')
            .success(function(data) {
                defered.resolve(data);
            })
            .error(function(err) {
                defered.reject(err)
            });

        return promise;
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
      deleteUser : deleteUser,
      editUser   : editUser
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

   function editUser(username,newUsername, password,rol) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.put('/api/register', {username: username,newUsername: newUsername, password: password,rol:rol})
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
.service('usersModel', function ($optimumModel) {
	var model = new $optimumModel();
	model.url = '/api/users';
	return model;
})
.controller('modalUserCreateController',
  ['$scope', '$uibModalInstance', 'item','AuthService','userService',
  function ($scope, $uibModalInstance, item,AuthService,userService) {
  
    $scope.item = item;
    $scope.saving = false;
    if(item){
     $scope.tmpUsername = angular.copy(item.username);
    }
     
    $scope.save = function () {

      if(!item){
        $scope.saving = true;
        item = {username:$scope.item.username,rol:$scope.item.rol,flat:true};
        AuthService.register($scope.item.username,$scope.item.password,$scope.item.rol).then(function(r){
          $scope.saving = false;
        });
      }else{
        userService.editUser($scope.tmpUsername,item.username,$scope.item.password,$scope.item.rol).then(function(r){
          $scope.saving = false;
        });
      }
      $uibModalInstance.close(item);
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
  ['$rootScope','$scope', '$location', 'userService','$timeout','$uibModal','usersModel',
  function ($rootScope,$scope, $location, userService,$timeout,$uibModal,usersModel) {
    $scope.titleLoginController = "MEAN-CASE SUPER HEROIC";
    $rootScope.titleWeb = "Users";
    $scope.preloader = true;
    $scope.msjAlert = false;
  
    usersModel.getAll().then(function(data){
            $scope.usersList = data; 
            $scope.usersTemp = angular.copy($scope.usersList);
            $scope.preloader = false;
    })
  

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
                $scope.usersTemp = angular.copy($scope.usersList);
            }      
        },function(result){
          $scope.usersList = $scope.usersTemp;
          $scope.usersTemp = angular.copy($scope.usersList);  
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
         /* $scope.filterText = '';
          // Instantiate these variables outside the watch
          var tempFilterText = '',
          filterTextTimeout;
          $scope.$watch('searchText', function (val) {
              if (filterTextTimeout) $timeout.cancel(filterTextTimeout);
              tempFilterText = val;
              filterTextTimeout = $timeout(function() {
                  $scope.filterText = tempFilterText;
              }, 1500); // delay 250 ms
          })*/
    /*    Configuration Watch Change Serch     */
        

}])
.controller('crudController',
    ['$scope','crudService',
        function ($scope,crudService) {
            $scope.spinner = false;
            $scope.fieldName = [];
            $scope.showOnView = [];
            var stringFields = "";
            var stringDataTypes = "";
            var stringShowOnView = "";
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
                $scope.spinner = true;
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
                crudService.generar($scope.schemeName,stringFields,stringDataTypes,stringShowOnView).then(function(result){
                    $scope.spinner = false;
                    $scope.result = result;
                });
            }

        }])

.factory('crudService',
  ['$q','$http',
  function ($q,$http) {

  	return ({
      generar: generar
    });

  	function generar(schemeName,fields, dataTypes,showOnView) {
      var defered = $q.defer();
      var promise = defered.promise;
      $http.post('/config/cruds', {schemeName: schemeName,fields: fields, dataTypes: dataTypes,showOnView:showOnView})
        .success(function (data, status) {
          defered.resolve(data);
        })
        .error(function (data) {
          defered.reject();
        });
        return promise;
    }
}])
.config(function ($routeProvider) {
 	$routeProvider
 		.when('/setup', {
 			templateUrl: '/javascripts/setup/crud/templates/setup.html',
 			controller: 'crudController',
 			access: {
 				restricted: true,
 				rol: 1
 			}
 		})
 		.when('/crud', {
 		    templateUrl: '/javascripts/setup/crud/templates/crud.html',
 			controller: 'crudController',
 			access: {
 				 restricted: false,
 				rol: 1
 			}
 		});
 })
.controller('uploadTemplatesController',
    ['$scope','uploadTemplatesService',
        function ($scope,uploadTemplatesService) {
            $scope.spinner = false;
            $scope.save = function(){
                $scope.spinner = true;
                var edit = (($scope.file.name).toLowerCase()).replace(/ /g,"-");
                edit = edit.replace(/.zip/g,"");
                console.log(edit);
                uploadTemplatesService.save($scope.file,edit).then(function(data){
                    $scope.spinner = false;
                    $scope.result = data;
                });
              
            };

}])
.directive('uploaderModel', ["$parse", function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, iElement, iAttrs) 
        {
            iElement.on("change", function(e)
            {
                $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
            });
        }
    };
}])
.factory('uploadTemplatesService',
  ['$q','$http',
  function ($q,$http) {

  	return ({
      save: save
    });

    
  	function save(file,name) {
      var defered = $q.defer();
      var promise = defered.promise;
      var formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);
      $http.post('/config/upload',formData, {
      headers: {
        "Content-type": undefined
      },
      transformRequest: angular.identity
    })
        .success(function (data, status) {
          defered.resolve(data);
        })
        .error(function (data) {
          defered.reject();
        });
        return promise;
    }
}])
.config(function ($routeProvider) {
 	$routeProvider
 		.when('/uploadTemplates', {
 			templateUrl: '/javascripts/setup/upload/templates/uploadTemplates.html',
 			controller: 'uploadTemplatesController',
 			access: {
 				restricted: false,
 				rol: 1
 			}
 		});
 })
 angular.module('appAngular', ['ngRoute'])

.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'homeController',
        access: {restricted: false,rol:2}
    })
    .when('/login', {
      templateUrl: 'templates/login/loginIndex.html',
      controller: 'loginController',
      access: {restricted: true,rol:1}
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true,rol:1}
    })
    .when('/register', {
      templateUrl: 'templates/login/loginRegister.html',
      controller: 'loginController',
      access: {restricted: true,rol:1}
    })
    .when('/accessDenied', {
      template: '<center><h2>Access Dennied!</h2></center>',
      access: {restricted: true,rol:1}
    })
    .when('/two', {
      template: '<h1>This is page two!</h1>',
      access: {restricted: false}
    })
    .otherwise({redirectTo: '/'});
})

.run(function ($rootScope, $location, $route, AuthService,$http) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
      var session;
      $http.get('/cookie').
        success(function(data) {
            if(!data.comp){
                session = false;
            }else{
                session = data.comp;
                $rootScope.user = data.user;
            }

            if(next.access.rol){
              if (data.user.rol){
                if(data.user.rol < next.access.rol ){
                  $location.path('/accessDenied');
                }
              }
            }
            //Menu Exeptions
            if(next.$$route.originalPath == '/login' || next.$$route.originalPath == '/register' ){
              $rootScope.route = false;
            }else{
              $rootScope.route = true;
            }
            if (session == false && next.access.restricted == false ) {
              $location.path('/login');
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
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {
    $scope.titleHomeController = "Welcome";
    

}])
.controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {
    $scope.titleLoginController = "scaffoldMeanHeroic";
    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;
      //$scope.remember = "hola";
      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password,$scope.remember)
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
      AuthService.register($scope.registerForm.username, $scope.registerForm.password,$scope.rol)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };
    



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
 angular.module('appAngular', ['ngRoute'])

.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'homeController',
        access: {restricted: false}
    })
    .when('/login', {
      templateUrl: 'templates/login/loginIndex.html',
      controller: 'loginController',
      access: {restricted: true}
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'templates/login/loginIndex.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/one', {
      template: '<h1>This is page one!</h1>',
      access: {restricted: true}
    })
    .when('/two', {
      template: '<h1>This is page two!</h1>',
      access: {restricted: false}
    })
    .otherwise({redirectTo: '/'});
})

.run(function ($rootScope, $location, $route, AuthService,$http) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
      var session ;
      $http.get('/cookie').
        success(function(data) {
            if(!data.comp){
                session = false;
            }else{
                session = data.comp;
                $rootScope.user = data.user;
            }
            console.log(next.access.restricted+" Session "+session);
            if (session == false && next.access.restricted == false ) {
              $location.path('/login');
            }
                 
        });  
  });
})
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
.controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.titleLoginController = "scaffoldMeanHeroic";
    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
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
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/login');
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


    function login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/api/login', {username: username, password: password})
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

    function register(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/api/register', {username: username, password: password})
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
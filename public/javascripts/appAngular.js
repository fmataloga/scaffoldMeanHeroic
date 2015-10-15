 angular.module('appAngular', ['ngRoute','angular-table'])

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
    .when('/userList', {
      templateUrl: 'templates/login/userList.html',
      controller: 'userController',
      access: {restricted: false,rol:1}
    })
    .otherwise({redirectTo: '/'});
})

.run(function ($rootScope, $location, $route, AuthService,$http) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
      var session;
      $rootScope.titleWeb = "scaffoldMeanHeroic";
      /*    Configuration Tables     */

        $rootScope.configTable = {
              itemsPerPage: 10,
              maxPages: 10,
              fillLastPage: "yes"
        };

    /*    Configuration Tables     */

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
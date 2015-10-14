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
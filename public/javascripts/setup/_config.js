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
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
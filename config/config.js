var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fss = require('fs');
var fs = require('fs-extra');
var replace = require("replace");
var ModelMenu = mongoose.model('ModelMenu');
var unzip = require('unzip');
var ModelGeneralConfig = mongoose.model('ModelGeneralConfig');
var ModelSetup = mongoose.model('ModelSetup');
/* GET home page. */
router.get('/prueba', function(req, res, next) {
 
 res.json({status: 'Registration successful!'});

});

/* General Cruds. */

router.post('/cruds', function(req, res, next) {
	var crud = req.body.schemeName,fields='',fieldSchema='';
	var inputs = req.body.fields;
	var array = inputs.split(',');
	var inputsType = req.body.dataTypes;
	var arrayTypes = inputsType.split(',');
	/*		BACK END 		*/
	for (var i = 0; i < array.length; i++) {
		if(i < array.length){
			fields += '     data.'+array[i]+' = '+'req.body.'+array[i]+';\n';
		}else{
			fields += '     data.'+array[i]+' = '+'req.body.'+array[i]+';';
		}
	}
	for (var x = 0; x < array.length; x++) {
		if(x < (array.length-1)){
			fieldSchema += '   '+array[x]+': '+arrayTypes[x]+',\n';
		}else{
			fieldSchema += '   '+array[x]+': '+arrayTypes[x];
		}
	};
	//Create routes/..
	var wsRoutes = fs.createOutputStream('routes/'+crud+'.js');
	wsRoutes.write("var express = require('express');\nvar router = express.Router();\nvar mongoose = require('mongoose');\nvar "+crud+" = mongoose.model('"+crud+"');\n/* GET "+crud+" listing. */\nrouter.get('/"+crud+"', function(req, res, next) {\n   "+crud+".find(function(err, models){\n     if(err){return next(err)}\n     res.json(models)\n   })\n});\n/* POST - Add "+crud+". */\nrouter.post('/"+crud+"', function(req, res, next){\n   var model = new "+crud+"(req.body);\n   model.save(function(err, data){\n     if(err){return next(err)}\n     res.json(data);\n   })\n});\n/* PUT - Update "+crud+". */\nrouter.put('/"+crud+"/:id', function(req, res){\n   "+crud+".findById(req.params.id, function(err, data){\n"+fields+"     data.save(function(err){\n       if(err){res.send(err)}\n       res.json(data);\n     })\n   })\n});\n/* DELETE - "+crud+". */\nrouter.delete('/"+crud+"/:id', function(req, res){\n   "+crud+".findByIdAndRemove(req.params.id, function(err){\n     if(err){res.send(err)}\n     res.json({message: '"+crud+" delete successful!'});\n   })\n});\nmodule.exports = router;");
	//Create models/..
	var wsModels = fs.createOutputStream('models/'+crud+'.js');
	wsModels.write("var mongoose = require('mongoose');\nvar "+crud+"Schema = new mongoose.Schema({\n"+fieldSchema+"\n});\nmongoose.model('"+crud+"', "+crud+"Schema);");
  	//Add lines to app.js
  	replace({
	    regex: "//ROUTES CRUD BY SCAFFOLDMEANHEROIC",
	    replacement: "//ROUTES CRUD BY SCAFFOLDMEANHEROIC\nvar route_"+crud+" = require('./routes/"+crud+"');",
	    paths: ['app.js'],
	    recursive: true,
	    silent: true,
	});
	replace({
	    regex: "//MODELS CRUD BY SCAFFOLDMEANHEROIC",
	    replacement: "//MODELS CRUD BY SCAFFOLDMEANHEROIC\nvar model_"+crud+" = require('./models/"+crud+".js');",
	    paths: ['app.js'],
	    recursive: true,
	    silent: true,
	});
	replace({
	    regex: "//API ROUTES CRUD BY SCAFFOLDMEANHEROIC",
	    replacement: "//API ROUTES CRUD BY SCAFFOLDMEANHEROIC\napp.use('/api',route_"+crud+");",
	    paths: ['app.js'],
	    recursive: true,
	    silent: true,
	});

	/*		BACK END 		*/


	/*		FRONT END 		*/
	//Views Front
	var tdFields = '',divFields = '',createArguments = '',argService = '',argService2 = '',argService3 = '';
	for (var z = 0; z < array.length; z++) {
		tdFields += "<td at-implicit at-sortable at-attribute='"+array[z]+"' width='150' at-initial-sorting='asc'></td>\n           ";
	}
	for (var x = 0; x < array.length; x++) {
		divFields += '<div class="row"><div class="form-group col-md-12"><label for="'+array[x]+'" class="bold">'+array[x]+'</label><input autofocus required name="'+array[x]+'" type="text" class="form-control" ng-model="item.'+array[x]+'"></div></div>\n       ';
	}
	for (var xx = 0; xx < array.length; xx++) {
		if(xx < (array.length-1)){
			createArguments += '$scope.item.'+array[xx]+',';
		}else{
			createArguments += '$scope.item.'+array[xx];
		}
	};

	for (var yy = 0; yy < array.length; yy++) {
		if(yy < (array.length-1)){
			argService += array[yy]+',';
		}else{
			argService += array[yy];
		}
	};
	for (var zz = 0; zz < array.length; zz++) {
		if(zz < (array.length-1)){
			argService2 += array[zz]+': '+array[zz]+',';
		}else{
			argService2 += array[zz]+': '+array[zz];
		}
	};
	for (var uu = 0; uu < array.length; uu++) {
		if(uu < (array.length-1)){
			argService3 += array[uu]+': $scope.item.'+array[uu]+',';
		}else{
			argService3 += array[uu]+': $scope.item.'+array[uu];
		}
	};
	var wsIndex = fs.createOutputStream('public/templates/'+crud+'/index.html');
	wsIndex.write('<div class="page-wrapper">\n   <div class="row div-padding">\n     <button ng-click="open()" class="btn btn-default "><i class="fa fa-plus"></i> Create New</button>\n     <div class="alert alert-{{alert}}" ng-show="msjAlert">{{message}}</div>\n   </div>\n   <div class="row">\n     <div class="input-group">\n       <span class="input-group-addon" id="basic-addon1"><i class="fa fa-search"></i></span>\n       <input ng-model="searchText" type="text" class="form-control" placeholder="Search" aria-describedby="basic-addon1">\n     </div>\n     <table ng-hide="preloader" class=" col-lg-12 table table-bordered table-hover table-striped" at-table at-paginated at-list="'+crud+'List | filter:searchText" at-config="configTable">\n       <thead></thead>\n       <tbody>\n         <tr>\n           '+tdFields+'\n           <td at-implicit at-attribute="Acción" width="250"><button type="button" class="btn btn-default" ng-click="open(item)"><i class="fa fa-pencil-square-o"></i></button><button type="button" class="btn btn-default" ng-click="openDelete(item)"><i class="fa fa-trash-o"></i></button></td>\n         </tr>\n       </tbody>\n     </table>\n     <div class="col-md-6 col-md-offset-3" ><at-pagination ng-hide="preloader" at-list="'+crud+'List" at-config="configTable"></at-pagination></div>\n     <div class="row col-lg-offset-6 col-md-offset-6 col-xs-offset-6" ng-hide="!preloader"><i class="fa fa-spinner fa-spin fa-5x position-spinner"></i></div>\n   </div>\n</div>');
	var wsDelete = fs.createOutputStream('public/templates/'+crud+'/modalDelete.html');
	wsDelete.write('<div class="modal-header">\n   <h3 class="modal-title">¿Está seguro?</h3>\n</div>\n<div class="modal-body clearfix">\n   <i class="pull-left fa fa-trash-o fa-3x" />\n   <div class="pull-left">\n     ¿Está seguro que desea borrar el Registro?\n     <div>\n       <h4>{{item.'+array[0]+'}}</h4>\n     </div>\n   </div>\n</div>\n<div class="modal-footer">\n   <button ng-hide="deleting" class="btn btn-default" ng-click="$dismiss()">Cancelar</button>\n    <button autoselect class="btn btn-default" type="button" ng-click="ok()"><span ng-hide="deleting">Eliminar</span><i ng-show="deleting" class="fa fa-spinner fa-spin"></i></button>\n</div>');
	var wsCreate = fs.createOutputStream('public/templates/'+crud+'/modalCreate.html');
	wsCreate.write('<div class="modal-header">\n   <div class="pull-right">\n     <button type="button" class="close pull-right" ng-click="$dismiss()">&times;</button>\n   </div>\n<div>\n   <h3 class="modal-title" ng-if="!item._id">Create</h3>\n   <h3 class="modal-title" ng-if="item._id">Edit</h3>\n</div>\n</div>\n<div>\n<form name="myForm" ng-submit="save()" method="POST">\n   <div class="modal-body">\n     <fieldset>\n       '+divFields+'\n     </fieldset>\n</div>\n<div class="modal-footer">\n   <button ng-disabled="myForm.$invalid || myForm.$pristine" class="btn btn-primary pull-right" type="submit" title="Save"><span ng-if="saving"><i class="fa fa-spinner fa fa-spin"></i>&nbsp;</span><span>Save</span></button>\n</div>\n</form>\n</div>');
	//Controllers Front
	var wsIndexController = fs.createOutputStream('public/javascripts/controllers/'+crud+'/indexController.js');
	wsIndexController.write(".controller('"+crud+"Controller',\n  ['$rootScope','$scope', '$location', '"+crud+"Service','$uibModal',\n  function ($rootScope,$scope, $location, "+crud+"Service,$uibModal) {\n    $scope.titleController = 'MEAN-CASE SUPER HEROIC';\n    $rootScope.titleWeb = '"+crud+"';\n    $scope.preloader = true;\n    $scope.msjAlert = false;\n    "+crud+"Service.all"+crud+"().then(function(data) {\n      $scope."+crud+"List = data;\n      $scope."+crud+"Temp = angular.copy($scope."+crud+"List);\n      $scope.preloader = false;\n    });\n    /*  Modal */\n     $scope.open = function (item) {\n       var modalInstance = $uibModal.open({\n        animation: true,\n        templateUrl: 'templates/"+crud+"/modalCreate.html',\n        controller: 'modal"+crud+"CreateController',\n        size: 'lg',\n        resolve: {\n         item: function () {\n          return item;\n         }\n        }\n      });\n      modalInstance.result.then(function(data) {\n        if(!item) {\n           $scope."+crud+"List.push(data);\n           $scope."+crud+"Temp = angular.copy($scope."+crud+"List);\n        }\n      },function(result){\n      $scope."+crud+"List = $scope."+crud+"Temp;\n      $scope."+crud+"Temp = angular.copy($scope."+crud+"List);\n    });\n  };\n  /*  Delete  */\n  $scope.openDelete = function (item) {\n    var modalInstance = $uibModal.open({\n      animation: true,\n      templateUrl: 'templates/"+crud+"/modalDelete.html',\n      controller: 'modal"+crud+"DeleteController',\n      size: 'lg',\n      resolve: {\n        item: function () {\n           return item;\n        }\n      }\n    });\n    modalInstance.result.then(function(data) {\n      var idx = $scope."+crud+"List.indexOf(data);\n      $scope."+crud+"List.splice(idx, 1);\n      "+crud+"Service\n        .del(data._id)\n        .then(function(result) {\n          $scope.msjAlert = true;\n          $scope.alert = 'success';\n          $scope.message = result.message;\n        })\n        .catch(function(err) {\n          $scope.msjAlert = true;\n          $scope.alert = 'danger';\n          $scope.message = 'Error '+err;\n        })\n      });\n    };\n}])");
	var wsDeleteController = fs.createOutputStream('public/javascripts/controllers/'+crud+'/modal'+crud+'DeleteController.js');
	wsDeleteController.write(".controller('modal"+crud+"DeleteController',\n  ['$scope', '$uibModalInstance', 'item',\n  function ($scope, $uibModalInstance, item) {\n    $scope.item = item;\n    $scope.ok = function () {\n      $uibModalInstance.close($scope.item);\n    };\n    $scope.cancel = function () {\n       $uibModalInstance.dismiss('cancel');\n     };\n}])");
	var wsCreateController = fs.createOutputStream('public/javascripts/controllers/'+crud+'/modal'+crud+'CreateController.js');
	wsCreateController.write(".controller('modal"+crud+"CreateController',\n  ['$scope', '$uibModalInstance', 'item','"+crud+"Service',\n  function ($scope, $uibModalInstance, item,"+crud+"Service) {\n    $scope.item = item;\n    $scope.saving = false;\n    $scope.save = function () {\n      if(!item){\n        $scope.saving = true;\n        item = {"+argService3+"};\n        "+crud+"Service.create("+createArguments+").then(function(r){\n          $scope.saving = false;\n          $uibModalInstance.close(r);\n        });\n      }else{\n        "+crud+"Service.edit("+createArguments+",$scope.item._id).then(function(r){\n         $scope.saving = false;\n          $uibModalInstance.close(item);\n        });\n      }\n    };\n}])");
	var wsServise = fs.createOutputStream('public/javascripts/helpers/'+crud+'Service.js');
	wsServise.write(".factory('"+crud+"Service',\n  ['$q', '$http',\n  function ($q, $http) {\n    return ({\n      all"+crud+": all"+crud+",\n      create: create,\n      del : del,\n      edit   : edit\n    });\n    function all"+crud+" () {\n      var defered = $q.defer();\n      var promise = defered.promise;\n      $http.get('/api/"+crud+"')\n        .success(function(data) {\n          defered.resolve(data);\n        })\n        .error(function(err) {\n          defered.reject(err)\n        });\n      return promise;\n    }\n    function del (id) {\n      var defered = $q.defer();\n      var promise = defered.promise;\n      $http.delete('/api/"+crud+"/' + id)\n        .success(function(data) {\n           defered.resolve(data);\n        })\n        .error(function(err) {\n          defered.reject(err)\n        });\n      return promise;\n    }\n    function create("+argService+") {\n      var deferred = $q.defer();\n       $http.post('/api/"+crud+"', {"+argService2+"})\n        .success(function (data, status) {\n          deferred.resolve(data);\n       })\n        .error(function (data) {\n          deferred.reject(data);\n        });\n      return deferred.promise;\n    }\n    function edit("+argService+",id) {\n      var deferred = $q.defer();\n       $http.put('/api/"+crud+"/'+id, {"+argService2+"})\n        .success(function (data, status) {\n          deferred.resolve(data);\n        })\n        .error(function (data) {\n          deferred.reject(data);\n        });\n      return deferred.promise;\n    }\n}])");
	var wsConfig = fs.createOutputStream('public/javascripts/controllers/'+crud+'/_config.js');
	wsConfig.write(".config(function ($routeProvider) {\n  $routeProvider\n    .when('/"+crud+"', {\n      templateUrl: '/templates/"+crud+"/index.html',\n      controller: '"+crud+"Controller',\n      access: {\n        restricted: false,\n       rol: 1\n      }\n    });\n })");
	/*		FRONT END 		*/
	/*		SAVE MENU       */
	var menu = new ModelMenu();
	menu.name = crud;
	menu.save();
	/*		SAVE MENU       */



   	res.json({status: 'Crud Successful! your route is: ',route:crud});

  	
});



router.post('/upload', function(req, res) {

   var path = req.files.file.path
   var newPath = 'tmp/'+req.body.name+'.zip'

   var is = fss.createReadStream(path)
   var os = fss.createWriteStream(newPath)

   is.pipe(os)

   is.on('end', function() {
      //eliminamos el archivo temporal
      fss.unlinkSync(path)
   })
   var layout = new ModelSetup({
        name: req.body.name,
        label:((req.body.name).toLowerCase()).replace(/ /g,"-")
    });
    layout.save();

    ModelGeneralConfig.findOne({meanCase:"meancase"}, function (err, data) {
		data.template = req.body.name;
		data.save();
	})

   setTimeout(function() {
   	fss.createReadStream(newPath).pipe(unzip.Extract({ path: 'views/' }));
    res.send('Upload file success!');
   }, 8000);
   
   
   
})

router.put('/updateTemplate', function (req, res) {
	ModelGeneralConfig.findOne({meanCase:"meancase"}, function (err, data) {
		data.template = req.body.template;
		data.save(function (err) {
			if (err) {
				res.send(err)
			}

			res.send(true);
		})
	})
})



module.exports = router;
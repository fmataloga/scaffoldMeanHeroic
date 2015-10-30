var express = require('express');
var router = express.Router();
var fss = require('fs');
var fs = require('fs-extra');
var replace = require("replace");
/* GET home page. */
router.get('/prueba', function(req, res, next) {
 
 res.json({status: 'Registration successful!'});

});

/* General Cruds. */

router.get('/cruds', function(req, res, next) {
	var crud = "pruebas",fields='',fieldSchema='';
	var inputs = "name,lastName,email,age";
	var array = inputs.split(',');
	var inputsType = "String,String,String,Number";
	var arrayTypes = inputsType.split(',');
	/*		BACK END 		*/
	for (var i = 0; i < array.length; i++) {
		if(i < array.length){
			fields += '     data.field'+(i+1)+' = '+'req.body.'+array[i]+';\n';
		}else{
			fields += '     data.field'+(i+1)+' = '+'req.body.'+array[i]+';';
		}
	}
	var inputsType = "String,String,String,Number";
	var arrayTypes = inputsType.split(',');
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
	var tdFields = '',divFields = '',createArguments = '';
	for (var z = 0; z < array.length; z++) {
		tdFields += "<td at-implicit at-sortable at-attribute='"+array[z]+"' width='150' at-initial-sorting='asc'>{{item."+array[z]+"}}</td>\n           ";
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

	var wsIndex = fs.createOutputStream('public/templates/'+crud+'/index.html');
	wsIndex.write('<div class="page-wrapper">\n   <div class="row div-padding">\n     <button ng-click="open("md")" class="btn btn-default "><i class="fa fa-plus"></i> Create New</button>\n     <div class="alert alert-{{alert}}" ng-show="msjAlert">{{message}}</div>\n   </div>\n   <div class="row">\n     <div class="input-group">\n       <span class="input-group-addon" id="basic-addon1"><i class="fa fa-search"></i></span>\n       <input ng-model="searchText" type="text" class="form-control" placeholder="Search" aria-describedby="basic-addon1">\n     </div>\n     <table ng-hide="preloader" class=" col-lg-12 table table-bordered table-hover table-striped" at-table at-paginated at-list="'+crud+'List | filter:searchText" at-config="configTable">\n       <thead></thead>\n       <tbody>\n         <tr>\n           '+tdFields+'\n           <td at-implicit at-attribute="Acción" width="250"><button type="button" class="btn btn-default" ng-click="open("lg",item)"><i class="fa fa-pencil-square-o"></i></button><button type="button" class="btn btn-default" ng-click="openDelete("lg",item)"><i class="fa fa-trash-o"></i></button></td>\n         </tr>\n       </tbody>\n     </table>\n     <div class="col-md-6 col-md-offset-3" ><at-pagination ng-hide="preloader" at-list="'+crud+'List" at-config="configTable"></at-pagination></div>\n     <div class="row col-lg-offset-6 col-md-offset-6 col-xs-offset-6" ng-hide="!preloader"><i class="fa fa-spinner fa-spin fa-5x position-spinner"></i></div>\n   </div>\n</div>');
	var wsDelete = fs.createOutputStream('public/templates/'+crud+'/modalDelete.html');
	wsDelete.write('<div class="modal-header">\n   <h3 class="modal-title">¿Está seguro?</h3>\n</div>\n<div class="modal-body clearfix">\n   <i class="pull-left fa fa-trash-o fa-3x" />\n   <div class="pull-left">\n     ¿Está seguro que desea borrar el Registro?\n     <div>\n       <h4>{{item.'+array[0]+'}}</h4>\n     </div>\n   </div>\n<div class="modal-footer">\n   <button ng-hide="deleting" class="btn btn-default" ng-click="$dismiss()">Cancelar</button>\n    <button autoselect class="btn btn-default" type="button" ng-click="ok()"><span ng-hide="deleting">Eliminar</span><i ng-show="deleting" class="fa fa-spinner fa-spin"></i></button>\n</div>');
	var wsCreate = fs.createOutputStream('public/templates/'+crud+'/modalCreate.html');
	wsCreate.write('<div class="modal-header">\n   <div class="pull-right">\n     <button type="button" class="close pull-right" ng-click="$dismiss()">&times;</button>\n   </div>\n</div>\n<div>\n   <h3 class="modal-title" ng-if="!item._id">Create</h3>\n   <h3 class="modal-title" ng-if="item._id">Edit</h3>\n</div>\n</div>\n<div>\n<form name="myForm" ng-submit="save()" method="POST">\n   <div class="modal-body">\n     <fieldset>\n       '+divFields+'\n     </fieldset>\n</div>\n<div class="modal-footer">\n   <button ng-disabled="myForm.$invalid" class="btn btn-primary pull-right" type="submit" title="Save"><span ng-if="saving"><i class="fa fa-spinner fa fa-spin"></i>&nbsp;</span><span>Save</span></button>\n</div>\n</form>\n</div>');
	//Controllers Front
	var wsIndexController = fs.createOutputStream('public/javascripts/controllers/'+crud+'/indexController.js');
	wsIndexController.write(".controller('"+crud+"Controller',\n  ['$rootScope','$scope', '$location', '"+crud+"Service','$uibModal',\n  function ($rootScope,$scope, $location, "+crud+"Service,$uibModal) {\n    $scope.titleController = 'MEAN-CASE SUPER HEROIC';\n    $rootScope.titleWeb = '"+crud+"';\n    $scope.preloader = true;\n    $scope.msjAlert = false;\n    "+crud+"Service.all"+crud+"().then(function(data) {\n      $scope."+crud+"List = data;\n      $scope."+crud+"Temp = angular.copy($scope."+crud+"List);\n      $scope.preloader = false;\n    });\n    /*  Modal */\n     $scope.open = function (size,item) {\n       var modalInstance = $uibModal.open({\n        animation: true,\n        templateUrl: 'templates/"+crud+"/modalCreate.html',\n        controller: 'modal"+crud+"CreateController',\n        size: size,\n        resolve: {\n         item: function () {\n          return item;\n         }\n        }\n      });\n      modalInstance.result.then(function(data) {\n        if(!data._id) {\n           $scope."+crud+"List.push(data);\n           $scope."+crud+"Temp = angular.copy($scope."+crud+"List);\n        }\n      },function(result){\n      $scope."+crud+"List = $scope."+crud+"Temp;\n      $scope."+crud+"Temp = angular.copy($scope."+crud+"List);\n    });\n  };\n  /*  Delete  */\n  $scope.openDelete = function (size,item) {\n    var modalInstance = $uibModal.open({\n      animation: true,\n      templateUrl: 'templates/"+crud+"/modalDelete.html',\n      controller: 'modal"+crud+"DeleteController',\n      size: size,\n      resolve: {\n        item: function () {\n           return item;\n        }\n      }\n    });\n    modalInstance.result.then(function(data) {\n      var idx = $scope."+crud+"List.indexOf(data);\n      $scope."+crud+"List.splice(idx, 1);\n      "+crud+"Service\n        .delete"+crud+"(data._id)\n        .then(function(result) {\n          $scope.msjAlert = true;\n          $scope.alert = 'success';\n          $scope.message = result.message;\n        })\n        .catch(function(err) {\n          $scope.msjAlert = true;\n          $scope.alert = 'danger';\n          $scope.message = 'Error '+err;\n        })\n      });\n    };\n}])");
	var wsDeleteController = fs.createOutputStream('public/javascripts/controllers/'+crud+'/modal'+crud+'DeleteController.js');
	wsDeleteController.write(".controller('modal"+crud+"DeleteController',\n  ['$scope', '$modalInstance', 'item',\n  function ($scope, $modalInstance, item) {\n    $scope.item = item;\n    $scope.ok = function () {\n      $modalInstance.close($scope.item);\n    };\n    $scope.cancel = function () {\n       $modalInstance.dismiss('cancel');\n     };\n}])");
	var wsCreateController = fs.createOutputStream('public/javascripts/controllers/'+crud+'/modal'+crud+'CreateController.js');
	wsCreateController.write(".controller('modal"+crud+"CreateController',\n  ['$scope', '$modalInstance', 'item','"+crud+"Service',\n  function ($scope, $modalInstance, item,"+crud+"Service) {\n    $scope.item = item;\n    $scope.saving = false;\n    $scope.save = function () {\n      if(!item){\n        $scope.saving = true;\n        "+crud+"Service.create("+createArguments+").then(function(r){\n          $scope.saving = false;\n        });\n      }else{\n        "+crud+"Service.edit("+createArguments+").then(function(r){\n         $scope.saving = false;\n        });\n      }\n    };\n}])");
	/*		FRONT END 		*/
  	res.status(200).json({status: 'Crud Successful!'});
});



module.exports = router;
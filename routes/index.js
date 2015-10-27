var express = require('express');
var router = express.Router();
var fss = require('fs');
var fs = require('fs-extra');
var replace = require("replace");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* General Cruds. */

router.get('/cruds', function(req, res, next) {
	var crud = "pruebas",fields='',fieldSchema='';
	var inputs = "name,lastName,email,age";
	var array = inputs.split(',');
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
  	res.status(200).json({status: 'Crud Successful!'});
});

module.exports = router;
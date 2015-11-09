var app = angular.module("optimumModel", []);
 
app.factory("$optimumModel", function($q,$http)
{
	
	var url = '';
    var methods = [];
    // instantiate our initial object
    var optimumModel = function() {
        this.initialize.apply(this, arguments); 
    };
    for (var property in methods) { 
        var tmp = methods[property]
        optimumModel.prototype[tmp] = "";
    }
    if (!optimumModel.prototype.initialize) optimumModel.prototype.initialize = function(){};  

    optimumModel.prototype.getAll = function() {
    	var defered = $q.defer();
        var promise = defered.promise;
        $http.get(this.url)
            .success(function(data) {
                defered.resolve(data);
            })
            .error(function(err) {
                defered.reject(err)
            });
        this.prueba = promise;
        return promise;
    };
    optimumModel.prototype.create = function(){
        var methods = ['apellidos','edad','sexo'];
        for (var property in methods) { 
            var tmp = methods[property]
            optimumModel.prototype[tmp] = "";
        }
        if (!optimumModel.prototype.initialize) optimumModel.prototype.initialize = function(){}; 
        return optimumModel;
    };

    return optimumModel;


});




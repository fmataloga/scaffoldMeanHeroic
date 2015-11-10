var app = angular.module("optimumModel", []);
 
app.factory("$optimumModel", function($q,$http)
{	
	this.url = '';
    this.constructorModel;
    var methods = [];
    // instantiate our initial object
    var optimumModel = function() {
        this.initialize.apply(this, arguments); 
    };

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
        return promise;
    };
    optimumModel.prototype.create = function(){
        var methods = this.constructorModel;
        for (var property in methods) { 
            var tmp = methods[property]
            optimumModel.prototype[tmp] = "";
        }
        return optimumModel.prototype;
    };
    optimumModel.prototype.save = function(){
        var c = optimumModel.prototype;
        var obj = '';
        angular.forEach(c, function(value, key) {
            if(typeof value !== "function"){
                 obj += key+ ': '+'this.'+key+',';
            }
        });
        var pos = obj.lastIndexOf(",");
        obj = obj.slice(0,-1)
        var parameters =  eval('({' + obj + '})');
        //Promise Ajax Insert
        var defered = $q.defer();
        var promise = defered.promise;
        $http.post('/api/register',parameters)
            .success(function (data, status) {
              defered.resolve(data);
            })
            .error(function (data) {
              defered.reject();
            });
        return promise;

    };
    return optimumModel;


});




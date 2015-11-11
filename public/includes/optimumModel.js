var app = angular.module("optimumModel", []);
 
app.factory("$optimumModel", function($q,$http)
{	
	this.url = '';
    this.idd = '';
    this.isUpdate = false;
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
    function createConstruct(methods,id){    
        for (var property in methods) { 
                var tmp = methods[property]
                optimumModel.prototype[tmp] = "";
        }        
    }
    optimumModel.prototype.create = function(){
        this.isUpdate = false;
        var methods = this.constructorModel;
        createConstruct(methods);
        return optimumModel.prototype;
    };
    optimumModel.prototype.findById = function(id){
        this.isUpdate = true;
        this.idd = id;
        var methods = this.constructorModel;
        createConstruct(methods);
        var defered = $q.defer();
        var promise = defered.promise;
        $http.get(this.url+'/'+id)
            .success(function(data) {
                defered.resolve(data);
            })
            .error(function(err) {
                defered.reject(err)
            });
        return promise;
        //return optimumModel.prototype;
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
        if(!this.isUpdate){
               $http.post('/api/register',parameters)
                .success(function (data, status) {
                  defered.resolve(data);
                })
                .error(function (data) {
                  defered.reject();
                });
                return promise; 
        }else{
            $http.put(this.url+'/'+this.idd,parameters)
                .success(function (data, status) {
                  defered.resolve(data);
                })
                .error(function (data) {
                  defered.reject();
                });
            return promise;
        }
        

    };
    return optimumModel;


});




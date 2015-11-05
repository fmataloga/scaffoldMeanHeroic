var app = angular.module("optimumModel", []);
 
app.factory("$optimumModel", function($q,$http)
{
	
	 var url = '';
    // instantiate our initial object
    var optimumModel = function() {
    };
    optimumModel.prototype.getAll = function(uri) {
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
    return optimumModel;


});


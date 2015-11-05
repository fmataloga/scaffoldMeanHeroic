var myApp = angular.module('setupApp', ['ngBootbox']);

myApp.controller('setupAppController', ['$scope', 'setupInitService', '$ngBootbox', function ($scope, setupInitService, $ngBootbox) {
    $scope.templateClass = false;
    $scope.submitBtn = true;
    $scope.re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    $scope.ve = true;

    $scope.validate = function () {
        if(!$scope.projectName ||  !$scope.username || !$scope.password || !$scope.passwordConfirm || !$scope.ve || ($scope.password != $scope.passwordConfirm) || !$scope.template){
            $scope.submitBtn = true;
        }else{
            $scope.submitBtn = false;
        }
    };

    $scope.valEmail = function(){
        $scope.ve = $scope.re.test($scope.email);
        //console.log($scope.ve)
        $scope.validate();
    }

    setupInitService.allLayouts().then(function (data) {
        $scope.layouts = data;
    });

    $scope.selectTemplate = function (layout, index) {
        $scope.template = layout;
        $scope.index = index;
        $scope.validate();
    };

    $scope.setupConfig = function () {
        console.log($scope.projectName);
        console.log($scope.username);
        console.log($scope.password);
        console.log($scope.email);
        console.log($scope.template);
    };

}]);

myApp.factory('setupInitService',
    ['$q', '$http',
        function ($q, $http) {
            return ({
                allLayouts: allLayouts
            });

            function allLayouts() {
                var defered = $q.defer();
                var promise = defered.promise;

                $http.get('/setup/layouts')
                    .success(function (data) {
                        defered.resolve(data);
                    })
                    .error(function (err) {
                        defered.reject(err)
                    });

                return promise;
            }
        }]);
.controller('crudController',
    ['$scope', 'crudService',
        function ($scope, crudService) {
            $scope.spinner = false;
            $scope.fieldName = [];
            $scope.showOnView = [];
            var stringFields = "";
            var stringDataTypes = "";
            var stringShowOnView = "";
            $scope.collection = [{
                field: '',
                dataType: '',
                showOnView: ''
            }];

            // remove the "Remove" Header and Body when only left one document
            $scope.firstRow = function () {
                if ($scope.collection[1])
                    return false;
                else
                    return true;
            };


            $scope.dataTypes = [
                {
                    id: 1,
                    name: 'String'
                },
                {
                    id: 2,
                    name: 'Number'
                },
                {
                    id: 3,
                    name: 'Boolean'
                },
                {
                    id: 4,
                    name: 'Array'
                }];

            // expose a function to add new (blank) rows to the model/table
            $scope.addRow = function () {
                // push a new object with some defaults
                $scope.collection.push({
                    field: $scope.fieldName[0],
                    dataType: $scope.dataTypes[0],
                    showOnView: $scope.showOnView[0]
                });
            }

            $scope.removeRow = function (index) {
                $scope.collection.splice(index, 1);
            }

            $scope.validate = function () {
                $scope.spinner = true;
                var cont = 0;
                angular.forEach($scope.collection, function (value, key) {
                    cont++;
                    if (cont != $scope.collection.length) {
                        stringFields += value.field + ",";
                        stringDataTypes += value.dataType.name + ",";
                        stringShowOnView += value.showOnView + ",";
                    } else {
                        stringFields += value.field;
                        stringDataTypes += value.dataType.name;
                        stringShowOnView += value.showOnView;
                    }
                });
                crudService.generar($scope.schemeName, stringFields, stringDataTypes, stringShowOnView).then(function (result) {
                    $scope.spinner = false;
                    $scope.result = result;
                });
            }

        }])

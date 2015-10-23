.
controller('setupController',
    ['$scope',
        function ($scope) {


//initialize data on first Row
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

            $scope.fieldName = [];
            $scope.showOnView = [];
            var stringFields = "";
            var stringDataTypes = "";
            var stringShowOnView = "";

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


                $scope.prueba = $scope.collection;

            }

            $scope.removeRow = function (index) {
                $scope.collection.splice(index, 1);
            }


            $scope.validate = function () {

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
                console.log(
                    "fields = " + stringFields + " " +
                    "dataTypes = " + stringDataTypes + " " +
                    "showOnView = " + stringShowOnView
                )
            }


        }])

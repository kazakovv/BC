app.controller('EditBabyProgressController',['$scope', '$state','passBaby', 'backendlessClasses',
    function($scope,$state,passBaby, backendlessClasses){


        //get baby object passed from the passBaby service
        var babyObject = passBaby.getBabyObject();

        $scope.dropDownOptions = [
            "Weight",
            "Height"
        ];
        $scope.init = function () {


            if(typeof babyObject == "undefined"){
                $state.go('login');
            } else {
                var weights;
                var heights;

                $scope.baby = babyObject;
                if(!! babyObject.weight  ){
                    weights = JSON.parse(babyObject.weight);
                    $scope.weights = weights;
                } else{
                    $scope.weights = [];
                }
                if(!! babyObject.height  ){
                    heights = JSON.parse(babyObject.height);
                    $scope.heights = heights;
                } else {
                    $scope.heights = [];
                }

                $scope.changeProperty();
            }

        };


        //dropdown with options ng-click function
        $scope.changeProperty = function(){


            if ($scope.baby.dropDownOption === 'Weight') {
                $scope.arrayToDisplay = $scope.weights;
            } else if ($scope.baby.dropDownOption === 'Height') {
                $scope.arrayToDisplay = $scope.heights;
            }


        };

        $scope.addValue = function(){

            $scope.newValue = {
                date:"",
                value:""
            };


            if($scope.arrayToDisplay == null){
                $scope.arrayToDisplay = [];
            }

            $scope.arrayToDisplay.push($scope.newValue);
        };



        $scope.removeValue = function(index){
            $scope.arrayToDisplay.splice(index, 1);
            //todo remove from database
        };

        $scope.saveProperties = function(){

            function changeFormatOfDates(array){
                for(i=0; i< array.length; i++){
                    array[0].date = new Date(array[0].date);
                }

                return array;
            }
            //update babyObject with weights
            if($scope.baby.dropDownOption === 'Weight'){
                $scope.weights = changeFormatOfDates($scope.weights);

                babyObject.weight = JSON.stringify($scope.weights);

                //update table with heights
            } else if ($scope.baby.dropDownOption ==='Height'){
                $scope.heights = changeFormatOfDates($scope.heights);
                babyObject.height = JSON.stringify($scope.heights);
            }


            //****** upload in backendless *****

            //get baby table from backendlessClasses service
            var Baby = backendlessClasses.babyTable();

            babyObject = angular.copy(babyObject); //remove $$hashkey added by angular
            var saved = Backendless.Persistence.of( Baby ).save( babyObject, new Backendless.Async( savedBaby, gotError ));
            function gotError( err ) // see more on error handling
            {
                console.log( "error message - " + err.message );
                console.log( "error code - " + err.statusCode );
            }
            function savedBaby(baby) {
                alert("The data was saved");
            }
            // *** end of upload in backendless ***

        };

}]);

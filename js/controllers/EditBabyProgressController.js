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
                    //change format of dates otherwise an error is generated
                    for(i=0;i < $scope.weights.length; i++){
                        $scope.weights[i].date = new Date($scope.weights[i].date);
                    }
                    //order the array
                    $scope.weights.sort(custom_sort);
                } else{
                    $scope.weights = [];
                }
                if(!! babyObject.height  ){
                    heights = JSON.parse(babyObject.height);
                    $scope.heights = heights;
                    //change format of dates otherwise an error is generated
                    for(i=0; i < $scope.heights.length; i++){
                        $scope.heights[i].date = new Date($scope.heights[i].date);
                    }
                    $scope.heights.sort(custom_sort);
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

        $scope.checkDate = function(data){

            if(data == ''){
                return "Please enter a date";
            }
            //check if a date before the birthday of the baby was selected

            var babyBirthDate = new Date($scope.baby.birthdate);
            var dateSelected = new Date(data);
            var difference =  dateSelected.getDate() - babyBirthDate.getDate();


            if(difference < 0){
                return "The selected date is before the birthday of your baby";
            }
        };

        $scope.checkValue = function (data) {


            if(data == ''){
                return "Please enter a value";
            } else if(data <= 0){
                return "Please enter a positive value";
            }

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
                //sort the array
                $scope.weights.sort(custom_sort);
                babyObject.weight = JSON.stringify($scope.weights);

                //update table with heights
            } else if ($scope.baby.dropDownOption ==='Height'){
                $scope.heights = changeFormatOfDates($scope.heights);
                //sort the array
                $scope.heights.sort(custom_sort);
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


        //sort the JSON array by date before we pass it on to graph chart
        function custom_sort(a, b) {
            return new Date(a.date) - new Date(b.date);
        }


} ]);

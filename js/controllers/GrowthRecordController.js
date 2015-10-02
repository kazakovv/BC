/**
 * Created by Victor on 10/1/2015.
 */

app.controller('GrowthRecordController',['$scope', '$state','passBaby', 'backendlessClasses',
    function($scope,$state,passBaby, backendlessClasses){

        //get baby object passed from the passBaby service
        var babyObject = passBaby.getBabyObject();

        var currentUser;

        $scope.init = function () {


            if(typeof babyObject == "undefined"){
                $state.go('login');
            } else {

                $scope.baby = babyObject;
                if(!! babyObject.growthRecords  ){
                    growthRecords = JSON.parse(babyObject.growthRecords);
                    $scope.growthRecords = growthRecords;
                    //change format of dates otherwise an error is generated
                    for(i=0;i < $scope.growthRecords.length; i++){
                        $scope.growthRecords[i].date = new Date($scope.growthRecords[i].date);
                    }
                    //order the array
                    $scope.growthRecords.sort(custom_sort);
                } else{
                    $scope.growthRecords = [];
                }


                //$scope.changeProperty();
            }

        };

        $scope.removeValue = function(index){
            $scope.growthRecords.splice(index, 1);

        };
        $scope.addValue = function(){

            $scope.newValue = {
                date:"",
                weight:"",
                height:"",
                cfr:""
            };


            if($scope.growthRecords == null){
                $scope.growthRecords = [];
            }

            $scope.growthRecords.push($scope.newValue);
        };

        $scope.saveArray = function(){
          //sort the local array with the growth values on save
            $scope.growthRecords.sort(custom_sort);
        };
        $scope.saveProperties = function(){

            function changeFormatOfDates(array){
                for(i=0; i< array.length; i++){
                    array[0].date = new Date(array[0].date);
                }

                return array;
            }
            //change format of weights
            changeFormatOfDates($scope.baby);

            $scope.growthRecords.sort(custom_sort);

            //****** upload in backendless *****

            //get baby table from backendlessClasses service
            var Baby = backendlessClasses.babyTable();
            babyObject.growthRecords = JSON.stringify($scope.growthRecords);
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

        /**************************/
        /* check values in form  */
        /************************/

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

        $scope.checkWeight = function (data) {


            if(data == ''){
                return "Please enter a value";
            } else if(data <= 0){
                return "Please enter a positive value";
            }

        };

        $scope.checkHeight = function (data) {


            if(data == ''){
                return "Please enter a value";
            } else if(data <= 0){
                return "Please enter a positive value";
            }

        };

        $scope.checkCfr = function (data) {


            if(data == ''){
                return "Please enter a value";
            } else if(data <= 0){
                return "Please enter a positive value";
            }

        };



    }]);
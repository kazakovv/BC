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
                    $scope.growthRecords = babyObject.growthRecords;
                    $scope.growthRecords.sort(sortByDate);
                } else{
                    $scope.growthRecords = [];
                }

            }

        };

        $scope.removeValue = function(index){
            $scope.growthRecords.splice(index, 1);

        };
        $scope.addValue = function(){
            var growth = backendlessClasses.growthRecords();
            $scope.newValue = new growth;
            $scope.growthRecords.push($scope.newValue);
        };

        $scope.sortGrowthArray = function(){
          $scope.growthRecords.sort(sortByDate);
        };

        $scope.saveProperties = function(){



            //****** upload in backendless *****

            //get baby table from backendlessClasses service
            var Baby = backendlessClasses.babyTable();
            babyObject.growthRecords = $scope.growthRecords;
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

        function sortByDate(a, b) {
            return new Date(a.dateGrowth).getTime() - new Date(b.dateGrowth).getTime();
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

        $scope.checkLength = function (data) {


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
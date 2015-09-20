/**
 * Created by Victor on 9/12/2015.
 */
app.controller('EditBabyController',['$scope', '$state','passBaby', 'backendlessClasses', function($scope,$state,passBaby, backendlessClasses){

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

            //hide form for adding values. The form is shown by clicking on the add button
            $scope.showAddButtonForm = false;

        }

    };
    $scope.defaultSelection = function(){
        //TODO setup default value
        /*
        if(typeof $scope.baby.dropDownOption != "undefined" ) {


            $scope.baby.dropDownOption = $scope.dropDownOptions[0];
            $scope.changeProperty();
        }
        */
    };

    $scope.saveButtonClick = function(){
        // TODO tozi kod se povtaria v add butona. tr da se iztrie
        //****** upload in backendless *****

        //get baby table from backendlessClasses service
        var Baby = backendlessClasses.babyTable();
        var babyObject = $scope.baby;

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
    $scope.addButtonClick = function() {
        //if the add value form is hidden we show it
        if($scope.showAddButtonForm == false) {
            $scope.showAddButtonForm = true;

        } else {

            //check if date and value was updated
            if(typeof $scope.baby.dateUpdateProperty === 'undefined' ||
                $scope.baby.dateUpdateProperty === '' ) {
                alert("Enter a date"); return;
            }
            if(typeof $scope.baby.valueUpdateProperty === 'undefined' ||
                $scope.baby.valueUpdateProperty === '')  {
                alert("Enter value");
                return;
            }

            var dataToPush =
                             [
                                {
                                    'date': new Date($scope.baby.dateUpdateProperty),
                                    'value': $scope.baby.valueUpdateProperty
                                },
                ];

            //update table with weights
            if($scope.baby.dropDownOption === 'Weight'){
                $scope.weights.push(dataToPush[0]);
                babyObject.weight = JSON.stringify($scope.weights);

            //update table with heights
            } else if ($scope.baby.dropDownOption ==='Height'){
                $scope.heights.push(dataToPush[0]);
                babyObject.height = JSON.stringify($scope.heights);
            }

            $scope.baby.dateUpdateProperty='';
            $scope.baby.valueUpdateProperty ='';
            //hide form for adding values. The form is shown by clicking on the add button
            $scope.showAddButtonForm = false;

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
        } // end of add putton click function
    };
    $scope.changeProperty = function(){

        console.log('dropdown option: ' + $scope.baby.dropDownOption);

            if ($scope.baby.dropDownOption === 'Weight') {
                $scope.arrayToDisplay = $scope.weights;
            } else if ($scope.baby.dropDownOption === 'Height') {
                $scope.arrayToDisplay = $scope.heights;
            }


    }



}]);

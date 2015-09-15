/**
 * Created by Victor on 9/12/2015.
 */
app.controller('EditBabyController',['$scope', '$state','passBaby', function($scope,$state,passBaby){

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

    $scope.addButtonClick = function() {
        //if the add value form is hidden we show it
        if($scope.showAddButtonForm == false) {
            $scope.showAddButtonForm = true;
        } else {
            //TODO upload the JSON Object
            //if the form is shown we update the JSON array

            if($scope.dateUpdateProperty ==='') { return; }
            if($scope.valueUpdateProperty ==='')  { return; }

            var dataToPush =
                             [
                                {
                                    'date': $scope.baby.dateUpdateProperty,
                                    'value': $scope.baby.valueUpdateProperty
                                },
                ];

            if($scope.baby.dropDownOption === 'Weight'){
                //check if array exists and if not create it, else push new value
                $scope.weights.push(dataToPush[0]);


            } else if ($scope.baby.dropDownOption ==='Height'){
                $scope.heights.push(dataToPush[0]);
            }

            $scope.baby.dateUpdateProperty='';
            $scope.baby.valueUpdateProperty ='';
            //hide form for adding values. The form is shown by clicking on the add button
            $scope.showAddButtonForm = false;
        }
    };
    $scope.changeProperty = function(){
            if($scope.baby.dropDownOption ==='Weight'){

                $scope.arrayToDisplay = $scope.weights;
            } else if ($scope.baby.dropDownOption ==='Height'){

                $scope.arrayToDisplay = $scope.heights;
            }

    }



}]);

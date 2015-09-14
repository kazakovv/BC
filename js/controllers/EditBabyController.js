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

            $scope.baby = babyObject
            if(!! babyObject.weight  ){
                weights = JSON.parse(babyObject.weight);
                $scope.weights = weights.values;
            }
            if(!! babyObject.height  ){
                heights = JSON.parse(babyObject.height);
                $scope.heights = heights.values;
            }



            //hide form for adding values. The form is shown by clicking on the add button
            $scope.showAddButtonForm = false;

        }

    };
    $scope.defaultSelection = function(){
        if(typeof $scope.baby.dropDownOption != "undefined" ) {
            $scope.baby.dropDownOption = $scope.dropDownOptions[0];
            $scope.changeProperty();
        }
    };

    $scope.addButtonClick = function() {
        //if the add value form is hidden we show it
        if($scope.showAddButtonForm == false) {
            $scope.showAddButtonForm = true;
        } else {
            //TODO upload the JSON Object
            //if the form is shown we update the JSON array
            if($scope.dateUpdateProperty =='') { alert("empty date");}
            if($scope.valueUpdateProperty =='') { alert("empty value"); }
            alert("executed");
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

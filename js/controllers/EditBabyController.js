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

            $scope.baby = babyObject
            var weights = JSON.parse(babyObject.weight);
            var heights = JSON.parse(babyObject.height);
            $scope.weights = weights.values;
            $scope.heights = heights.values;

        }

    };

    $scope.changeProperty = function(){

    }



}]);

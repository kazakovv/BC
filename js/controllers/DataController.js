/**
 * Created by Victor on 9/12/2015.
 */
app.controller('DataController',['$scope', '$state', function($scope, $state){

    $scope.init = function () {

        //find kids of current user
        var currentUser;

        if(Backendless.UserService.getCurrentUser() != null){
            currentUser = Backendless.UserService.getCurrentUser();
            $scope.kids = currentUser.kids;

        } else {
            //redirect to login screen
            $state.go('login');
        }


    };

}]);

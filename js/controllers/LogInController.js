/**
 * Created by Victor on 9/8/2015.
 */

app.controller('LogInController', ['$scope', '$state', function($scope, $state) {
    $scope.user={};

    $scope.loginBackendless = function(){
        var email = $scope.user.email;
        var password = $scope.user.password;
        var remember = true;

        Backendless.UserService.login(email, password, remember, new Backendless.Async( userLoggedInStatus, gotError ));


        //var logindetails = "User " + $scope.user.username + " password " + $scope.user.password;
        //alert(logindetails);

        function userLoggedInStatus( user ){
            console.log( "user has logged in" );

            $state.go('kids');
        }
        function gotError( err ){ // see more on error handling
            $('input').addClass("redBorder");
            if(error.code != 0){
                createPopup(err.message, 'error');
                console.log( "error message - " + err.message );
                console.log( "error code - " + err.statusCode );
            }
        }
    };


}]);
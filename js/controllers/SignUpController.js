/**
 * Created by Victor on 9/8/2015.
 */
app.controller('SignUpController', ['$scope', function($scope) {

    $scope.user={};

    $scope.signupBackendless = function(){
        var user = new Backendless.User();
        user.email = $scope.user.email;
        user.password = $scope.user.password;

        Backendless.UserService.register( user, new Backendless.Async( userRegistered, gotError ) );

        function userRegistered( user )
        {
            alert( "user has been registered" );
        }

        function gotError( err ) // see more on error handling
        {
            console.log( "error message - " + err.message );
            console.log( "error code - " + err.statusCode );
        }
    };
}]);
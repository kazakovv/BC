app.controller('MainController', ['$scope', '$state', function($scope, $state) {


    $scope.init = function () {

        //find kids of current user
        var currentUser = Backendless.UserService.getCurrentUser();

        if(currentUser != null){
            $scope.kids = currentUser.kids;
        } else {
            //redirect to login screen
            $state.go('login');
        }


    };



    $scope.addBaby = function(){
        if($scope.babyName === ''){return;}
        if($scope.babyBirthDate ===''){return;}

        var babyObject = new Baby({
            name: $scope.babyName,
            birthdate: $scope.babyBirthDate
        });

        var saved = Backendless.Persistence.of( Baby ).save( babyObject, new Backendless.Async( savedBaby, gotError ));

        function savedBaby( baby ){
            alert("baby saved" + baby.name);

            var currentUser = Backendless.UserService.getCurrentUser();
            currentUser.kids.push(baby);
            currentUser = angular.copy(currentUser); //remove $$hashkey added by angular
            Backendless.UserService.update(currentUser, new Backendless.Async( userUpdated, gotError ));
            $scope.kids = currentUser.kids;

            //callback functions for update user
            function gotError( err ) // see more on error handling
            {
                console.log( "error message - " + err.message );
                console.log( "error code - " + err.statusCode );
            }

            function userUpdated( user )
            {
                console.log( "user has been updated" );

            }
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


    function Baby(args){
        args = args || {};
        this.name = args.name || "";
        this.birthdate = args.birthdate || "";

    }



}]);
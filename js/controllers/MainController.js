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

    //Options for boy or girl in dropdown form
    $scope.sexBaby = {
        singleSelect: null,
        availableOptions: [
            {id: '1', name: 'Boy'},
            {id: '2', name: 'Girl'}

        ]
    };

    $scope.baby = {};

    $scope.addBaby = function(){
        if($scope.baby.babyName === ''){return;}
        if($scope.baby.babyBirthDate ===''){return;}
        if($scope.baby.sex ==='') { return; }

        var selectionId = $scope.baby.sex;
        var sexOfBaby = $scope.sexBaby.availableOptions[selectionId -1].name; //minus one because array begins at 0

        var babyObject = new Baby({
            name: $scope.baby.babyName,
            birthdate: $scope.baby.babyBirthDate,
            sex: sexOfBaby
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



    //Baby table for Backendless
    function Baby(args){
        args = args || {};
        this.name = args.name || "";
        this.birthdate = args.birthdate || "";
        this.sex = args.sex || "";
    }



}]);
app.controller('KidsController', ['$scope', '$state', '$filter', 'backendlessClasses',
    function($scope, $state, $filter, backendlessClasses) {


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

    //Options for boy or girl in dropdown form
    $scope.sexBaby = {
        singleSelect: null,
        numberOfSexes: 2,
        availableOptions: [
            {id: 1, name: 'Boy'},
            {id: 2, name: 'Girl'}

        ]
    };

    //function for boy or girl radio button when changing it after creation
    $scope.showSex = function() {
        var selected = $filter('filter')($scope.sexBaby.availableOptions, {id: $scope.sexBaby.numberOfSexes});
        return ($scope.sexBaby.numberOfSexes && selected.length) ? selected[0].name : 'Not set';

    };


    $scope.baby = {};

    $scope.calculateAge = function(dateOfBirth){

        var born = moment(dateOfBirth).format("YYYMMDD");
        var age = moment(born,"YYYYMMDD").fromNow();
        return age;

    };

    $scope.addBaby = function(){
        if($scope.baby.babyName === ''){return;}
        if($scope.baby.babyBirthDate ===''){return;}
        if($scope.baby.sex ==='') { return; }

        var selectionId = $scope.baby.sex;
        var sexOfBaby = $scope.sexBaby.availableOptions[selectionId -1].name; //minus one because array begins at 0


        //get baby table from backendlessClasses service
        var Baby = backendlessClasses.babyTable();
        //create a new baby object


        var babyObject = new Baby({
            name: $scope.baby.babyName,
            birthdate: new Date($scope.baby.babyBirthDate),
            sex: sexOfBaby,
            weight: "",
            height: ""
        });

        var saved = Backendless.Persistence.of( Baby ).save( babyObject, new Backendless.Async( savedBaby, gotError ));

        function savedBaby( baby ){

            //after you save the baby you also update the user

            var currentUser = Backendless.UserService.getCurrentUser();
            if(currentUser.kids != null){
                currentUser.kids.push(baby);
            } else {
                currentUser.kids = baby;
            }
            currentUser = angular.copy(currentUser); //remove $$hashkey added by angular
            Backendless.UserService.update(currentUser, new Backendless.Async( userUpdated, gotError ));



            //callback functions for update user
            function gotError( err ) // see more on error handling
            {
                console.log( "error message - " + err.message );
                console.log( "error code - " + err.statusCode );
            }

            function userUpdated( user )
            {
                console.log( "user has been updated" );
                $scope.$apply(function(){$scope.showform = false});
                $scope.$apply(function(){$scope.kids = currentUser.kids} );
                alert(baby.name + " added");

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

    $scope.showHideAddBaby = function(){
      $scope.showform = ! $scope.showform;
    };

}]);

app.controller('CreateKidsController', ['$scope', '$state', '$filter', 'backendlessClasses',
    function($scope, $state, $filter, backendlessClasses) {

        //find kids of current user

        var currentUser;

        var init = function () {



            if(Backendless.UserService.getCurrentUser() != null){
               currentUser = Backendless.UserService.getCurrentUser();
                //check if current user already has kids
                if(currentUser.kids[0] == null ){
                    $scope.kids =[];
                } else {
                    $scope.kids = currentUser.kids;
                }
            } else {
                //redirect to login screen
                $state.go('login');
            }


        };

        init(); //load default values

        $scope.sexBaby = [
            {value: 1, text: 'Boy'},
            {value: 2, text: 'Girl'},
        ];





        $scope.showSex = function(kid) {
            var selected = [];
            if(kid.sex) {
                selected = $filter('filter')($scope.sexBaby, {value: kid.sex});
            }
            return selected.length ? selected[0].text : 'Not set';
        };








        // remove user
        $scope.removeKid = function(index) {
            //remove locally
            $scope.kids.splice(index, 1);
            //todo remove from database
        };

        // add a kid
        $scope.addBaby = function() {

            var Baby = backendlessClasses.babyTable();
            //create a new baby object


            $scope.babyObject = new Baby({
                name: "",
                birthdate: "",
                sex: "",
                weight: "",
                height: ""
            });

            if($scope.kids != null){
            $scope.kids.push($scope.babyObject);
            } else {
                $scope.kids = [];
            }
        };


        $scope.saveKid = function(data, index){

            //currentUser.kids = $scope.kids;


            var Baby = backendlessClasses.babyTable();
            var babyObject = new Baby();
            babyObject = $scope.kids[index];

            babyObject.name = data.name;
            babyObject.sex = parseInt(data.sex);
            babyObject.birthdate = new Date(data.birthdate);

            babyObject = angular.copy(babyObject);
            var saved = Backendless.Persistence.of(Baby).save(babyObject, new Backendless.Async(savedBaby, gotError));

            function savedBaby(baby){
                //baby object uploaded now create relation with current user
                if(currentUser.kids != null) {
                    currentUser.kids.push(baby);
                } else {
                    currentUser.kids = baby;
                }

                currentUser = angular.copy(currentUser);
                Backendless.UserService.update(currentUser, new Backendless.Async( userUpdated, gotError ));
                function userUpdated( user )
                {
                    console.log( "user has been updated" );
                    currentUser = user;
                    //$scope.kids = user.kids;
                    //init();

                    alert(baby.name + " was successfully added to user " + user.username);

                }
                function gotError( err ) { // see more on error handling

                    console.log( "error message - " + err.message );
                    console.log( "error code - " + err.statusCode );
                } // end of error uploading the current user object


            } //end of saved baby obeject async task

            function gotError(err){
                console.log("Error saving data object " +err.message);
            }



        }; //end of save kid function



    }]);
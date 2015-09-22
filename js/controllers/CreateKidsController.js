
app.controller('CreateKidsController', ['$scope', '$state', '$filter', 'backendlessClasses',
    function($scope, $state, $filter, backendlessClasses) {


        $scope.init = function () {

            //find kids of current user
            var currentUser;

            if(Backendless.UserService.getCurrentUser() != null){
                currentUser = Backendless.UserService.getCurrentUser();
                //check if current user already has kids
                if(typeof currentUser.kids[0] == null ){
                    $scope.kids =[];
                } else {
                    $scope.kids = currentUser.kids;
                }
            } else {
                //redirect to login screen
                $state.go('login');
            }


        };

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

            $scope.kids.push($scope.babyObject);

        };


        $scope.saveKids = function() {
            //data is an array that stores all the information enetered in the form
            //index gives the index in the kids array

            //get baby table from backendlessClasses service
            var Baby = backendlessClasses.babyTable();
            //create a new baby object

            //go through all kids saved in the scope
            for(i=0; i<$scope.kids.length; i++){
                var babyObject = $scope.kids[i];
                //change the format of the date
                babyObject.birthdate = new Date(babyObject.birthdate);
                var foundMatch = false;
                //check if a new kid was created or the properties of an existing one were updated
                var currentUser = Backendless.UserService.getCurrentUser();
                for(j=0; j< currentUser.kids.length; j++) {
                    if(babyObject.objectId == currentUser.kids[j].objectId ){
                        //match found only update baby object
                        foundMatch = true;
                        babyObject = angular.copy(babyObject); //remove $$ hash
                        var saved = Backendless.Persistence.of(Baby).save(babyObject, new Backendless.Async(updatedBaby, gotError));
                        function updatedBaby(baby){
                            alert("The information about " + baby.name + " was updated");
                        }
                        function gotError( err ) { // see more on error handling

                            console.log( "error message - " + err.message );
                            console.log( "error code - " + err.statusCode );
                        }
                    } //end of if statement for found match
                }//end of inner loop with j variable for currentUser.kids array search

                //if no match was found we need to upload the new baby object and create the relation
                // with the current user
                if(foundMatch == false) {
                    babyObject = angular.copy(babyObject); //remove $$ hash
                    var saved = Backendless.Persistence.of(Baby).save(babyObject, new Backendless.Async(savedBaby, gotError));

                    function savedBaby(baby){
                        //baby object successfully uploaded. Now create relation with current user
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

                            alert(baby.name + " was successfully added to user " + user.username);

                        }
                        function gotError( err ) { // see more on error handling

                            console.log( "error message - " + err.message );
                            console.log( "error code - " + err.statusCode );
                        } // end of error uploading the current user object


                    }// ***** end of successful upload of the baby object

                    function gotError( err ) { // see more on error handling

                        console.log( "error message - " + err.message );
                        console.log( "error code - " + err.statusCode );
                    } // end of error uploading the baby object

                }

            }//end of outer with i variable loop to go through all kids


            /*
            var saved = Backendless.Persistence.of(Baby).save(babyObject, new Backendless.Async(savedBaby, gotError));
            function savedBaby( baby ){

                //after you save the baby you also update the user

                var currentUser = Backendless.UserService.getCurrentUser();

                if(currentUser.kids != null){
                    currentUser.kids.push(baby);
                } else {
                    currentUser.kids = baby;
                }
                currentUser = angular.copy(currentUser); //remove $$hashkey added by angular

                //second inner async task for updating the current user
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

                    alert(baby.name + " added");

                }

            } //****end of successfully uploading the new baby and updating the current user

            function gotError( err ){ // error handling for failure to upload the new baby

                if(err.code != 0){

                    console.log( "error message - " + err.message );
                    console.log( "error code - " + err.statusCode );
                }
            }

            */
        } //end of save kids function

    }]);
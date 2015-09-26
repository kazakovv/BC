
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

        $scope.saveKid = function(index){
            //var index = $scope.kids.length -1;
            var Baby = backendlessClasses.babyTable();
            babyObject = $scope.kids[index];
            babyObject = angular.copy(babyObject);

            var saved = Backendless.Persistence.of(Baby).save(babyObject, new Backendless.Async(savedBaby, gotError));

            function savedBaby(baby) {

                var babyObjectExists = false;
                //go through the current user kids array to see if baby object exists
                for(i=0; i< currentUser.kids.length; i++){
                    if(currentUser.kids[i].objectId == baby.objectId ){
                        //the relation to the baby object exists already
                        babyObjectExists = true;
                    }
                }

                if(babyObjectExists == false) {
                    currentUser.kids.push(baby);
                    currentUser = angular.copy(currentUser);
                    Backendless.UserService.update(currentUser, new Backendless.Async(userUpdated, gotError));


                    function userUpdated(user) {
                        console.log("user has been updated");
                        currentUser = user;
                        //$scope.kids = user.kids;
                        //init();

                        alert(baby.name + " was successfully added to user " + user.username);

                    }

                    function gotError(err) { // see more on error handling

                        console.log("error message - " + err.message);
                        console.log("error code - " + err.statusCode);
                    } // end of error uploading the current user object

                }//end of check if baby object does not exists. And of not update current user
            } //end of saved baby obeject async task

            function gotError(err){
                console.log("Error saving data object " +err.message);
            } //error uploading baby object


        };



    }]);
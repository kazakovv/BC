
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
                    //change format of dates
                    for(i=0;i<$scope.kids.length; i++){
                        $scope.kids[i].birthdate = new Date($scope.kids[i].birthdate);
                    }
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
            var babyObjectToRemove = $scope.kids[index];
            $scope.kids.splice(index, 1);


            var Baby = backendlessClasses.babyTable();
            Backendless.Persistence.of(Baby).remove(babyObjectToRemove, new Backendless.Async(removeBaby,gotError));

            function removeBaby(baby){

                alert(baby.name + " was removed successfully");
            }

            function gotError(err){
                console.log("Error deleting baby "+err.message);
            }



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
                $scope.kids = babyObject;
            }
        };

        $scope.saveKid = function(index){
            //var index = $scope.kids.length -1;
            var Baby = backendlessClasses.babyTable();
            babyObject = $scope.kids[index];
            //babyObject.birthdate = new Date(babyObject.birthdate);
            babyObject = angular.copy(babyObject);

            currentUser.kids = [];
            currentUser.kids = $scope.kids;
            for(i=0; i< currentUser.kids.length; i++){
                var justDate = currentUser.kids[i].birthdate;
                justDate = moment(justDate).format("DD/MM/YYYY");
                currentUser.kids[i].birthdate = justDate;
            }
            currentUser = angular.copy(currentUser);

            Backendless.UserService.update(currentUser, new Backendless.Async(userUpdated, gotError));
            function userUpdated(user) {
                console.log("user has been updated");
                currentUser = user;
                //$scope.kids = user.kids;
                //init();

                alert(user.kids[index].name + " was successfully added to user " + user.username);

            }

            function gotError(err) {

                console.log("error message - " + err.message);
                console.log("error code - " + err.statusCode);
            } // end of error uploading the current user object

        };



    }]);
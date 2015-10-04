/**
 * Created by Victor on 10/4/2015.
 */

app.controller('FeverRecordController',['$scope', '$state','passBaby', 'backendlessClasses',
    function($scope,$state,passBaby, backendlessClasses){

        $scope.baby = passBaby.getBabyObject();

        $scope.init = function(){
            if(typeof $scope.baby == 'undefined'){
                $state.go('login');
            }  else {
                //Load fever record it exists
                if(!! $scope.baby.feverrecord){
                    $scope.fevers = JSON.parse($scope.baby.fevers);
                    //reformat dates
                    for(i=0; i < $scope.fevers.length; i++){
                        //if the date is not empty reformat it
                        if(!! $scope.fevers[i].date){
                            $scope.fevers[i].date = new Date( $scope.fevers[i].date );
                        }
                    }
                } else {
                    //if no fevers were saved use the empty array
                    $scope.fevers = [];
                }
            }
        };

        $scope.addFever = function(){

            $scope.feverObject = {
                date:"",
                temp:"",
                medication:"",
                dose:""
            };

            $scope.fevers.push($scope.feverObject);

        };

    }]);

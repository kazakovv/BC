/**
 * Created by Victor on 10/3/2015.
 */

app.controller('DevelopmentRecordController',['$scope', '$state','passBaby', 'backendlessClasses',
    function($scope,$state,passBaby, backendlessClasses){

        $scope.baby = passBaby.getBabyObject();

        $scope.init = function(){
          if(typeof $scope.baby == 'undefined'){
              $state.go('login');
          }  else {
              //Load milestones if they exists
              if(!! $scope.baby.milestones){
                  $scope.milestones = JSON.parse($scope.baby.milestones);
                  //reformat dates
                  for(i=0; i < $scope.milestones.length; i++){
                      //if the date is not empty reformat it
                      if(!! $scope.milestones[i].date){
                      $scope.milestones[i].date = new Date( $scope.milestones[i].date );
                      }
                  }
              } else {
                  //if no milestones were saved use the empty array
                  $scope.milestones = milestones;

              }
          }
        };

        $scope.checkDate = function (dateEntered) {
            var birthDate = new Date($scope.baby.birthdate);
            var dateUserEntered = new Date(dateEntered);
            var difference = dateEntered.getTime() - birthDate.getTime();
            if(difference < 0){
                return "This is before your baby was born";
            }
        };

        $scope.calculateAgeMilestoneAchieved = function(dateMilestoneAchieved){
            if(!! dateMilestoneAchieved){
                var birthDate = new Date($scope.baby.birthdate);
                var day = 1000 * 3600 * 24;

                var differenceInDays = Math.round( (dateMilestoneAchieved.getTime() - birthDate.getTime())/day );
                //check whether time passed is in years or days
                if(differenceInDays < 360){
                    return differenceInDays + " days";
                } else {
                    return Math.round(differenceInDays/360).toFixed(1) + " years";
                }
            } //end of check if dateMilestoneAchieved is not empty
        };

        $scope.saveMilestones = function(){


            //****** upload in backendless *****

            //get baby table from backendlessClasses service
            var Baby = backendlessClasses.babyTable();
            $scope.baby.milestones = JSON.stringify($scope.milestones);
            $scope.baby = angular.copy($scope.baby); //remove $$hashkey added by angular
            var saved = Backendless.Persistence.of( Baby ).save( $scope.baby, new Backendless.Async( savedBaby, gotError ));
            function gotError( err ) // see more on error handling
            {
                console.log( "error message - " + err.message );
                console.log( "error code - " + err.statusCode );
            }
            function savedBaby(baby) {
                alert("The milestones were saved");
            }
            // *** end of upload in backendless ***

        };



        /* Development milestones*/
        var milestones = [
            {
                milestone:'Smiles',
                date:'',
                notes:''
            },
            {
                milestone:'Makes a fist',
                date:'',
                notes:''
            },
            {
                milestone:'Grasps onto something',
                date:'',
                notes:''
            },
            {
                milestone:'Uses raking grasp',
                date:'',
                notes:''
            },
            {
                milestone:'Uses pincer grasp',
                date:'',
                notes:''
            },
            {
                milestone:'Transfers an object from one hand to the other',
                date:'',
                notes:''
            },
            {
                milestone:'Lifts head while on stomach',
                date:'',
                notes:''
            },
            {
                milestone:'Eyes follow a moving object',
                date:'',
                notes:''
            },
            {
                milestone:'Imitates movements',
                date:'',
                notes:''
            },
            {
                milestone:'Imitates facial expressions',
                date:'',
                notes:''
            },
            {
                milestone:'recognizes mom and dad',
                date:'',
                notes:''
            },
            {
                milestone:'Responds to name',
                date:'',
                notes:''
            },
            {
                milestone:'Responds to \"no\"',
                date:'',
                notes:''
            },

            {
                milestone:'Recognizes emotions by the tones of your voice',
                date:'',
                notes:''
            },
            {
                milestone:'Imitates sounds',
                date:'',
                notes:''
            },
            {
                milestone:'Uses voice to express own emotions',
                date:'',
                notes:''
            },
            {
                milestone:'Babbles',
                date:'',
                notes:''
            },
            {
                milestone:'Says first word',
                date:'',
                notes:''
            },
            {
                milestone:'Responds to simple requests',
                date:'',
                notes:''
            },
            {
                milestone:'Finds a hidden object',
                date:'',
                notes:''
            },
            {
                milestone:'Connects objects to their names',
                date:'',
                notes:''
            },
            {
                milestone:'Gets first tooth',
                date:'',
                notes:''
            },
            {
                milestone:'Rolls over',
                date:'',
                notes:''
            },
            {
                milestone:'Sits on own',
                date:'',
                notes:''
            },
            {
                milestone:'Crawls',
                date:'',
                notes:''
            },
            {
                milestone:'Pulls up to stand',
                date:'',
                notes:''
            },
            {
                milestone:'Stands on own',
                date:'',
                notes:''
            },
            {
                milestone:'Takes first steps with help',
                date:'',
                notes:''
            },
            {
                milestone:'Walks on own',
                date:'',
                notes:''
            }
        ]


    }]);
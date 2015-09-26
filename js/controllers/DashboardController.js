app.controller('DashboardController',['$scope', '$state', function($scope, $state){

    $scope.init = function () {

        //find kids of current user


        if(Backendless.UserService.getCurrentUser() != null){
            currentUser = Backendless.UserService.getCurrentUser();
            $scope.kids = currentUser.kids;


            /* alternative approach of getting weights and hieghts */
            $scope.weightData =[];
            $scope.heightData = [];
            for (var i=0; i < currentUser.kids.length; i++){

                //sort the array before we link it to the scope
                var weightsArray = JSON.parse(currentUser.kids[i].weight);
                weightsArray.sort(custom_sort);

                var weightData = [

                    {
                        "key" : "Weight" ,
                        "bar": true,
                        "values" : weightsArray
                    }];

                //link the array to scope
                $scope.weightData.push(weightData);

                //sort the array before we link it to the scope
                var heightsArray = JSON.parse(currentUser.kids[i].height);
                heightsArray.sort(custom_sort);

                var heightData = [
                    {
                        "key" : "Height" ,
                        "bar": true,
                        "values" : heightsArray
                    }];
                $scope.heightData.push(heightData);


            }

        } else {
            //redirect to login screen
            $state.go('login');
        }


    };

    //the graph
    $scope.options = {
        chart: {
            type: 'lineChart',
            height: 200,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 50
            },
            x: function(d){
                //parses the date into a number format

                return Date.parse(d.date);
            },
            y: function(d){return d.value ;},

            showValues: true,
            valueFormat: function(d){
                return d3.format(',.1f')(d);
            },
            transitionDuration: 500,
            xAxis: {
                axisLabel: 'Date',
                tickFormat: function(d) {
                   return d3.time.format('%Y-%m-%d') (new Date(d))
                },
                rotateLabels: 50,
                showMaxMin: false
            },
            yAxis: {
                axisLabel: 'Y Axis',
                axisLabelDistance: 35,
                tickFormat: function(d){
                    return d3.format(',.1f')(d);
                }
            }
        }
    };

    //sort the JSON array by date before we pass it on to graph chart
    function custom_sort(a, b) {
        return new Date(a.date) - new Date(b.date);
    }

}]);

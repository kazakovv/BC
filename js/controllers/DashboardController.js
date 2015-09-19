app.controller('DashboardController',['$scope', '$state', function($scope, $state){

    $scope.init = function () {

        //find kids of current user


        if(Backendless.UserService.getCurrentUser() != null){
            currentUser = Backendless.UserService.getCurrentUser();
            $scope.kids = currentUser.kids;
            $scope.currentUser;

            /* alternative approach of getting weights
            $scope.weightData =[];
            for (var i=0; i < currentUser.kids.length; i++){
                var data = [
                    {
                        "key" : "Quantity" ,
                        "bar": true,
                        "values" : JSON.parse(currentUser.kids[i].weight)
                    }];
                $scope.weightData.push(data);

            }
            */
        } else {
            //redirect to login screen
            $state.go('login');
        }


    };

    //the graph
    $scope.options = {
        chart: {
            type: 'historicalBarChart',
            height: 200,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 50
            },
            x: function(d){return Date.parse(d.date);},  //parses the date into a number format
            y: function(d){return d.value ;},

            showValues: true,
            valueFormat: function(d){
                return d3.format(',.1f')(d);
            },
            transitionDuration: 500,
            xAxis: {
                axisLabel: 'Date',
                tickFormat: function(d) {
                    return d3.time.format('%x') (new Date(d))
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


   //function for setting the weight and height for the chart for each kid


    $scope.setWeightValues = function(kid){
        var data = [
            {
                "key" : "Weight" ,
                "bar": true,
                "values" : JSON.parse(kid.weight)
            }];
       return data;
    }

    $scope.setHeightValues = function (kid) {

        var data = [
            {
                "key" : "Height" ,
                "bar": true,
                "values" : JSON.parse(kid.height)
            }];
        return data;
    }
}]);
